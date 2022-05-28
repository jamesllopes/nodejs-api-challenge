const fs = require('fs/promises')

const validacaoSaqueDeposito = async (req, res, next) => {
    const { numero_conta, valor } = req.body

    const contas = await fs.readFile('./src/bancodedados.json')
    const contasParse = JSON.parse(contas)
    try {
        if (!numero_conta || !valor) {
            return res.status(400).json({ "Mensagem": "Todos os campos são obrigatórios" })
        }

        if (typeof numero_conta !== 'number' || typeof valor !== 'number') {
            return res.status(400).json({ "Mensagem": "Dados inválidos" })
        }

        if (valor <= 0) {
            return res.status(400).json({ "Mensagem": "Valor deve ser um numero positivo" })
        }

        let conta = contasParse.contas.find(conta => {
            return conta.numero === numero_conta
        })

        if (!conta) {
            return res.status(404).json({ "Mensagem": "Conta não encontrada" })
        }
    } catch (erro) {
        return res.status(500).json({ "error": erro.message })
    }
    next()
}

module.exports = {
    validacaoSaqueDeposito
}

// testar numero conta e valor saque e deposito