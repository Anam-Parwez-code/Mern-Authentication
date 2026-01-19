//const jwt = require('jsonwebtoken');
//const ensureAuthenticated = (req,resp,next)=>{
  //  const auth= req.headers['authorization'];
    //if(!auth){
      //  return resp.status(403)
        //.json({message:'Unauthorized,JWT token is required'});
    //}
    //try{
//const decoded = jwt.verify(auth,process.env.JWT_SECRET);
//req.user = decoded;
//next();
  //  }catch(err){
//return resp.status(403)
//.json({message:'Unauthorized,jwt token wrong or expired'});
  //  }
//}
//module.exports = ensureAuthenticated;
const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, resp, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return resp.status(403).json({ message: 'Unauthorized, JWT token is required' });
  }

  // Split "Bearer <token>"
  const token = authHeader.split(' ')[1];
  if (!token) {
    return resp.status(403).json({ message: 'Unauthorized, JWT token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return resp.status(403).json({ message: 'Unauthorized, jwt token wrong or expired' });
  }
};

module.exports = ensureAuthenticated;
