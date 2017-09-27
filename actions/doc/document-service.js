module.exports = class DocumentService {

  constructor ( connection ) {
    this.connection = connection;
  }

  generate () {
    return new Promise ( (resolve, reject) => {
      this.connection.tooling
        .query('Select Id, SymbolTable FROM ApexClass')
        .execute( (err, result) => {
          if (err) { 
            reject( err ); 
          }
          resolve( result.records );
        });
    }) 
  }

}