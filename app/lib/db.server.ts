export const runtime = 'nodejs';

const { Pool } = require('pg'); //a connection pool, instead of creating new pool use existing one pool

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
