const opener = require("opener");
const ConnectionsStorage = require('../../components/connections-storage');
const SelectorService = require('../../components/selector-service');
const program = require('commander');
const { prompt } = require('inquirer');


var storage = new ConnectionsStorage();

const questions = {
  'connection' : [
    {
      type : 'input',
      name : 'username',
      message : 'Enter username ...'
    },
    {
      type : 'input',
      name : 'password',
      message : 'Enter password ...'
    }
  ],
  'select' : [
    {
      type : 'input',
      name : 'objectName',
      message : 'Enter object name ...'
    },
    {
      type : 'input',
      name : 'fields',
      message : 'Enter fields (coma separeted) ...'
    },
    {
      type : 'input',
      name : 'where',
      message : 'Enter where clause ...'
    }
  ],
  'next' : [
    {
      type : 'list',
      name : 'next',
      message : 'Do you want to continue?',
      choices : [ 'Yes', 'No' ]
    }
  ]
}

const selectRequest = () => {
  prompt( questions.select )
  .then(
    answers => {
      const selector = new SelectorService( storage.getConnectionByAlias('source') );
      return selector.setup(
        answers.fields.replace(' ', '').split(','),
        answers.objectName,
        answers.where
      ).execute();
    }
  ).then(
    res => {
      let jsonStr = JSON.stringify(res.records);
      opener("http://localhost:9000/views/report.html?items=" + encodeURIComponent( jsonStr ) ) ;
      return prompt( questions.next );
    }
  ).then(
    answers => {
      if ( answers.next === 'Yes' ) {
        selectRequest();
      } else {
        process.exit();
      }
    }
  )
}


module.exports = () => {
  prompt(questions.connection).then(
    answers => {
      return storage.saveNewConnections([
        {
          alias: 'source',
          username: answers.username,
          password: answers.password
        }
      ])
    }
  ).then(
    res => {
      selectRequest();
    }
  )
}