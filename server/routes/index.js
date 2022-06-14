const Router = require('express');
const deviceRouter = require('./deviceRouter');
const userRouter = require('./userRouter');
const barndRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');

const router = new Router();

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', barndRouter);
router.use('/device', deviceRouter);

module.exports = router;
