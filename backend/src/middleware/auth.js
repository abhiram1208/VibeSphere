const jwt=require('jsonwebtoken');

const protect=async(req,res,next)=>{
    try{
       const token = req.cookies?.jwt || 
                 (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=decoded;
    next();
    }catch(error){
        console.error("Authentication error:", error);
        res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }   

};
const adminOnly=(req,res,next)=>{
    if(req.user&&req.user.role === 'admin'){
        next();
    }else{
        res.status(403).json({ success: false, message: "Access denied, admin only" });
    }
};

module.exports={protect,adminOnly};