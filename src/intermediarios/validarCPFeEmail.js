const fs = require('fs/promises')

const validarCpfEEmail = async (req, res, next) => {

    try {
        const { cpf, email } = req.body
        const contas = await fs.readFile('./src/bancodedados.json')
        const contasParse = JSON.parse(contas)

        const existeCPF = contasParse.contas.find(contas => {
            return contas.usuario.cpf === cpf
        })
        const existeEmail = contasParse.contas.find(contas => {
            return contas.usuario.email === email
        })

        if (existeCPF || existeEmail) {
            return res.status(400).json({ "Mensagem": "Já existe uma conta com o cpf ou e-mail informado!" })
        }
    } catch (erro) {
        return res.status(500).json({ "error": erro.message })
    }
    next()
}

module.exports = {
    validarCpfEEmail
}
