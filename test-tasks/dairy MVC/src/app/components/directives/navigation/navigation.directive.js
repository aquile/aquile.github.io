/**
 * Created by aquile_bernadotte on 22.03.16.
 */
export function navigationDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    replace: true,
    templateUrl: 'app/components/directives/navigation/navigation.template.html',
    transclude: true
  };

  return directive;
}
