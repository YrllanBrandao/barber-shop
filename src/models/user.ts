import connection from '../database/connection';
import getCurrentDate from '../../public/javascript/getCurrentDate';
import HashPassword from '../../public/javascript/hashPassword';


interface intefaceUser{
    id?: number
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




}

export default User;