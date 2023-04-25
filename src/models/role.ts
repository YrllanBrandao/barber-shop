import connection from "../database/connection";
import getCurrentDate from "../../public/javascript/getCurrentDate";

interface interfaceRole{
    id?: number,
    role_name: string,
    updatedAt: string 
} 


class Role{


        checkRole = async (id:number) =>{

            try{
                const result:any = await connection("roles").select().where({id});
                if(result[0] === undefined)
                {
                    return false
                }
                return true;
            }
            catch(error)
            {
                return error;
            }
        }
        create = async (req:any, res:any) => {
            try {
                const { roleName } =  await req.body;
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
                const {roleName} = await req.body;
                const newRole:interfaceRole = {
                    id,
                    role_name: roleName,
                    updatedAt: getCurrentDate()
                }
                
                if(!roleName)
                {
                    res.status(400).send("The fild roleName was empty");
                }

                await connection("roles").update(newRole).where({id});

                res.status(200).send('The fild role_name was updated!');
            }
            catch(error:any)
            {
                res.status(400).send(error.sqlMessage);
            }
        }
        delete = async(req:any, res:any) =>{
            const id = req.params.id;


            const roleExist = await this.checkRole(id);
        
            if(!roleExist)
            {
                 res.status(404).send("The role doesn't exist");
             }
            try{
               await connection("roles").delete("*").where({id});
                res.status(200).send("role deleted!")
            }
            catch(error:any)
            {
                res.status(400).send(error.sqlMessage);
            }
        }
}


export default Role;