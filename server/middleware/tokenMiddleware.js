const jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
       
        //Токен обычно помещается в headers.authorization, обычно сначада тип токена, потом сам токен( bearer, hjk12vjbsafkaiufa)
        //Поэтому необходимо разделить токен по символу пробела и по первому индексу получить сам токен
        
        const jwtToken = req.headers.authorization.split(' ')[1]
        if (!jwtToken || jwtToken.trim() === '') {
            return res.status(401).json({ message: 'Пользователь не авторизован 1' });
        }
        const decoded_tokenJWT = jwt.verify(jwtToken, process.env.JWT_KEY)
        
        req.user = decoded_tokenJWT
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Токен истек' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Некорректный токен' });
        }
        // Обработка других ошибок
        
        res.status(401).json({ message: 'Пользователь не авторизован 2' });
    }
}

