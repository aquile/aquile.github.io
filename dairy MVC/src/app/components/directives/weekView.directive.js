/**
 * Created by aquile_bernadotte on 22.03.16.
 */
export function WeekViewDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/directives/weekView.template.html',
    transclude: true
  };

  return directive;
}
