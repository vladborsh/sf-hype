module.exports = class SelectorService {

  constructor ( connection ) {
    this.connection = connection;
  }

  setup ( fields, from, where ) {
    this.fields = fields;
    this.from = from;
    this.where = where;
    return this;
  }

  execute () {
    let query = 'SELECT Id';
    this.fields.forEach( item => {
      query = query.concat( ', ' + item );
    })
    query = query.concat(' FROM ' + this.from );
    if ( this.where ) {
      query = query.concat(' WHERE ' + this.where );
    }
    return new Promise ( (resolve, reject) => {
      this.connection.query( query, (err, result) => {
        if (err) { 
          reject( err );
        }
        resolve( result );
      });
    }) 
  }

}