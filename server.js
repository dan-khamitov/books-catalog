var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");

var PORT = 8080;
var STATIC_EXP = new RegExp('.ico$|.css$|.js$');


var server = http.createServer(function(request, response) {
    var filename = path.join(
        process.cwd(),
        url.parse(request.url).pathname
    );

    if ( !(STATIC_EXP.test(filename)) ) {
        filename = 'index.html';
    }

    fs.exists(filename, function (exists) {
        if (exists) {
            fs.createReadStream(filename).pipe(response);
        } else {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found");
            response.end();
        }
    });


});

console.log('Running on http://127.0.0.1:' + PORT + '/');
server.listen(PORT);