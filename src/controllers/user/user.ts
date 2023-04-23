import knex from '../../database/connection';


interface User{
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}