import express from 'express';
import cors  from 'cors';


const app = express();
const PORT:number =  8080;

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// controllers
import Routes from './src/routes/routes';
app.use("/", Routes);


app.listen(PORT, () =>{
    console.log("the server is running at port:", PORT);
});





