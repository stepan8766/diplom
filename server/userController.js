const ApiError = require("./error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./user");
const Role = require("./role")

const generateJwt = (id, email, role) => {
  return jwt.sign(
    { id, email, role },
    process.env.JWT_KEY,
    { expiresIn: "24h" }
  );
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return next(
        ApiError.error404_badRequest("Ошибка 1: Вы не ввели логин или пароль.")
      );
    }

    const candidate = await User.findOne({ email });
    if (candidate) {
      return next(
        ApiError.error404_badRequest(
          `Ошибка 2: Пользователь с логином '${email}' уже найден`
        )
      );
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const jwtToken = generateJwt(user.id, user.email, user.role);
    return res.json({ jwtToken });
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    // Дополнительные консольные сообщения для диагностики
    console.log(`Попытка входа с email: ${email}`);

    const user = await User.findOne({ email });
    if (!user) {
      return next(
        ApiError.error500_internal(
          `Ошибка 3: Аккаунта с логином '${email}' не существует`
        )
      );
    }

    // Дополнительные консольные сообщения для диагностики
    console.log(`Пользователь найден: ${user.email}`);
    console.log(`Хэшированный пароль пользователя: ${user.password}`);

    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      // Дополнительные консольные сообщения для диагностики
      console.log(`Неверный пароль для пользователя: ${email}`);
      return next(
        ApiError.error500_internal(
          `Ошибка 4: Неверный пароль от аккаунта, попробуйте еще раз`
        )
      );
    }
    console.log(`Пользователь ${email} успешно авторизован`);

    const jwtToken = generateJwt(user.id, user.email, user.role);
    return res.json({ jwtToken });
  }

  async check(req, res, next) {
    const jwtToken = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ jwtToken });
  }
}

module.exports = new UserController();
