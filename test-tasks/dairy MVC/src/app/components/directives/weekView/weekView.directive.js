/**
 * Created by aquile_bernadotte on 22.03.16.
 */
export function WeekViewDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    replace: true,
    templateUrl: 'app/components/directives/weekView/weekView.template.html',
    transclude: true
  };

  return directive;
}
