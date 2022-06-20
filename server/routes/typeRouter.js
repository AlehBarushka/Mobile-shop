const Router = require('express');
const typeController = require('../controllers/typeController');
const checkRole = require('../middleware/chekRoleMiddleware');

const router = new Router();

router.post('/', checkRole('ADMIN'), typeController.create);
router.get('/', typeController.get);

module.exports = router;
