var cities,
    objects;

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

function findWeather() {

    var cityDivs = document.querySelectorAll('.city');
    console.log(cityDivs[0]);

    for (var i = 0; i < cityDivs.length; i++) {


        cityDivs[i].onclick = function (event) {
            console.log(event.currentTarget.dataset.longitude + ' ' + event.currentTarget.dataset.latitude);

            var urlWeather = 'http://api.openweathermap.org/data/2.5/weather?lat=' + event.currentTarget.dataset.longitude + '&lon=' + event.currentTarget.dataset.latitude;

            Ajax.getJSON(urlWeather, function (weatherData) {
                    console.log("______ ");
                    console.log(weatherData);
                    document.querySelector('.weather__info').innerHTML = Templates.Weather.render({
                        weather: weatherData
                    });
                    return weatherData;
                }
            )

        }

    }
}

/*function findWeather() {
 var cityDivs = document.querySelectorAll('.city');

 console.log(objects[0].longitude + ' ' + objects[0].latitude);

 var urlWeather = 'http://api.openweathermap.org/data/2.5/weather?lat=' + cityDivs[0].dataset.longitude + '&lon=' + cityDivs[0].dataset.latitude;
 Ajax.getJSON(urlWeather, function (weatherData) {
 console.log(urlWeather);
 document.querySelector('.weather__info').innerHTML = Templates.Weather.render({
 weather: weatherData
 });
 console.log(weatherData);
 return weatherData;
 }
 )
 }*/

function Weather() {

    this.findCity = function (name) {

        Ajax.getJSON('https://geocode-maps.yandex.ru/1.x/?format=json&kind=locality&geocode=' + name, function (geoData) {
            objects = geoData.response.GeoObjectCollection.featureMember.map(function (fm) {
                //console.log(geoData);
                var go = fm.GeoObject,
                    cordinates = go.Point.pos.split(' ');
                cities = {
                    name: go.name,
                    description: go.description,
                    kind: go.metaDataProperty.GeocoderMetaData.kind,
                    longitude: cordinates[1].slice(0, 4),
                    latitude: cordinates[0].slice(0, 4)
                };

                return cities;
            });/*.filter(function (o) {
                return o.kind === 'locality';
            }); //left in list only cities
*/
            document.querySelector('.weather__cities').innerHTML = Templates.Cities.render({
                cityObj: objects
            });
        });
    };


}
