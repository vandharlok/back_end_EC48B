// src/controllers/userController.js
const UserRepo = require('../repositories/UserRepository');

async function createUser(req, res, next) {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      const err = new Error('Campos obrigatórios: name, email');
      err.statusCode = 400;
      throw err;
    }
    const existing = await UserRepo.findByEmail(email);
    if (existing) {
      const err = new Error('Email já cadastrado');
      err.statusCode = 400;
      throw err;
    }
    const user = await UserRepo.create({ name, email });
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

module.exports = { createUser };
