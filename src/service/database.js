const mongoose = require('mongoose');
const { passwordDB, userDB } = require('../globalVaribles');

async function connection() {
    try {
        const conected = `mongodb+srv://${userDB}:${passwordDB}@cluster0.wnzwk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
        await mongoose.connect(conected);
    } catch (error) {
        process.stdout.write(`${error.message}\n`);
    }
}

module.exports = {
    connection
};