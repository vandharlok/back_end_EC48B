const UserRepo = require('../repositories/UserRepository');

async function createUser(req, res, next) {
  try {
    if (!req.body.name || !req.body.email) {
      const err = new Error('Campos obrigatórios faltando: name e email');
      err.statusCode = 400;
      throw err;
    }

    const user = await UserRepo.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const users = await UserRepo.find();
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
}

async function getUserByEmail(req, res, next) {
  try {
    const user = await UserRepo.findByEmail(req.params.email);
    if (!user) {
      const err = new Error('Usuário não encontrado');
      err.statusCode = 404;
      throw err;
    }
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const user = await UserRepo.deleteById(req.params.id);
    if (!user) {
      const err = new Error('Usuário não encontrado');
      err.statusCode = 404;
      throw err;
    }
    res.json({ success: true, message: 'Usuário deletado com sucesso' });
  } catch (err) {
    next(err);
  }
}

module.exports = { createUser, getAllUsers, getUserByEmail, deleteUser };
