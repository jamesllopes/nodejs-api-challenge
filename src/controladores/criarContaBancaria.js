const fs = require('fs/promises')

const criarContaBancaria = async (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    try {
        const contas = await fs.readFile('./src/bancodedados.json')
        const contasParse = JSON.parse(contas)

        contasParse.contas.push(
            {
                numero: contasParse.banco.numeroConta++,
                saldo: 0,
                usuario: {
                    nome,
                    cpf,
                    data_nascimento,
                    telefone,
                    email,
                    senha
                }
            }
        )
        await fs.writeFile('./src/bancodedados.json', JSON.stringify(contasParse))
        return res.status(201).json({ "Mensagem": "Conta Criada" });

    } catch (erro) {
        return res.status(500).json({ "error": erro.message })
    }
}


module.exports = {
    criarContaBancaria
}