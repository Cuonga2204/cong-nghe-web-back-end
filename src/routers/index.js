// src/routers/index.js
const UserRouter = require('./UserRouter');
const express = require('express');
const path = require('path');
const routes = (app) => {
    app.use('/api/user', UserRouter);
};

module.exports = routes;
