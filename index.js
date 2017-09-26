#!/usr/bin/env node

const program = require('commander');
const actions = require('./actions/actions')
const Server = require('./components/static-server');

new Server().start();

program
  .version('0.0.1')
  .description('Record management system');

program
  .command('select')
  .alias('s')
  .description('Select records')
  .action(
    actions.select
  );

program.parse(process.argv);
