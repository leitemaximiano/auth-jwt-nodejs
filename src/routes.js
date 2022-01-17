const {Router: router} = require('express');
const { public, user } = require('./controller');

const routes = router();

// Routes public
routes.get('/', public.home);
routes.post('/', public.login);

// Routes User
routes.get('/user/:id', user.getOne);
routes.post('/user', user.create);

module.exports = {
    routes
};