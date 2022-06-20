const Router = require('express');
const deviceController = require('../controllers/deviceController');
const checkRole = require('../middleware/chekRoleMiddleware');

const router = new Router();

router.post('/', checkRole('ADMIN'), deviceController.create);
router.get('/', deviceController.get);
router.get('/:id', deviceController.getOne);

module.exports = router;
