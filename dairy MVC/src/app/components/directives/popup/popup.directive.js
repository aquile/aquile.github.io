/**
 * Created by aquile_bernadotte on 22.03.16.
 */
export function popupDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    replace: true,
    templateUrl: 'app/components/directives/popup/popup.template.html',
    transclude: true
  };

  return directive;
}
