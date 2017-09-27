class ClassesListController {

  constructor( ClassService ) {
    this.init();
  }

  init() {
    ClassService.getClasses()
      then( res => this.items = res );
  }

}
ClassesListController.$inject = [ 'ClassService' ]

export var c = {
  templateUrl: 'classes/classes.html',
  controller: ClassesListController,
  bindings: {}
}
