const { prompt } = require('inquirer');

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
  ]
}

function getConnectionPrompt (storage) {
  return new Promise( (resolve, reject) => {
    prompt( questions.connection )
    .then(
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
      res => resolve()
    ).catch(
      err => reject(err)
    )
  })
   
}


module.exports = {
  select : () => require('./select/select')( getConnectionPrompt ),
  doc    : () => require('./doc/document-generator')( getConnectionPrompt )
}