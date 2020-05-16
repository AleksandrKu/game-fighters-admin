const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, idFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter

router.post('/', createFighterValid, async (req, res, next) => {
    try {
      res.data = await FighterService.create(req.body);
    } catch (err) {
      res.err = String(err);
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get('/', async (req, res, next) => {
    try {
      res.data = await FighterService.getAll();
    } catch (err) {
      res.err = String(err);
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get('/:id', idFighterValid, async (req, res, next) => {
    try {
      let query = { id: req.params.id };
      let fighter = await FighterService.search(query);
      if (!fighter) {
        query = { _id: req.params.id };
        fighter = await FighterService.search(query);
      }
      res.data = fighter ? fighter : 'Fighter not found';
    } catch (err) {
      res.err = String(err);
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.delete('/:id', idFighterValid, async (req, res, next) => {
    try {
      const query = { id: req.params.id };
      res.data = await FighterService.delete(query);
    } catch (err) {
      res.err = String(err);
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.put('/:id', updateFighterValid, async (req, res, next) => {
  try {
    const user = await FighterService.update(req.params.id, req.body);
    if (user && user.id) res.data = 'Fighter updated';
    else res.err = 'Fighter can not update';
  } catch (err) {
      res.err = err;
  } finally {
      next();
  }
}, responseMiddleware);

module.exports = router;
