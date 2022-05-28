const fs = require('fs/promises')

const validarCpfEEmailPut = async (req, res, next) => {
    const { cpf, email } = req.body
    const { numero_conta } = req.params
    const contas = await fs.readFile('./src/bancodedados.json')
    const contasParse = JSON.parse(contas)

    try {

        const existeCPF = contasParse.contas.find(contas => {
            return contas.usuario.cpf === cpf
        })
        const existeEmail = contasParse.contas.find(contas => {

            return contas.usuario.email === email
        })


        if (existeCPF.numero !== Number(numero_conta) || existeEmail.numero !== Number(numero_conta)) {
            return res.status(400).json({ "Mensagem": "Já existe uma conta com o cpf ou e-mail informado!" })
        }
    } catch (erro) {
        return res.status(500).json({ "error": erro.message })
    }
    next()
}

module.exports = {
    validarCpfEEmailPut
}