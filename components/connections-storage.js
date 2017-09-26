var LoginService = require('./login-service');

module.exports = class ConnectionsStorage {

  constructor() {
    this.storage = {};
  }

  getNewConnnection( username, password ) {
    return new LoginService( username, password );
  }

  getConnectionByAlias( alias ) {
    return this.storage[alias];
  }

  saveConnection( alias, connection ) {
    this.storage[ alias ] = connection;
    return this;
  }

  saveNewConnections( credentials ) {
    return new Promise( ( resolve, reject ) => {
      let promises = [];
      credentials.forEach( item => {
        console.log(item);
        promises.push( this.getNewConnnection( item.username, item.password ).connect() )
      })
      Promise.all(promises)
      .then(
        res => {
          for ( let key in res ) {
            if (credentials[key].alias) {
              this.saveConnection( credentials[key].alias, res[key] );
            } else {
              this.saveConnection( credentials[key].username, res[key] );
            }
          }
          resolve( this.storage );
        }
      ).catch(
        err => {
          reject( err );
        }
      );
    });  
  }

}