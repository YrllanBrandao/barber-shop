import express from  'express';
import User from '../models/user';
import Role from '../models/role';
import adminAuth from '../middleware/adminAuth';
const Router= express.Router();


// user routes
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
Router.put("/user/:id",adminAuth, async (req:any, res:any) =>{
    const user = new User();
    user.update(req, res);
});
// role routes

Router.post("/role", async(req:any,res:any)=>{
    const role = new Role();
    role.create(req, res);
})

export default Router;