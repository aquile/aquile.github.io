(function (angular, undefined) {
    'use strict';

    function createActivationState($parse, attr, scope) {
        function unboundState(initValue) {
            var activated = initValue;
            return {
                getValue: function () {
                    return activated;
                },
                setValue: function (value) {
                    activated = value;
                }
            };
        }

        function oneWayBindingState(getter, scope) {
            return {
                getValue: function () {
                    return getter(scope);
                },
                setValue: function () {
                }
            }
        }

        function twoWayBindingState(getter, setter, scope) {
            return {
                getValue: function () {
                    return getter(scope);
                },
                setValue: function (value) {
                    if (value !== getter(scope)) {
                        scope.$apply(function () {
                            setter(scope, value);
                        });
                    }
                }
            };
        }

        if (attr !== "") {
            var getter = $parse(attr);
            if (getter.assign !== undefined) {
                return twoWayBindingState(getter, getter.assign, scope);
            } else {
                return oneWayBindingState(getter, scope);
            }
        } else {
            return unboundState(true);
        }
    }

    function createDirective(module, attrName, direction) {
        module.directive(attrName, ['$parse', '$window', '$timeout', function ($parse, $window, $timeout) {
            return {
                priority: 1,
                restrict: 'A',
                link: function (scope, $el, attrs) {
                    var el = $el[0];
                    var activationState = createActivationState($parse, attrs[attrName], scope);
                    console.log(activationState + '');
                    function scrollIfGlued() {
                        $timeout(function () {
                            if (activationState.getValue() || !direction.isAttached(el)) {
                                direction.scroll(el);
                            }
                        }, 350, false);
                    }

                    function onScroll() {
                        activationState.setValue(direction.isAttached(el));
                    }

                    scope.$watch(scrollIfGlued);

                    scrollIfGlued();

                    $window.addEventListener('resize', scrollIfGlued, false);

                    $el.on('scroll', function () {
                        $timeout(onScroll, 350, false);
                    });

                    // Remove listeners on directive destroy
                    $el.on('$destroy', function () {
                        $el.unbind('scroll', onScroll);
                    });

                    scope.$on('$destroy', function () {
                        $window.removeEventListener('resize', scrollIfGlued, false);
                    });
                }
            };
        }]);
    }

    var bottom = {
        isAttached: function (el) {
            // + 1 catches off by one errors in chrome
            return el.scrollTop + el.clientHeight + 1 >= el.scrollHeight;
        },
        scroll: function (el) {
            el.scrollTop = el.scrollHeight;
        }
    };

    var top = {
        isAttached: function (el) {
            return el.scrollTop <= 1;
        },
        scroll: function (el) {
            el.scrollTop = 0;
        }
    };

    var right = {
        isAttached: function (el) {
            return el.scrollLeft + el.clientWidth + 1 >= el.scrollWidth;
        },
        scroll: function (el) {
            el.scrollLeft = el.scrollWidth;
        }
    };

    var left = {
        isAttached: function (el) {
            return el.scrollLeft <= 1;
        },
        scroll: function (el) {
            el.scrollLeft = 0;
        }
    };

    var module = angular.module('luegg.directives', []);

    createDirective(module, 'scrollGlue', bottom);
    console.log('bottom directive created');
    createDirective(module, 'scrollGlueTop', top);
    createDirective(module, 'scrollGlueBottom', bottom);
    createDirective(module, 'scrollGlueLeft', left);
    createDirective(module, 'scrollGlueRight', right);
}(angular));
