// src/routers/index.js
const UserRouter = require('./UserRouter');
const routes = (app) => {
    app.use('/api/user', UserRouter);
    app.use('/api/product', ProductRouter);
    app.use('/api/cart', CartRouter);
};

module.exports = routes;
