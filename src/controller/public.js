function home(request, response) {
    return response.send('<h1>Seja bem vindo a minha API</h1>');
}

module.exports = {
    home
};