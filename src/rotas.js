const express = require('express')
const { verificaSenha } = require('./intermediarios/verificaSenha')
const { criarContaBancaria } = require('./controladores/criarContaBancaria')
const { listarContas } = require('./controladores/listarContas')
const { verificaBody } = require('./intermediarios/verificaConteudoBody')
const { validarCpfEEmail } = require('./intermediarios/validarCPFeEmail')
const { atualizarUsuario } = require('./controladores/atualizarConta')
const { excluirConta } = require('./controladores/excluirConta')
const { depositar } = require('./controladores/depositar')
const { sacar } = require('./controladores/sacar')
const { transferir } = require('./controladores/transferir')
const { exibirSaldo } = require('./controladores/exibirSaldo')
const { exibirExtrato } = require('./controladores/exibirExtrato')
const { validacaoSaqueDeposito } = require('./intermediarios/validacaoSaqueDeposito')
const { verificaSaque } = require('./intermediarios/verificaSaque')
const { validarCpfEEmailPut } = require('./intermediarios/validarCPFeEmailPut')

const rotas = express()
rotas.get('/contas', verificaSenha, listarContas)
rotas.post('/contas', verificaBody, validarCpfEEmail, criarContaBancaria)
rotas.put('/contas/:numero_conta/usuario', verificaBody, validarCpfEEmailPut, atualizarUsuario)
rotas.delete('/contas/:numero_conta/', excluirConta)
rotas.post('/transacoes/depositar', validacaoSaqueDeposito, depositar)
rotas.post('/transacoes/sacar', validacaoSaqueDeposito, verificaSaque, sacar)
rotas.post('/transacoes/transferir', transferir)
rotas.get('/contas/saldo', exibirSaldo)
rotas.get('/contas/extrato', exibirExtrato)


module.exports = rotas