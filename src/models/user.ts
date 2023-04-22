import knex from '../database/knex';


interface intefaceUser{
    id: number
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    createdAt: string,
    updatedAt: string
}



class User{
     create = async (req:any, res:any) =>{

        try {
            const USER_DATA:intefaceUser = req.body;

                const query = await knex("users").insert(USER_DATA);
                console.log(query);
            }
        catch(error){
            console.log(error);
        }


    }
}

export default User;