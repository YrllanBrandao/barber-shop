import knex from '../../database/knex';


interface User{
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}