import angular from 'angular';

import * as ClassesComponent from './classes/classes.component';
import * as Root from './root/root.component';
import { ClassService } from './classes/classes.srv';

angular.module('App', [])

angular.module('App')
  .service( 'ClassService', ClassService )
  .component( 'root', Root.c )
  .component( 'classes', ClassesComponent.c )
  .component('home', {
    template: '<h1>Home</h1><p>Hello, {{ $ctrl.user.name }} !</p>',
    controller: function() {
      console.log('Home')
      this.user = {name: 'world'};
    }
  });

console.log('no way')
