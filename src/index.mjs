import express, { request, response } from 'express';
import { createUserValidationSchema } from './utils/validationSchemas.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import router from "./routes/index.mjs"
import { mockUsers } from './utils/constants.mjs';
const PORT=process.env.PORT || 3000
const app = express();
app.use(express.json());
app.use(cookieParser("helloworld"))
app.use(session({
    secret:"vignesh",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:60000*60
    }
}));
app.use(router);


app.get("/",(request,response)=>{
    console.log(request.session);
    console.log(request.session.id);
    request.sessionStore.get(request.session.id,(err,sessionData)=>{
        if(err){
            console.log(err);
            throw err;
        }
        console.log(sessionData);
    })
    request.session.visited=true;
    response.cookie("hello","world",{maxAge:60000*60,signed:true});
    response.status(201).send("hello world!")
})

app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
})
app.post("/api/auth",(request,response)=>{
    const {
        body:{username,password},
    }=request;
    const findUser=mockUsers.find(user=>user.username===username&&user.password===password);
    if(!findUser)
    return response.status(401).send({msg:"ba credentials"});
    request.session.user=findUser;
    return response.status(200).send(findUser);
})
app.get("/api/auth/status",(request,response)=>{
    request.sessionStore.get(request.sessionID,(err,session)=>{
        console.log(session);
    })
    return request.session.user
        ? response.sendStatus(200).send(request.session.user)
        :response.status(401).send({msg:"not authenticated"})
})
app.post("/api/cart",(request,response)=>{
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
app.get("/api/cart",(request,response)=>{
    if(!request.session.user)return response.sendStatus(401);
    return response.send(request.session.cart ??[])
})