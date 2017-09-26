var jsforce = require ('jsforce');

module.exports = class LoginService {

  constructor ( username, password ) {
    this.username = username;
    this.password = password;
  }

  connect () {
    return new Promise ( (resolve, reject) => {
      this.connection = new jsforce.Connection({});
      this.connection.login(this.username, this.password, ( err, userInfo ) => {
        if (err) { 
          reject ( err ); 
        }
        this.userInfo = userInfo;
        resolve ( this.connection );
      });
    })
  }

  getUserinfo () {
    return this.userInfo;
  }

}