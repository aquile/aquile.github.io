/**
 * Created by aquile_bernadotte on 20.02.16.
 */

//Declare angular module
var app = angular.module('app', []);

//Declare angular controller
app.controller('blogStoriesCntrl', ['$scope', function ($scope) {

    var requests = [],
        numbers = [0, 1, 2, 3];

    _.each(numbers, function (id) {
        requests.push(Promise.resolve(localStorage.getItem("blogPostFromManager" + id)))
    });

    Promise.all(requests).then(function (values) {

        var tempArr = [], result;
        _.each(values, function (elem) {
            var key = JSON.parse(elem);
            var content = key.list[0].content.text.replace(/\<\!--(.*?)--\>/gi, '');

            var infoObj = {
                avatar: key.list[0].author.resources.avatar.ref,
                authorLink: key.list[0].author.resources.html.ref,
                title: key.list[0].subject,
                subtitle: $(content).filter(".jive-rendered-content").text().substring(0, 190) + "... Подробнее >>",
                postLink: key.list[0].permalink,
                date: new Date(key.list[0].publishDate.replace("+0000", "")).getTime(),
                dateString: key.list[0].publishDate
            };

            tempArr.push(infoObj);
        });

        tempArr = _.sortBy(tempArr, function (obj) {
            return +obj.date * -1;
        });

        result = tempArr.splice(0, 2);

        $scope.$apply(function () {
            $scope.config = result;
        });

    });
}]);


// Below this line production code=====================================================================


/*//configs
// https://in.beeline.kz/people/TParkhomenko/blog
// https://in.beeline.kz/people/AVKomarov/blog
// https://in.beeline.kz/people/AGrigorev/blog
// https://in.beeline.kz/people/OAldoshin/blog
// https://in.beeline.kz/people/ABendz/blog
// https://in.beeline.kz/people/TBattalkhanov/blog
// https://in.beeline.kz/people/YMukanov/blog

//https://in.beeline.kz/api/core/v3/places?filter=entityDescriptor(2020,containedID of the blog) => placeID
window._configPlacesID = [
    12518, //"OAldoshin":
    8308, //"TParkhomenko":
    8635, //"AVKomarov":
    7098, //"AGrigorev":
    5733, //"ABendz":
    11275, //"TBattalkhanov":
    15803 //YMukanov
    //if you want to add blogs  to be displayed- u should increase height of the body for ~130px per one
];

//Declare angular module
var app = angular.module('app', []);

//Declare angular controller
app.controller('blogStoriesCntrl', ['$scope', function ($scope) {

    var requests = [];

    _.each(window._configPlacesID, function (id) {
        requests.push(Promise.resolve(rest.get("/api/core/v3/contents?filter=place(/places/" + id + ")&count=1")))
    });

    Promise.all(requests).then(function (values) {
        //console.log(values);
        var tempArr = [], result;

        _.each(values, function (key, index) {

            var content = key.list[0].content.text.replace(/\<\!--(.*?)--\>/gi, '');

            var infoObj = {
                avatar: key.list[0].author.resources.avatar.ref,
                authorLink: key.list[0].author.resources.html.ref,
                title: key.list[0].subject,
                subtitle: $(content).filter(".jive-rendered-content").text().substring(0, 190) + "... Подробнее >>",
                postLink: key.list[0].permalink,
                date: new Date(key.list[0].publishDate.replace("+0000", "")).getTime(),
                dateString: key.list[0].publishDate
            };

            tempArr.push(infoObj);
            //console.log("index ", index, "obj ", infoObj, "tempArr ", tempArr)
        });
        tempArr = _.sortBy(tempArr, function (obj) {
            return +obj.date * -1;
        });

        //            tempArr = tempArr.sort(function (a, b) {
        //                return +b.date - +a.date;
        //            });

        result = tempArr.splice(0, 2);

        //console.log("result", result);
        $scope.$apply(function () {
            $scope.config = result;
        });

    });
}]);


if (!window.RESTWrapper) {
    RESTWrapper = function (win, version) {
        this.win = (typeof win == 'undefined') ? window : win;
        this.version = 'v' + (typeof version == 'undefined' ? 3 : version);
    };
    RESTWrapper.prototype = {
        _query: function (method, url, params) {
            var chunks = url.split('?');

            if (chunks[0].indexOf('/api/core/' + this.version) === -1) url = '/api/core/' + this.version + url;

            var def = jQuery.Deferred();
            if (method == 'post' || method == 'put') {
                var ajax = jQuery.ajax({
                    dataType: 'text',
                    contentType: 'application/json',
                    url: url,
                    data: JSON.stringify(params),
                    type: method
                });
            } else {
                var ajax = jQuery.ajax({dataType: 'text', url: url, data: params, type: method});
            }
            ajax.done(function (result) {
                if (typeof result != 'undefined') {
                    result = JSON.parse(result.replace("throw 'allowIllegalResourceCall is false.';", ''));
                }
                def.resolve(result);
                answer = result;
            });
            ajax.fail(function (a, b, c) {
                console.error('fail:', a, b, c);
                answer = a;
                def.reject(a)
            });
            return def.promise();
        },
        get: function (url, data) {
            return this._query('get', url, data)
        },
        post: function (url, data) {
            return this._query('post', url, data)
        },
        put: function (url, data) {
            return this._query('put', url, data)
        },
        delete: function (url, data) {
            return this._query('delete', url, data)
        },
        find: function (typeString, visibleID) {
            var typeID;
            var placeIDs = [4, 14, 600];
            var typeIDs = {
                "community": 14,
                "space": 14,
                "group": 4,
                "project": 600,
                "discussion": 1,
                "thread": 1,
                "document": 102
            };
            var typeID = typeIDs[typeString];
            return this.get((placeIDs.indexOf(typeID) != -1 ? '/places' : '/contents') + '?filter=entityDescriptor(' + typeID + ', ' + visibleID + ')');
        },
        printFind: function (typeString, visibleID) {
            this.find(typeString, visibleID).then(function (data) {
                console.log(data.list[0])
            })
        }
    };
}
window.rest = window.rest || new RESTWrapper(window, 3);*/


