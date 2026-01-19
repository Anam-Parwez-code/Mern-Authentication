const jwt = require('jsonwebtoken');
const ensureAuthenticated = (req,resp,next)=>{
    const auth= req.headers['authorization'];
    if(!auth){
        return resp.status(403)
        .json({message:'Unauthorized,JWT token is required'});
    }
    const token=auth.split("")[1];
    if(!token){
        return resp.status(403).json({message:"Token missing"});
    }
    try{
const decoded = jwt.verify(auth,process.env.JWT_SECRET);
req.user = decoded;
next();
    }catch(err){
return resp.status(403)
.json({message:'Unauthorized,jwt token wrong or expired'});
    }
}
module.exports = ensureAuthenticated;
