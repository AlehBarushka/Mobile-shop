const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../db/models/models');

const generateToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest('Email и пароль обязательны'));
    }

    const canditate = await User.findOne({ where: { email } });

    if (canditate) {
      return next(ApiError.badRequest('Пользователь с таким email существует'));
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const user = await User.create({ email, role, password: hashPassword });

    const basket = await Basket.create({ userId: user.id });

    const token = generateToken(user.id, email, user.role);

    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next(ApiError.badRequest('Пользователь с таким email не существует'));
    }

    let comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return next(ApiError.badRequest('Неверный пароль'));
    }

    const token = generateToken(user.id, user.email, user.role);

    return res.json({ token });
  }

  async check(req, res) {
    const token = generateToken(req.user.id, req.user.email, req.user.role);

    return res.json({ token });
  }
}

module.exports = new UserController();
