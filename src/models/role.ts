import connection from "../database/connection";
import getCurrentDate from "../../public/javascript/getCurrentDate";

interface interfaceRole{
    roleName: string,
    updatedAt: string 
} 


class Role{
        create = async (req:any, res:any) => {
            try {
                const { roleName } = req.body;
                if (!roleName) {
                    res.sendStatus(400);
                } else {
                    const role = await connection('roles').insert({ role_name: roleName });
                    res.status(201).send(`Role ${role} created.`);
                }
            } catch (error:any) {
                res.status(400).send(error.sqlMessage);
            }
        }
        
        update  = async (req:any, res:any) =>{
            try{
                const id = req.params.id;
                const {roleName} = req.body;


                
                if(!roleName)
                {
                    res.status(400).send("The fild roleName was empty");
                }

                await connection("roles").update({role_name: roleName}).where({id});

                res.status(200).send('The fild role_name was updated!');
            }
            catch(error:any)
            {
                console.table(error)
                res.status(400).send(error.sqlMessage);
            }
        }
}


export default Role;