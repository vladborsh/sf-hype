class ClassesService {

  constructor( $http, $q ) {
    this.$http = $http;
    this.$q = $q;
  }

  getClasses() {
    let defer = this.$q.deferred();
    this.$http.get('/classes')
      .then ( res => defer.resolve(res) )
      .catch( err => defer.reject() );
    return defer.promise;
  }

}
ClassesService.$inject = [ '$http', '$q' ]
export { ClassesService };