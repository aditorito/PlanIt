const  jwt  = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const authMiddlewar = (req, res, next) => {
    const token = req.headers.authorization;    

    if(!token){
        return res.status(403).json({
            error:"Invalid Token"
        })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({
            error:"Invalid or missing token"
        })
    }
};

module.exports = authMiddlewar;