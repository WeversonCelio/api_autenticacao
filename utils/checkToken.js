
const jwt = require('jsonwebtoken')


function check(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({msg: 'Acesso negado'})
    }

    try {
        const secret = process.env.SECRET
        
        jwt.verify(token, secret)
        
        next()
        
    } catch (error) {
        return res.status(400).json({msg: 'Token invalido'})
        
    }
}

module.exports = check
