import connection from "../database/connection";



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
    
}


export default Role;