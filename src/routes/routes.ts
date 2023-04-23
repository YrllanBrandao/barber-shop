import express from  'express';
import User from '../models/user';
const Router= express.Router();



Router.post("/user", async (req:any, res:any) =>{
    const user = new User();
    user.create(req, res);
});
Router.get("/user", async(req:any, res:any) =>{
    const user = new User();
    user.findAll(req, res);
});
Router.get("/user/:id", async (req:any, res:any) =>{
    const user = new User();
    user.findById(req, res);
});
Router.put("/user/:id", async (req:any, res:any) =>{
    const user = new User();
    user.update(req, res);
});


export default Router;