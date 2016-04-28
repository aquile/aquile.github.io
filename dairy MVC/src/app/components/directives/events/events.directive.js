/**
 * Created by aquile_bernadotte on 22.03.16.
 */
export function eventsDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    replace: false,
    templateUrl: 'app/components/directives/events/events.template.html',
    transclude: true
  };

  return directive;
}
