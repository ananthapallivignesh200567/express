import express, { request, response } from 'express';
import passport from 'passport';
import { createUserValidationSchema } from './utils/validationSchemas.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import "./strategies/local-strategy.mjs"
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
app.use(passport.initialize());
app.use(passport.session());
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
app.post("/api/pass",passport.authenticate("local"),(request,response)=>{response.sendStatus(200);})
app.get("/api/pass/status",(request,response)=>{
    console.log(request.user);
    console.log(request.session);
    return request.user?response.send(request.user):response.sendStatus(401);
})
app.post("/api/pass/logout",(request,response)=>{
    if(!request.user)return response.sendStatus(401);
    request.logout((err)=>{
        if(err) return response.sendStatus(400);
        return response.send(200);
    })
})