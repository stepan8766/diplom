const ApiError = require('../error/ApiError')
//Замыккающий middleware, внутри него не вызывается функция next(), Он возвращает на клиент ответ.
module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: 'непредвиденная ошибка'})
}


