require('dotenv').config();
const { Pool }      = require('pg');

var pool = null;
if (process.env.NODE_ENV === 'development') {
	pool = new Pool({  
		user: process.env.DB_USER,
		host: process.env.DB_HOST,
		database: process.env.DB_DATABASE,
		password: process.env.DB_PASSWORD,
		port: process.env.DB_PORT,
	});
} else {
	pool = new Pool({
		connectionString: process.env.DATABASE_URL,
		ssl: true
	});
}

pool.connect();

module.exports = () => { return pool; }