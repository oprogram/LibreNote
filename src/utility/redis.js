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
	 * @description Creates a Redis class
	 */
	constructor() {
		/**
		 * @method getAsync
		 * @description Gets a string from the redis cache by key
		 * @param {string} key The key
		 * @returns {Promise<string>} The value
		 */
		this.getAsync = promisify(client.get).bind(client);

		/**
		 * @method setAsync
		 * @description Sets a value with the provided key
		 * @param {string} key The key
		 * @param {string} value The value
		 * @returns {Promise<void>}
		 */
		this.setAsync = promisify(client.set).bind(client);

		/**
		 * @method delAsync
		 * @description Deletes the entry with the specific key
		 * @param {string} key The key
		 * @returns {Promise<void>}
		 */
		this.delAsync = promisify(client.del).bind(client);

		this.hgetallAsync = promisify(client.hgetall).bind(client);
		this.hmsetAsync = promisify(client.hmset).bind(client);

		/**
		 * @method expireAsync
		 * @description Set's a key's expiration
		 * @param {string} key The key
		 * @param {number} time Time until the key should expire, in seconds
		 * @returns {Promise<void>}
		 */
		this.expireAsync = promisify(client.expire).bind(client);

		this.scanAsync = promisify(client.scan).bind(client);
	}

	/**
	 * @method getNumberAsync
	 * @description Gets a number from the redis cache by key
	 * @param {string} key The key
	 * @returns {Promise<number|null>} The value or null if there is no number
	*/
	getNumberAsync(key) {
		return new Promise((resolve, reject) => {
			this.getAsync(key).then(value => {
				const number = parseInt(value);

				resolve(isNaN(number) ? null : number);
			}).catch(reject);
		});
	}
};