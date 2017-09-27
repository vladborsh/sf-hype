class ClassesDetailsController {

  constructor( ClassService ) {
    this.init();
  }

  init() {
    
  }

}
ClassesDetailsController.$inject = [ 'ClassService' ]

export var c = {
  templateUrl: 'classes/classes.html',
  controller: ClassesDetailsController,
  bindings: {}
}
