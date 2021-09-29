const axios = require('axios');

const YouTubeURL = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/gi;
const YouTubePlaylistURL = /^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/g;

/**
 * @module youtube
 * @description Module to handle communication with YouTube APIs
 */

/**
 * @function getPlaylistItems
 * @description Get playlist items
 * @param {string} playlistId The ID of the YouTube playlist
 * @returns {Array} Array of the playlist items
 */
module.exports.getPlaylistItems = (playlistId) => {
	return new Promise((resolve, reject) => {
		axios.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${process.env.YT_API_KEY}`)
			.then(async response => {
				resolve(response.data.items ?? []);
			}).catch(reject);
	});
};