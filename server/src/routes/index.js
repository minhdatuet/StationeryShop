const authRouter = require('./auth.js');
const userRouter = require('./user.js')
const productRouter = require('./productRoutes.js');
const orderRouter = require('./orderRoutes.js')

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/product', productRouter)
    app.use('/api/v1/order' , orderRouter)
    return app.use('/', (req, res) => {
        res.send('server...')
    })
}

module.exports = initRoutes