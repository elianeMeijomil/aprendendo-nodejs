// CommonJS, every file is module (by default)
// Modules - Encapsuled Code (only share minimum)
const sayHi = require('./utils')

/* busca um objeto com o export enviado pelo names */
const names = require('./names')
console.log(names)
sayHi(names)

/* resgata constantes baseadas nas keys do objeto exportado pelo names */
const {nome,sobrenome} = require('./names')
sayHi({nome:nome,sobrenome:sobrenome})