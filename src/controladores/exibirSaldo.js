const { contas } = require('../bancodedados')

const exibirSaldo = async (req, res) => {
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

        return res.status(201).json({ "Saldo": conta.saldo });

    } catch (erro) {
        return res.status(500).json({ "error": erro.message })
    }

}

module.exports = {
    exibirSaldo
}