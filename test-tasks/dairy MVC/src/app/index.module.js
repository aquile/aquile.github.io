/* global moment:true */

import { config } from './index.config';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { WeekViewDirective } from '../app/components/directives/weekView/weekView.directive';
import { navigationDirective } from '../app/components/directives/navigation/navigation.directive';
import { eventsDirective } from '../app/components/directives/events/events.directive';
import { popupDirective } from '../app/components/directives/popup/popup.directive';


angular.module('dairyMvc', ['ngAnimate', 'ngAria', 'ngMaterial', 'ngMessages',
  'ngCookies', 'ngTouch', 'ngSanitize', 'toastr', 'LocalStorageModule', 'underscore'])
  .constant('moment', moment)
  .config(config)
  .run(runBlock)
  .directive('weekView', WeekViewDirective)
  .directive('navigation', navigationDirective)
  .directive('events', eventsDirective)
  .directive('popup', popupDirective)
  .controller('MainController', MainController);

/*const underscore = angular.module('underscore', [])
 .factory('_', ['$window', function ($window) {
 return $window._; // assumes underscore has already been loaded on the page
 }]);*/
//underscore
//
// And then you can ask for the _ in your app's module:

// Declare it as a dependency of your module
/*var app = angular.module('app', ['underscore']);

// And then inject it where you need it
app.controller('Ctrl', function ($scope, _) {
  // do stuff
});*/

//.constant('malarkey', malarkey)
//.service('githubContributor', GithubContributorService)
//.service('webDevTec', WebDevTecService)
//.factory('StorageInquireService', StorageInquireService)

//import { StorageInquireService } from '../app/components/factories/storageInquireService';
//import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
//import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
//import { NavbarDirective } from '../app/components/navbar/navbar.directive';
//import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';
//.directive('acmeNavbar', NavbarDirective)
//.directive('acmeMalarkey', MalarkeyDirective);
