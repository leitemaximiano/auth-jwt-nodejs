const { app } = require('./app');
const { port } = require('./globalVaribles');

app.listen(port, function() {
    process.stdout.write(`start server http://localhost:${port}\n`)
});