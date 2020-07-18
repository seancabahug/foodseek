const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if(req.headers.authorization){
        if (req.headers.authorization.startsWith("Bearer ")) {
            try {
                const token = req.headers.authorization.slice(7);
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.userData = decoded;
                next();
            } catch (err) {
                
                return res.status(401).json({
                    error: "Auth failed",
                });
            }
        } else { // Authorization header did not start with "Bearer "
            
            return res.status(401).json({
                error: "Auth failed",
            });
        }
    } else {
        console.log(req.headers)    
        return res.status(401).json({
            error: "Auth failed",
        });
    }
};