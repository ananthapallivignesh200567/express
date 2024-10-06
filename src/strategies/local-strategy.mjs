import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../utils/constants.mjs";
passport.serializeUser((user,done)=>{
    done(null,user.id);
})
passport.deserializeUser((id,done)=>{
    try{
        const user = mockUsers.find((user) => user.id === id);
        if(!user)throw new Error("user not found")
    }
catch(err){
    done(err,null);
}
})
passport.use(new Strategy((username,password,done)=>{
    try{
        const user = mockUsers.find((user)=>user.username === username);
        if(!user){
            throw new Error("user not found");
    }
    if(user.password!==password)throw new Error("invalid credetials");
    done(null,user)
}catch(err){
    done(err,null);
}
})
)