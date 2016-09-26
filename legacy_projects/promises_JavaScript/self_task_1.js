

function  delay (ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, ms);
    });
}

var urls = ['user.json', 'guest.json'];

function httpGet(url) {
    return new Promise(function(resolve, reject) {
       var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            if(this.status === 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error)
            }
        };

        xhr.onerror = function () {
            reject(new Error('Network error'));
        };

        xhr.send();
    });
}

function chainRequests (urls) {
    var chain = Promise.resolve();
    var results = [];

    urls.forEach(function(url) {
        chain = chain
            .then(function() {
                httpGet(url)
            })
            .then(function(data) {
                console.log(data);
            results.push(data);
        })
    });
    setTimeout(function(){console.log(results)}, 1000)
    chain.then(function() {
        console.log(data);
        return results
    })

}

chainRequests(urls);

function chainJSOn(arr){
    var allResults = [];

    arr.forEach(function(url){
        allResults.push(new Promise($.get(url)));
    });

    Promise.all(allResults).then(function(data){
        console.log(data)
    })
}

chainJSOn(urls);