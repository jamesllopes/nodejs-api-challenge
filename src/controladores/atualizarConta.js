const fs = require('fs/promises')

const atualizarUsuario = async (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
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

        usuario.usuario.nome = nome;
        usuario.usuario.cpf = cpf;
        usuario.usuario.data_nascimento = data_nascimento;
        usuario.usuario.telefone = telefone;
        usuario.usuario.email = email;
        usuario.usuario.senha = senha;

        await fs.writeFile('./src/bancodedados.json', JSON.stringify(contasParse))
        return res.status(200).json({ "Mensagem": "Usuário Atualizado" });

    } catch (erro) {
        return res.status(500).json({ "error": erro.message })
    }
}

module.exports = {
    atualizarUsuario
}