import express from "express"
import cors from "cors"

import { User } from "./classes/User"
import { Page } from "./classes/Page"

import * as util from "./utils/Util"


const app = express();

var users:Array<User> = [];

var pages:Array<Page> = [];

app.get("/",(req,res)=>{
    const data = req.query;
    res.send(data);
});

app.post("/api/login",(req,res)=>{
    const data = req.body;
    const user:User = util.findItemByKeyValue(users,"email",data.email);
    if(!user){
        res.send({success:false,errorType:"email"});
        return;
    }
    if(user.checkPassword(data.password)){
        res.send({success:true,token:user.setNewToken()})
    }else{
        res.send({success:false,errorType:"password"})
    }
});

app.post("/api/checkToken",(req,res)=>{
    const data = req.body;
    const user:User = util.findItemByKeyValue(users,"token",data.token);
    if(!user){
        res.send({success:false});
        return;
    }
    res.send({success:true});
    return;
});

app.post("/api/updatePage",(req,res)=>{
    const newText = req.body.text;
    const page = req.body.page;

    util.findItemByKeyValue(pages,"name",page)["text"]=newText;
    
});

app.post("/api/newPage",(req,res)=>{
    const data = req.body;
    pages.push(new Page(pages.length,data.name,data.content));
})

app.post('/api/getPage',(req,res)=>{
    const data = req.body;

    res.send(pages[data.id]);
});
app.use(cors());
app.listen(3000,()=>console.log("server is running on port 3000"));