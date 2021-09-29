const axios = require('axios');
const search = require('youtube-search');

const max_retries = 3;

/**
 * @description Gets a spotify access token, either from Redis or the Spotify API.
 * @param {object} client Client object from discord.js
 * @param {boolean} nocache If true, the cache will be skipped and go straight to the Spotify API
 */
module.exports.getSpotifyAccessToken = async (client, nocache, retry) => {

	if (!nocache) {
		const cachedResult = await client.db.getAsync('librenote:cache:spotifytoken');

		if (cachedResult) return cachedResult;
	}

	const options = {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': process.env.SPOTIFY_AUTH,
		},
	};

	const params = new URLSearchParams();
	params.append('grant_type', 'client_credentials');

	const result = await axios.post(
		'https://accounts.spotify.com/api/token',
		params,
		options,
	);

	const token = result.data.access_token;

	if (!token) {
		console.warn('Failed to get new spotify token');
		if (!retry || retry < max_retries) {
			console.warn('Re-attempting to fetch token');

			return module.exports.getSpotifyAccessToken(client, nocache, retry ? retry + 1 : 1);
		}
		else {
			return null;
		}
	}
	else if (retry) {
		console.warn('Successfully fetched token');
	}

	const fullToken = `${result.data.token_type} ${result.data.access_token}`;

	await client.db.setAsync('librenote:cache:spotifytoken', fullToken);
	await client.db.expireAsync('librenote:cache:spotifytoken', result.data.expires_in - 5);

	return fullToken;
};

/**
 * @description Searches for a Youtube video based on the Spotify URL input
 * @param {object} client Client object from discord.js
 * @param {string} url Spotify URL
 * @returns {Promise<string>} Resolves to Youtube video URL
 */

module.exports.getYoutubeFromSpotify = (client, url) => {
	return new Promise((resolve, reject) => {
		(async () => {
			const spotifyURL = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:track\/|\?uri=spotify:track:)((\w|-){22})/;
			const spotifyId = (url.match(spotifyURL)) ? RegExp.$1 : null;
			if (spotifyId) {
				const accessToken = await module.exports.getSpotifyAccessToken(client);
				if (!accessToken) { reject('Invalid Spotify access token'); }
				await axios.get(`https://api.spotify.com/v1/tracks/${spotifyId}`, {
					headers: {
						Authorization: accessToken,
					},
				}).then(async response => {
					const name = response.data.name;
					const artist = response.data.album.artists[0].name;
					const searchResult = await search(
						name + ' ' + artist,
						{
							maxResults: 1,
							type: 'video',
							key: process.env.YT_API_KEY,
						},
					);

					if (searchResult.results[0]) {
						resolve(searchResult.results[0].link);
					}
					else {
						reject('No correlating YouTube video could be found');
					}
				}).catch(reject);
			}
			else {
				reject('Invalid Spotify URL');
			}
		})();
	});
};