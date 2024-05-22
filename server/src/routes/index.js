const authRouter = require('./auth.js');
const userRouter = require('./user.js')
const productRouter = require('./productRoutes.js');
const orderRouter = require('./orderRoutes.js');
const paymentRouter = require('./payosRoutes.js');

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/product', productRouter)
    app.use('/api/v1/order' , orderRouter)
    app.use('/api/v1/payment', paymentRouter)
    return app.use('/', (req, res) => {
        res.send('server...')
    })
}

module.exports = initRoutes