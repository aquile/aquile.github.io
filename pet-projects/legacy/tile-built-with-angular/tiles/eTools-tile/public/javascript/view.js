angular.module('eToolsApp', [])
    .controller('eToolsController', ['$scope', function ($scope) {
        $scope.eToolsData = {};
        var spaceList = [];

        /**
         * @description - function witch is looking for spaces in spaceList array
         * @requries - value from .eTools-search-input
         * @author - Serhii Garbovsky, ANROM Devs Team
         * @return filtered list of spaces
         * @param searchInput (string)
         */
        $scope.findSpace = function (searchInput) {

            $scope.eToolsData.spaceList =
                _(spaceList).chain().
                    filter(function (space) {
                        return space.name.toUpperCase().indexOf(searchInput.toUpperCase()) !== -1;
                    }).
                    sortBy(function (space) {
                        return (space.name).toUpperCase();
                    }).
                    value();
            // $scope.$digest();
            resize();
        };


        /**
         * @description - native jive function provide config obj from backend
         * @requries - false
         * @author - Jive
         * @return config obj
         */
        jive.tile.onOpen(function (config, options) {

            $scope.eToolsData.sortField = "name";
            console.log(config);


            if (!config) {
                $scope.eToolsData.tileTitle = "My eTools";
                $scope.eToolsData.ID = "2006";
                $scope.eToolsData.message = "You do not have access to any eTools";

                console.log("no config.data fetched")
            } else {
                //get default settings of the tile
                $scope.eToolsData.tileTitle = config.tileTitle;
                $scope.eToolsData.ID = config.ID;
                $scope.eToolsData.message = config.message;

                console.log("config.data was fetched")
            }
            getParentPlace($scope.eToolsData.ID);

        });

        /**
         * @description - get parent(Root) space function
         * @author - Serhii Garbovsky, ANROM Devs Team
         * @return parent space object
         * @param ID (number)
         */
        function getParentPlace(ID) {
            osapi.jive.corev3.places.get({entityDescriptor: [14, ID]})
                .execute(function (osapiResponse) {
                    console.log(osapiResponse);
                    if (osapiResponse.error) {
                        document.body.querySelector(".eTools-main-wrp").innerHTML = '<h2 class="eTools-title">' + $scope.eToolsData.tileTitle + '</h2>' +
                            '<p>' + $scope.eToolsData.message + '</p>';

                        console.log("Nothing to show here");
                        return;
                    }
                    isSubSpaces(osapiResponse);
                });
        }

        /*if (osapiResponse.list && !osapiResponse.list.length) {
         document.body.querySelector(".eTools-main-wrp").innerHTML = $scope.eToolsData.message;
         console.log("Nothing to show here");
         return;
         }*/

        /**
         * @description - get subspaces from parent space function
         * @author - Serhii Garbovsky, ANROM Devs Team
         * @return object with subspaces of parent space
         * @param place (object)
         */
        function findSubSpaces(place) {
            place.getPlaces().execute(function (subplaces) {
                console.log(subplaces);

                isSubSpaces(subplaces)
            })
        }

        /**
         * @description - looking is there are any subspaces and recursive run findSubSpaces() if exist
         * @author - Serhii Garbovsky, ANROM Devs Team
         * @return recursive run findSubSpaces()
         * @param places (object)
         */
        function isSubSpaces(places) {
            if (places.list && places.list.length) {
                places.list.forEach(function (place) {

                    //check out for subspaces
                    if (place.type === "space") {

                        spaceList.push({
                            name: place.name,
                            url: place.resources.html.ref
                            //avatar: place.resources.avatar.ref
                        });


                        setTimeout(function () {
                            $scope.$apply(function () {
                                $scope.eToolsData.spaceList = _.sortBy(spaceList, function (space) {
                                    return (space.name).toUpperCase();
                                });
                                resize();
                            });
                        });

                        (place.childCount) ? findSubSpaces(place) :

                            console.log(spaceList);
                    }
                })
            }
        }

        /**
         * resizing function
         */
        function resize() {
            gadgets.window.adjustHeight();
            setTimeout(gadgets.window.adjustHeight(), 250);
            setTimeout(gadgets.window.adjustHeight(), 500);
            setTimeout(gadgets.window.adjustHeight(), 750);
            setTimeout(gadgets.window.adjustHeight(), 1000);
        }
    }]);