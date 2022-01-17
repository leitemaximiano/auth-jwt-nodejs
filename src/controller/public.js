const { User } = require('../model');
const { secret } = require('../globalVaribles');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function home(request, response) {
    return response.send('<h1>Seja bem vindo a minha API</h1>');
}

async function login(request, response) {
    try {
        const {email, password} = request.body;
        const validation = [
            { 
                isError: !email,
                message: 'É necessário adicionar o e-mail',
                status: 422
            },
            { 
                isError: !password,
                message: 'É necessário adicionar a senha',
                status: 422
            }
        ];

        const errors = validation.filter(({isError}) => isError);
        if (errors && errors.length > 0) {
            const data = {
                message: errors,
                status: 422
            };
            throw data;
        }

        const user = await User.findOne({ email });
        if (!user) {
            const data = {
                message: 'usuário não existe ou senha inválida',
                status: 422
            };
            throw data;
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            const data = {
                message: 'usuário não existe ou senha inválida',
                status: 422
            };
            throw data;
        }

        const token = jwt.sign({
            id: user._id
        }, secret);

        const data = {
            token,
            message: 'Usuário logado com sucesso.',
            status: 200
        };
        return response
            .status(data.status)
            .json(data);
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

module.exports = {
    home,
    login
};