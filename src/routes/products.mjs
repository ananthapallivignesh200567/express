import {Router} from "express";
const router=Router();
router.get("/api/products",(request,response)=>{
    response.send([{id:"1",name:"product1",price:100}])
})
export default router;