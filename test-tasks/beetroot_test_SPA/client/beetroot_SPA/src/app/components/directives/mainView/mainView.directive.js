/**
 * Created by aquile_bernadotte on 22.03.16.
 */
export function mainViewDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    replace: false,
    templateUrl: 'app/components/directives/mainView/mainView.template.html',
    transclude: true
  };

  return directive;
}
