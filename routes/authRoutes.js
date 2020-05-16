const { Router } = require('express');
const AuthService = require('../services/authService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { loginUserValid } = require('../middlewares/user.validation.middleware');

const router = Router();

router.post('/login', loginUserValid, async (req, res, next) => {
    try {
      // TODO: Implement login action (get the user if it exist with entered credentials)
      res.data = await AuthService.login(req.body);
    } catch (err) {
      res.err = String(err);
    } finally {
      next();
    }
}, responseMiddleware);

module.exports = router;
