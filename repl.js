const repl = require('repl').start();
const models = require('./models');
require('repl-models')(repl, models);
