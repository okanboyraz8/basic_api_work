//=> controllers/auth.js'de file dosyasında "token" adında cookie'leri kayıt ettik.
// Gerçek anlamda, register || login yapan bir kullanıcının token adında bir cookie bulunacaktır.
// Amacımız: Bu "TOKEN"lara ulaşmak olacaktır. Ve eşleşme sağladığında

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        res.status(500).json({message: "You are not LOGIN yet!"})
    }

    jwt.verify(token, "SECRET_KEY", (err, user) => {
        if(err) res.status(500).json({message: "Invalid Token!"})
        req.user = user
        next(); 
    })
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.id == req.params.id || req.user.isAdmin){
            next()
        } else {
            res.status(500).json({message: "You are not LOGIN yet!"})
        } 
    })
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.isAdmin){
            next()
        } else {
            res.status(500).json({message: "You are not ADMIN yet!"})
        } 
    })
}

module.exports = { verifyToken, verifyUser, verifyAdmin }