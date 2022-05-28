const fs = require('fs/promises')

const excluirConta = async (req, res) => {
    const { numero_conta } = req.params
    try {
        const contas = await fs.readFile('./src/bancodedados.json')
        const contasParse = JSON.parse(contas)

        let usuario = contasParse.contas.find(contas => {
            return contas.numero === Number(numero_conta)
        })

        if (!usuario) {
            return res.status(404).json({ "Mensagem": "Conta não encontrada" })
        }

        if (usuario.saldo !== 0) {
            return res.status(400).json({ "Mensagem": "A conta só pode ser removida se o saldo for zero!" })
        }

        const lista = contasParse.contas.filter(contas => {
            return contas !== usuario
        })

        contasParse.contas = lista

        await fs.writeFile('./src/bancodedados.json', JSON.stringify(contasParse))
        return res.status(201).json({ "Mensagem": "Usuário Excluido" });
    } catch (erro) {
        return res.status(500).json({ "error": erro.message })
    }


}

module.exports = {
    excluirConta
}