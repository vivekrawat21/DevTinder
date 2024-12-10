const isAuthenticated = (req,res,next)=>{
    const token = "hellobaby";
    const isAuthenticatedToken = token ==="hellobaby";
    if(!isAuthenticatedToken){
        res.status(402).json(
            {
            message : "You are not autherized",
            }
        );
    }
        else{
            next();
        }
    
}

module.exports = {

    isAuthenticated
}