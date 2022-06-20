const Router = require('express');
const brandController = require('../controllers/brandController');
const checkRole = require('../middleware/chekRoleMiddleware');

const router = new Router();

router.post('/', checkRole('ADMIN'), brandController.create);
router.get('/', brandController.get);

module.exports = router;
