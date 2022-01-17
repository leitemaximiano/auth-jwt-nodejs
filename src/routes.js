const { public, user } = require('./controller');
const { secret } = require('./globalVaribles');
const { Router: router } = require('express');
const jwt = require('jsonwebtoken');

const routes = router();

function checkToken(request, response, next) {
    try {
        const authHeader = request.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            const data = {
                message: 'usuário não autenticado',
                status: 401
            };
            throw data;
        }

        jwt.verify(token, secret)
        next();
    } catch (error) {
        const data = {
            message: error.message,
            status: error.status || 500
        };
        return response
            .status(data.status)
            .json(data);
    }
}

// Routes public
routes.get('/', public.home);
routes.post('/', public.login);

// Routes User
routes.get('/user/:id', checkToken, user.getOne);
routes.post('/user', user.create);

module.exports = {
    routes
};