const resolveIndexByUserId=(request,response,next)=>{
    const {
        body,
        params:{id}
    }=request;
    const parsedId=parseInt(id);
    if(isNaN(parsedId))return response.sendStatus(404);
    const userIndex=mockUsers.findIndex((user)=>user.id===parsedId);
    if(userIndex===-1)return response.sendStatus(404);
    request.findUserIndex=userIndex;
    next();
}
export default resolveIndexByUserId;