const { contas } = require('../bancodedados')

const listarContas = async (req, res) => {
    return await res.status(200).json(contas)
}

module.exports = {
    listarContas
}