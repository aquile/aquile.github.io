var cities;

function Weather() {
    this.findCity = function (name) {

        Ajax.getJSON('https://geocode-maps.yandex.ru/1.x/?format=json&kind=locality&geocode=' + name, function (geoData) {
            var objects = geoData.response.GeoObjectCollection.featureMember.map(function (fm) {
                console.log(geoData);
                var go = fm.GeoObject,
                    cordinates = go.Point.pos.split(' ');
                cities = {
                    name: go.name,
                    description: go.description,
                    kind: go.metaDataProperty.GeocoderMetaData.kind,
                    longitude: cordinates[0],
                    latitude: cordinates[1]
                };


                var urlWeather = 'http://api.openweathermap.org/data/2.5/weather?lat=' + cities.latitude + '&lon=' + cities.longitude,
                    weatherDataOuter;

                Ajax.getJSON(urlWeather, function (weatherData) {
                    console.log("______ ");
                    console.log(weatherData);
                    document.querySelector('.weather__info').innerHTML = Templates.Weather.render({
                        weather: weatherData
                    });
                    return weatherDataOuter = weatherData;
                });


                return cities;
            });
            //    .filter(function(o){
            //    return o.kind === 'locality';
            //}); оставить только города

            document.querySelector('.weather__cities').innerHTML = Templates.Cities.render({
                cities: objects
            });


        });

        //
        //this.getWeather = function () {
        //    var urlWeather = 'http://api.openweathermap.org/data/2.5/weather?lat=' + cities.latitude + '&lon=' + cities.longitude;
        //
        //    Ajax.getJSON(urlWeather, function (weatherData) {
        //        console.log("______ ");
        //        console.log(weatherData);
        //    });
        //}
    }
}
var Templates = {
    Cities: Hogan.compile(document.querySelector('.templates__city').innerHTML),
    Weather: Hogan.compile(document.querySelector('.templates__weather').innerHTML)
};

var Ajax = {
    getJSON: function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;
            callback(JSON.parse(xhr.responseText))
        };

    }
};
