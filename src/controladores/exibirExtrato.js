const { contas, transferencias, saque, depositos } = require('../bancodedados')

const exibirExtrato = async (req, res) => {
    const { numero_conta, senha } = req.query
    try {
        if (!numero_conta || !senha) {
            return res.status(400).json({ "Mensagem": "Numero de Conta e Senha Obrigatórios" })
        }

        const conta = contas.find(conta => {
            return conta.numero === Number(numero_conta)
        })

        if (!conta) {
            return res.status(404).json({ "Mensagem": "Conta não encontrada" })
        }

        if (senha !== conta.usuario.senha) {
            return res.status(401).json({ "Mensagem": "Senha Inválida" })
        }

        const saq = saque.filter(saque => {
            return saque.numero_conta === Number(numero_conta)
        })
        const dep = depositos.filter(deposito => {
            return deposito.numero_conta === Number(numero_conta)
        })

        const transfEnviadas = transferencias.filter(deposito => {
            return deposito.numero_conta_origem === Number(numero_conta)
        })
        const transfRecebidas = transferencias.filter(deposito => {
            return deposito.numero_conta_destino === Number(numero_conta)
        })

        return res.status(201).json({
            "Saques": saq,
            "Depositos": dep,
            "TransferênciasEnviadas": transfEnviadas,
            "TransferênciasRecebidas": transfRecebidas
        });

    } catch (erro) {
        return res.status(500).json({ "error": erro.message })
    }
}

module.exports = {
    exibirExtrato
}