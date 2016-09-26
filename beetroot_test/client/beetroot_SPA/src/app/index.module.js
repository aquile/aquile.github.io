/* global moment:false */

import { config } from './index.config';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { mainViewDirective } from '../app/components/directives/mainView/mainView.directive';


angular.module('BeetrootSPA', ['ngAnimate', 'ngAria', 'ngMaterial', 'ngMessages',
  'ngCookies', 'ngTouch', 'ngSanitize', 'toastr', 'LocalStorageModule', 'underscore'])
  .constant('moment', moment)
  .config(config)
  .run(runBlock)
  .directive('mainView', mainViewDirective)
  .controller('MainController', MainController);


