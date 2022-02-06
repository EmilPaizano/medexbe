const verifyApiHeaderToken = (req,res,next)=>{
const {apitoken} = req.headers;
    if(apitoken){
        if(apitoken === process.env.API_TOKEN){
            return next();
        }
    }else{
        sendUnauthorized(res);
    }
}

const sendUnauthorized = (res)=>{
    res.status(401).json({"error":"Recurso no autorizado"});
}

module.exports = {
    verifyApiHeaderToken,
}