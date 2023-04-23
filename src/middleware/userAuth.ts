import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const adminAuth = (req:any, res:any, next:any) =>{
    const bearer:any = req.headers['authorization'];
    const USER_ROLE_ID:number = 1;
    const token:string = bearer.split(' ')[1];
    const secret:any = process.env.SECRET_JWT;
    jwt.verify(token,secret, (
        (error:any, decoded:any) =>{
            if(error)
            {
                res.status(401).send("Unauthorized");
            }
            
            if(decoded.role === USER_ROLE_ID)
            {
                next();
            }
        }
    ))
}


export default adminAuth;