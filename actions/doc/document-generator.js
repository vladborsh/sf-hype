const opener = require("opener");
const ConnectionsStorage = require('../../components/connections-storage');
const DocumentService = require('./document-service');
const program = require('commander');
const { prompt } = require('inquirer');

const generalStorage = require('../../components/general-storage');

var storage = new ConnectionsStorage();

const questions = {
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

const generateDocRequest = () => {
  const docService = new DocumentService( storage.getConnectionByAlias('source') );
  docService.generate()
  .then(
    res => {
      generalStorage.put('classes', res);
      opener("http://localhost:9000?type=doc") ;
      return prompt( questions.next );
    },
    err => {
      console.log(err);
      return prompt( questions.next );
    }
  ).catch(
    err => console.log(err)
  )
}


module.exports = ( connection ) => {
  connection(storage)
  .then(
    res => { return generateDocRequest() }
  )
  .catch(
    err => console.log(err)
  )
}