import {mockUsers} from "../utils/constants.mjs";
import {Router} from "express";
import {query,validationResult,body,matchedData,checkSchema} from 'express-validator';
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";
import resolveIndexByUserId from "../utils/middlewares.mjs";
const router=Router();
router.post("/api/users",checkSchema(createUserValidationSchema)
,(request,response)=>{
    const result=validationResult(request);
    console.log(result);
    if(!result.isEmpty())return response.status(400).send({error:result.array()});
    const data=matchedData(request);
    console.log(data);
    const newUser={id:parseInt(mockUsers[mockUsers.length-1].id)+1,...data};
    mockUsers.push(newUser);
    return response.status(201).send(newUser);
});
router.put("/api/users/:id",resolveIndexByUserId,(request,response)=>{
    const {
        body,
        findUserIndex
    }=request;
    
    mockUsers[findUserIndex]={id:mockUsers[findUserIndex],...body};
    return response.sendStatus(200);
});
router.get("/api/users",query("filter")
.isString()
.notEmpty().withMessage("must be non empty")
.isLength({min:3,max:10}).withMessage("must be atleast 3-10 characters")
,(request,response)=>{
    const result=validationResult(request);
    console.log(result);
    const {
        query:{filter,value}
    }=request;
    if(filter && value)response.send(
        mockUsers.filter((user)=>user[filter].includes(value))
    )
    return response.send(mockUsers);
});
router.get("/api/users/:id",(request,response)=>{
    console.log(request.params);
    const parsedId=parseInt(request.params.id);
    if(isNaN(parsedId)) return response.status(400).send("invalid id");
    const findUser=mockUsers.findIndex((user)=>user.id===parsedId);
    if(findUser===-1)return response.sendStatus(404);
    return response.send(mockUsers[findUser],);
});
router.patch("/api/users/:id",(request,response)=>{
    const {
        body,
        params:{id}
    }=request;
    if(isNaN(id))return response.sendStatus(404);
    const parsedId=parseInt(id);
    const userIndex=mockUsers.findIndex((user)=>user.id===parsedId);
    if(userIndex===-1)return response.sendStatus(404);
    mockUsers[userIndex]={...mockUsers[userIndex],...body};
    return response.sendStatus(200);
});
router.delete("/api/users/:id",(request,response)=>{
    const {
        params:{id}
    }=request;
    const parsedId=parseInt(id);
    if(isNaN(id))return response.sendStatus(404);
    const userIndex=mockUsers.findIndex((user)=>user.id===parsedId);
    if(userIndex===-1)return response.sendStatus(404);
    mockUsers.splice(userIndex,1);
    return response.sendStatus(200);
});

export default router;