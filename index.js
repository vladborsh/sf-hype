#!/usr/bin/env node

const program = require('commander')
const actions = require('./actions')
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

app.listen(9000);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

require('./routes')(app);

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

program
  .command('doc')
  .alias('d')
  .description('Generate doc')
  .action(
    actions.doc
  );

program.parse(process.argv);
