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
            

            const {firstName, lastName, email, password} = req.body;
            const CURRENT_DATE = getCurrentDate();
            const REGISTER:intefaceUser = {
                firstName,
                lastName,
                email,
                password: HashPassword(password),
                createdAt: CURRENT_DATE,
                updatedAt: CURRENT_DATE
            }
             await connection("users").insert(REGISTER);
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


            console.table(USER_DATA);
            const result:any =  await connection('users').update(USER_DATA).where(id);

           res.sendStatus(200).send(result);
        }
        catch(error)
        {
            console.log(error);
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