import { Router } from "express";
import { mockUsers } from "../utils/constants.mjs";
import router from "./users.mjs";
router.post("/api/auth",(request,response)=>{
    const {
        body:{username,password},
    }=request;
    const findUser=mockUsers.find(user=>user.username===username&&user.password===password);
    if(!findUser)
    return response.status(401).send({msg:"ba credentials"});
    request.session.user=findUser;
    return response.status(200).send(findUser);
})
router.get("/api/auth/status",(request,response)=>{
    request.sessionStore.get(request.sessionID,(err,session)=>{
        console.log(session);
    })
    return request.session.user
        ? response.sendStatus(200).send(request.session.user)
        :response.status(401).send({msg:"not authenticated"})
})
router.post("/api/cart",(request,response)=>{
    if(!request.session.user)return response.sendStatus(401);
    const {
        body:item
    }=request;
    const {cart}=request.session;
    if(cart){
        cart.push(item);
    }
    else{
        request.session.cart=[item];
    }
    return response.status(200).send(item);
})
router.get("/api/cart",(request,response)=>{
    if(!request.session.user)return response.sendStatus(401);
    return response.send(request.session.cart ??[])
})
export default router;