const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, idUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user
router.post('/', createUserValid, async (req, res, next) => {
  try {
    const user = await UserService.create(req.body);
    if (user && user.id) res.data = 'Create new user';
    else res.err = 'Can not save user';
  } catch (err) {
      res.err = err;
  } finally {
      next();
  }
}, responseMiddleware);

router.put('/:id', updateUserValid, async (req, res, next) => {
  try {
    const user = await UserService.update(req.params.id, req.body);
    if (user && user.id) res.data = 'User updated';
    else res.err = 'User can not update';
  } catch (err) {
      res.err = err;
  } finally {
      next();
  }
}, responseMiddleware);

router.get('/', async (req, res, next) => {
  try {
    res.data = await UserService.getAll();
  } catch (err) {
    res.err = String(err);
  } finally {
    next();
  }
}, responseMiddleware);

router.get('/:id', idUserValid, async (req, res, next) => {
  try {
    const query = { id: req.params.id };
    res.data = await UserService.search(query);
  } catch (err) {
    res.err = String(err);
  } finally {
    next();
  }
}, responseMiddleware);

router.delete('/:id', idUserValid, async (req, res, next) => {
  try {
    res.data = await UserService.delete(req.params.id);
  } catch (err) {
    res.err = String(err);
  } finally {
    next();
  }
}, responseMiddleware);

module.exports = router;