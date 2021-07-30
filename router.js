const router = require("express").Router();

const loginRouter = require('./routes/loginRouter');
const userRouter = require('./routes/userRouter');
const projectRouter = require('./routes/projectRouter');
const categoryRouter = require('./routes/categoryRouter');


router.use('/login', loginRouter);
router.use('/user', userRouter);
router.use('/project', projectRouter);
router.use('/category', categoryRouter);




module.exports = router;