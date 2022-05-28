const { banco } = require('../bancodedados')

const verificaSenha = async (req, res, next) => {
    try {
        const { senha_banco } = req.query
        if (!senha_banco || senha_banco !== banco.senha.toLowerCase()) {
            return res.status(401).json({ "Mensagem": "Senha Inválida" })
        }
    } catch (erro) {
        return res.status(500).json({ "error": erro.message })
    }
    next()
}

module.exports = {
    verificaSenha
}