const knexConfig = require('../knexfile');
//initialize knex
const knex = require('knex')(knexConfig[process.env.NODE_ENV])
module.exports = knex;
