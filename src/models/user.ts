import connection from '../database/connection';
import getCurrentDate from '../../public/javascript/getCurrentDate';
import HashPassword from '../../public/javascript/hashPassword';

interface intefaceUser{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    createdAt: string,
    updatedAt: string
}
interface intefaceUserUpdate{
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    updatedAt: string
}

class User{
     create = async (req:any, res:any) =>{

        try {
            

            const {firstName, lastName, email, password, roleId} = req.body;
            const CURRENT_DATE = getCurrentDate();
            const REGISTER:intefaceUser = {
                firstName,
                lastName,
                email,
                password: HashPassword(password),
                createdAt: CURRENT_DATE,
                updatedAt: CURRENT_DATE
            }
             const USER_ID:any = await connection("users").insert(REGISTER);

                //  adding user role
            await connection('user_role').insert({
                user_id: USER_ID[0],
                role_id: roleId
            });

                res.status(201).send("user created sucessfully!");
            }
        catch(error:any){
           res.sendStatus(400).send(error.sqlMessage);
        }
    }
    update = async (req:any, res:any) =>{

        
        try{
            const id:number = req.params;
            const USER_DATA:intefaceUserUpdate = req.body;
            const query:any = await connection('users').select(['email']).where(id);

            if(query.length === 0)
            {
                res.status(404).send("the user doesn't exists!");
            }

            const result:any =  await connection('users').update({...USER_DATA, updatedAt: getCurrentDate()}).where(id);

           res.sendStatus(200).send(result);
        }
        catch(error:any)
        {
    
            res.status(400).send(error.sqlMessage);
        }
    }

    findAll = async (req:any, res:any) =>{
        try{
           const USERS:any = await connection('users').select('*');

           res.status(200).json(USERS);
        }
        catch(error:any)
        {
            res.status(400).send(error.sqlMessage);
        }
    }
  
    findById = async (req:any, res:any) =>{
        try{
            const id:number  = req.params.id;

            const query = await connection('users').where({id});

            res.sendStatus(200).send(query);
        }
        catch(error:any)
        {
            res.sendStatus(error).send(error.sqlMessage)
        }
    }






}

export default User;