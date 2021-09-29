const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient({
	host: '127.0.0.1',
	port: 6379,
	password: process.env.REDIS_PASSWORD,
	tls: null,
});

client.on('error', function(error) {
	console.error(error);
});

client.on('connect', function() {
	console.log('Redis connected!');
});

/** Class to interact with redis */
module.exports = class Redis {

	/**
	 * @constructor Redis
	 * Creates a Redis class
	 */
	constructor() {
		/**
		 * @method getAsync
		 * Gets a string from the redis cache by key
		 * @param {string} key The key
		 * @returns {string} The value
		 */
		this.getAsync = promisify(client.get).bind(client);
		/**
		 * @method setAsync
		 * Sets a value with the provided key
		 * @param {string} key The key
		 * @param {string} value The value
		 * @returns {void}
		 */
		this.setAsync = promisify(client.set).bind(client);

		/**
		 * @method delAsync
		 * Deletes the entry with the specific key
		 * @param {string} key The key
		 * @returns {void}
		 */
		this.delAsync = promisify(client.del).bind(client);

		this.hgetallAsync = promisify(client.hgetall).bind(client);
		this.hmsetAsync = promisify(client.hmset).bind(client);

		/**
		 * @method expireAsync
		 * Set's a key's expiration
		 * @param {string} key The key
		 * @param {number} time Time until the key should expire, in seconds
		 * @returns {void}
		 */
		this.expireAsync = promisify(client.expire).bind(client);

		this.scanAsync = promisify(client.scan).bind(client);
	}
};