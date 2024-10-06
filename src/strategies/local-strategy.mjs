import passport from "passport";
import { hashPassword,comparePassword } from "../utils/helpers.mjs";
import { Strategy } from "passport-local";
import { mockUsers } from "../utils/constants.mjs";
import { User } from "../mongoose/user.mjs";
passport.serializeUser((user,done)=>{
    done(null,user.id);
})
passport.deserializeUser(async(id,done)=>{
    try{
        const user =await User.findById(id);
        if(!user)throw new Error("user not found")
    }
catch(err){
    done(err,null);
}
})
passport.use(new Strategy(async(username,password,done)=>{
    try{
        const user =await User.findOne({username});
        if(!user){
            throw new Error("user not found");
    }
    if(!comparePassword(password,user.password))throw new Error("invalid credetials");
    done(null,user)
}catch(err){
    done(err,null);
}
})
)