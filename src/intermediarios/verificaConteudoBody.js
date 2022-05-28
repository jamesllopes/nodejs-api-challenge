
const verificaBody = async (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ "Mensagem": "Todos os campos são obrigatórios" })
    }

    next()
}

module.exports = {
    verificaBody
}

