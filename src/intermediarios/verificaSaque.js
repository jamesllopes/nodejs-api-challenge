
const fs = require('fs/promises')

const verificaSaque = async (req, res, next) => {
    const { senha, numero_conta, valor } = req.body

    const contas = await fs.readFile('./src/bancodedados.json')
    const contasParse = JSON.parse(contas)
    try {
        if (typeof senha !== 'string' || typeof numero_conta !== 'number' || typeof valor !== 'number') {
            return res.status(400).json({ "Mensagem": "Dados inválidos" })
        }
        if (!senha) {
            return res.status(401).json({ "Mensagem": "A senha é obrigatória" })
        }

        let conta = contasParse.contas.find(conta => {
            return conta.numero === numero_conta
        })

        if (senha !== conta.usuario.senha) {
            return res.status(401).json({ "Mensagem": "Senha Inválida" })
        }

        if (conta.saldo < valor || conta.saldo <= 0) {
            return res.status(400).json({ "Mensagem": "Não há saldo suficiente" })
        }
    } catch (erro) {
        return res.status(500).json({ "error": erro.message })
    }
    next()
}

module.exports = {
    verificaSaque
}

// Testar senha saque