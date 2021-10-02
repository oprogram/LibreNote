const VideoURL = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/gi;
const PlaylistURL = /^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/g;
const ytSearchAPI = require('youtube-search-api');

/**
 * @module youtube
 * @description Module to handle communication with YouTube APIs
 */

/**
 * @function isVideoURL
 * @param {string} URL The URL you want to test
 * @returns {boolean} If the URL is a YouTube Video URL or not
 */
module.exports.isVideoURL = (URL) => {
	return VideoURL.test(URL);
};

/**
 * @function isPlaylistURL
 * @param {string} URL The URL you want to test
 * @returns {boolean} If the URL is a YouTube Playlist URL or not
 */
module.exports.isPlaylistURL = (URL) => {
	return PlaylistURL.test(URL);
};

/**
 * @function getPlaylistId
 * @param {string} URL The URL you want get the playlist ID from
 * @returns {string|null} The playlist id, if one could be found.
 */
module.exports.getPlaylistId = (URL) => {
	const match = new RegExp('[&?]list=([a-z0-9_-]+)', 'i').exec(URL);
	if (match && match[1].length > 0) {
		return match[1];
	}

	return null;
};

/**
 * @function getPlaylistItems
 * @description Get playlist items
 * @param {string} playlistId The ID of the YouTube playlist
 * @returns {Array} Array of the playlist items
 */
module.exports.getPlaylistItems = (playlistId) => {
	return new Promise((resolve, reject) => {
		ytSearchAPI.GetPlaylistData(playlistId).then((result) => {
			resolve(result.items ?? []);
		}).catch(reject);
	});
};

/**
 * @function searchByQuery
 * @description Searches for a track by the query provided
 * @param {string} query The query you would like to search with
 * @returns {Promise<string|null>} The found tracks YouTube URL, if any.
 */
module.exports.searchByQuery = (query) => {
	return new Promise((resolve) => {
		ytSearchAPI.GetListByKeyword(query, false).then((res) => {
			if (res.items && res.items.length > 0) {
				resolve(`https://www.youtube.com/watch?v=${res.items[0].id}`);
			}
			else {
				resolve(null);
			}
		}).catch((err) => {
			console.warn(err);
			resolve(null);
		});
	});
};

