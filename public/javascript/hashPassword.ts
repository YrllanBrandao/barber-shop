
import bcrypt from 'bcrypt';


const HashPassword = (password:string) =>{
    const ROUNDS:number = 10;
    const SALT:string = bcrypt.genSaltSync(ROUNDS);
    const HASHED_PASSWORD:string = bcrypt.hashSync(password, SALT);

    return HASHED_PASSWORD;
} 


export default HashPassword;