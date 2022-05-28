const fs = require('fs/promises')

const transferir = async (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body
    try {
        const contas = await fs.readFile('./src/bancodedados.json')
        const contasParse = JSON.parse(contas)

        if (!numero_conta_destino || !numero_conta_origem || !valor || !senha) {
            return res.status(400).json({ "Mensagem": "Todos os campos são obrigatórios" })
        }

        if (valor <= 0) {
            return res.status(400).json({ "Mensagem": "Valor deve ser um numero positivo" })
        }

        const conta_origem = contasParse.contas.find(contaOrigem => {
            return contaOrigem.numero === numero_conta_origem
        })

        const conta_destino = contasParse.contas.find(contaDestino => {
            return contaDestino.numero === numero_conta_destino
        })

        if (!conta_destino || !conta_origem) {
            return res.status(404).json({ "Mensagem": "Conta Origem ou Desino não encontrada" })
        }

        if (senha !== conta_origem.usuario.senha) {
            return res.status(401).json({ "Mensagem": "Senha Inválida" })
        }

        if (conta_origem.saldo < valor || conta_origem.saldo <= 0) {
            return res.status(401).json({ "Mensagem": "Não há saldo suficiente" })
        }

        conta_origem.saldo -= valor
        conta_destino.saldo += valor
        contasParse.transferencias.push({
            data: new Date(),
            numero_conta_origem,
            numero_conta_destino,
            valor
        })


        await fs.writeFile('./src/bancodedados.json', JSON.stringify(contasParse))
        return res.status(201).json({ "Mensagem": "Transferência Efetuada" });

    } catch (erro) {
        return res.status(500).json({ "error": erro.message })
    }

}

module.exports = {
    transferir
}