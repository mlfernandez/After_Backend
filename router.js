const router = require("express").Router();

const loginRouter = require('./routes/loginRouter');
const userRouter = require('./routes/userRouter');

router.use('/login', loginRouter);
router.use('/user', userRouter);

/* const movieRouter = require("./routes/moviesRouter");
const seriesRouter = require("./routes/seriesRouter");

const orderRouter = require('./routes/ordersRouters')


router.use("/movies", movieRouter);
router.use("/series", seriesRouter);

router.use('/orders', orderRouter);
 */


module.exports = router;