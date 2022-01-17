const express = require('express');
const { routes } = require('./routes');
const { connectionDB } = require('./service');

const app = express();
connectionDB();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(routes);

module.exports = {
    app
};