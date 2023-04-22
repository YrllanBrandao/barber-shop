import knex, { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const knexConfiguration: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: '172.17.0.2',
    port: 3306,
    user: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'barber_shop',
  },
};

const connection = knex(knexConfiguration);

export default connection;
