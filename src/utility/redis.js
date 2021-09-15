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

module.exports = class Redis {
	constructor() {
		this.getAsync = promisify(client.get).bind(client);
		this.setAsync = promisify(client.set).bind(client);

		this.delAsync = promisify(client.del).bind(client);

		this.hgetallAsync = promisify(client.hgetall).bind(client);
		this.hmsetAsync = promisify(client.hmset).bind(client);

		this.expireAsync = promisify(client.expire).bind(client);

		this.scanAsync = promisify(client.scan).bind(client);
	}
};