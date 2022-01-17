const {Router: router} = require('express');
const { public } = require('./controller');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const routes = router();

routes.get('/', public.home);

module.exports = {
    routes
};