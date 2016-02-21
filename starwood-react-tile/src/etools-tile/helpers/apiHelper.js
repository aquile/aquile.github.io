import _ from "underscore";

// https://facebook.github.io/react/docs/component-api.html
const JIVE_PLACE_TYPE_ID = 14;


export function getConfig() {
    return new Promise((resolve, reject) => {
        jive.tile.onOpen(
                config => config ?
                resolve({
                    tileTitle: config.tileTitle,
                    ID: config.ID,
                    message: config.message
                }) : resolve({
                    tileTitle: "My eTools on React.js",
                    ID: "2006",
                    message: "Wrooooooooooooooom!"
                })
        )
    });
}


export function getPlace(ID) {
    return new Promise(
        (resolve, reject) => osapi.jive.corev3.places.get({entityDescriptor: [JIVE_PLACE_TYPE_ID, ID]})
            .execute(function (osapiResponse) {
                console.log(osapiResponse);

                if (osapiResponse.error) {
                    //document.body.querySelector(".eTools-main-wrp").innerHTML = '<h2 class="eTools-title">' + $scope.eToolsData.tileTitle + '</h2>' +
                    //    '<p>' + $scope.eToolsData.message + '</p>';

                    reject(osapiResponse.error);

                    //console.log("Nothing to show here");
                    //return;
                } else {
                    resolve(osapiResponse.list[0]);
                }

            })
    );
}

export function getChildPlaces(place) {
    return new Promise(resolve => {
        if (!place.childCount){
            resolve([]);
            return;
        }

        place.getPlaces().execute(function (subplaces) {
            resolve(subplaces.list)
        })
    });
}


export function getSpaceTree(parentPlacecID) {
    return new Promise((resolve, reject) => {
        let resultSpaces = [];

        Promise.all([
            getPlace(parentPlacecID)
        ]).then(iteration).catch(reject);

        function iteration(places) {
            const spaces = places.filter(place => place.type === 'space');

            if (!spaces.length){
                resultSpaces = resultSpaces.sort((s1, s2) => {
                    if (s1.name.toUpperCase() < s2.name.toUpperCase()) return -1;
                    if (s1.name.toUpperCase() > s2.name.toUpperCase()) return 1;
                    return 0;
                });

                resolve(resultSpaces);
                return;
            }

            spaces.forEach(space => {
                resultSpaces.push({
                    name: space.name,
                    url: space.resources.html.ref
                });
            });


            const promises = spaces.map(getChildPlaces);

            Promise.all(promises)
                   .then(unwind)
                   .then(iteration)
                   .catch(reject);
        }
    });

}

// [[1,2],[3,4]] -> [1,2,3,4]
function unwind(arrayOfArrays) {
    return arrayOfArrays.reduce((result, subarray) => [...result, ...subarray], []);
}

/**
 * resizing function
 */
export function resize() {
    gadgets.window.adjustHeight();
    setTimeout(gadgets.window.adjustHeight(), 250);
    setTimeout(gadgets.window.adjustHeight(), 500);
    setTimeout(gadgets.window.adjustHeight(), 750);
    setTimeout(gadgets.window.adjustHeight(), 1000);
}












/*



function isSubSpaces(places) {
    let result = {
        spaceList: [],
    };

    if (places.list && places.list.length) {
        places.list.forEach(function (place) {

            //check out for subspaces
            if (place.type === "space") {

                mainObj.spaceList.push({
                    name: place.name,
                    url: place.resources.html.ref
                });

                mainObj.spaceList = _.sortBy(spaceList, function (space) {
                    return (space.name).toUpperCase();
                });

                (place.childCount) ? findSubSpaces(place) : console.log("in space no subspaces are presert"); //, place.ID);

                console.log(spaceList);
            }
        })
    }
}

function findSubSpaces(place) {
    place.getPlaces().execute(function (subplaces) {
        console.log(subplaces);

        isSubSpaces(subplaces)
    })
}

export function findSpace(searchInput) {

    mainObj.spaceList = mainObj.spaceList
        .filter(space => space.name.toUpperCase().indexOf(searchInput.toUpperCase()) !== -1)
        .sort((s1, s2) => {
            //return (s1.name.toUpperCase() > s2.name.toUpperCase()) ?  1 :  -1;
            if (s1.name.toUpperCase() < s2.name.toUpperCase()) return -1;
            if (s1.name.toUpperCase() > s2.name.toUpperCase()) return 1;
            return 0;
        });


    mainObj.spaceList =
        _(mainObj.spaceList).chain().
            filter(function (space) {
                return space.name.toUpperCase().indexOf(searchInput.toUpperCase()) !== -1;
            }).
            sortBy(function (space) {
                return (space.name).toUpperCase();
            }).
            value();

    resize();
}




//========================================================================
function normalizeResponse(responseText) {
    return responseText.replace('throw \'allowIllegalResourceCall is false.\';', '');
}



export function fetchJiveJson(url) {
    return fetch(url)
        .then(response => {
            if (response.status == 200) {
                return response
            } else {
                throw new Error('Server request ' + url + ' error ' + response.status);
            }
        })
        .then(response => response.text())
        .then(normalizeResponse)
        .then(json => JSON.parse(json));
}

export function getChildPlaces(placeID) {
    console.log('getChildPlaces ' + placeID);

    //return fetchJiveJson(`/api/core/v3/places/${placeID}/places`).then(data => data.list);

    return new Promise((resolve, reject) => {


        osapi.jive.corev3.places.get({entityDescriptor: [JIVE_PLACE_TYPE_ID, placeID]})
            .execute(response => {

                console.log('getChildPlaces response', response);
                resolve(response.list);
            });


    });
}

export function getSpaceTree(placeID) {
    console.log('getSpaceTree ' + placeID);

    return new Promise((resolve, reject) => {
        let result = [];

        const promiseList = spaceList.map(space => getChildPlaces(space.placeID));

        Promise.all(promiseList).then(onCompleted);

        function step(places) {
            console.log('getSpaceTree step');

            const spaceList = places.filter(place => place.type === 'space');

            result = [
                ...result,
                ...spaceList.map(
                        space => ({
                        placeID: place.placeID,
                        name: place.name,
                        url: place.resources.html.ref
                    })
                )
            ];

            const spaceWithChildrenList = places.filter(space => space.childCount);

            const DNO = spaceWithChildrenList.length === 0;

            if (DNO) {
                console.log('getSpaceTree result', result);
                resolve(result);
            } else {
                const promiseList = spaceList.map(space => getChildPlaces(space.placeID));

                Promise.all(promiseList).then(unwind).then(step).catch(reject);
            }
        }

        getChildPlaces(placeID).then(step, reject);
    });
}

/!*
 //
 //osapi.jive.corev3.places.get({search: "test1"}).execute(function (response) {
 //    console.log("Places response:", response);
 //
 //    $.ajax({
 //        type: "GET",
 //        url: "https://jivedemo-socialedge.jiveon.com/api/core/v3/places/" + response.list[0].placeID + "/places",
 //        dataType: "application/json"
 //    }).always(function (data) {
 //
 //        var result = $.parseJSON(data.responseText.replace('throw \'allowIllegalResourceCall is false.\';', ''));
 //        console.log(result)
 //    })
 //});

 // export function getRootSpaceTree(){
 //     return new Promise((resolve, reject) => {


 //         osapi.jive.corev3.places.get({entityDescriptor: [14, 2129]}).execute(response => {
 //             const places = response.list;

 //             getSpaceTree(places).then(resolve, reject);
 //         });


 //     });
 // }
*/
