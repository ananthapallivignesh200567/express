import {Router} from "express";
const router=Router();
router.get("/api/products",(request,response)=>{
    console.log(request.headers.cookie);
    console.log(request.cookies);
    if(request.cookies.hello && request.cookies.hello=="world")
        return response.send([{id:"1",name:"product1",price:100}]);
    return response.send({msg:"sorry you need a valid cookie"});
})
export default router;