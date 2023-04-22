import express from  'express';
import User from '../models/user';
const Router= express.Router();



Router.post("/user", async (req:any, res:any) =>{
    const user = new User();

    console.log("i'm here")

    try {
        await user.create(req, res);
        res.status(201).send("User created sucessfully!");
    }
    catch(err:any)
    {
        res.status(400).send(err.message);
    }
});

export default Router;