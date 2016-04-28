function Http () {
    /**
     * Helper for http calls
     * @param method
     * @param url
     * @param data
     * @returns {Promise}
     */
    function makeRequest(method,url,data) {
        var data = data || '';
        // Return a new promise.
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open(method, url);

            req.onload = function() {
                if (req.status == 200) {
                    resolve(req.response);
                }
                else {
                    reject(Error(req.statusText));
                }
            };
            req.onerror = function() {
                reject(Error("Something went wrong ... "));
            };
            req.send(data);
        });
    }
    this.makeRequest = makeRequest;
}

//// usage example
var http = new Http();

http.makeRequest('GET', 'data.json').then(
    function (response) {
        console.log("Success!", response);
    }, function (error) {
        console.error("Failed!", error);
    });

