const { User } = require('../model');
const bcrypt = require('bcrypt');

async function create(request, response) {
    try {
        const {name, email, password, confirmpassword} = request.body;

        const validation = [
            { 
                isError: !name,
                message: 'É necessário adicionar o nome',
                status: 422
            },
            { 
                isError: !email,
                message: 'É necessário adicionar o e-mail',
                status: 422
            },
            { 
                isError: !password,
                message: 'É necessário adicionar a senha',
                status: 422
            },
            { 
                isError: !confirmpassword,
                message: 'É necessário adicionar a confirmação da senha',
                status: 422
            },
            {
                isError: password !== confirmpassword,
                message: 'A senha está de confirmação está errada',
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

        const isExtistUser = await User.findOne({ email });
        
        if (isExtistUser) {
            const data = {
                message: 'Não é possível cadastrar, o e-mail já está cadastrado.',
                status: 422
            };
            throw data;
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = {
            name,
            email,
            password: passwordHash
        }

        await User.create(user);

        const data = {
            message: 'Usuário cadastrado com sucesso.',
            status: 201
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
    create
};