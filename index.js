const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req,res) => {
    console.log("Request for " + req.url + " by method " + req.method);

    //If the request is a GET request
    if(req.method == 'GET'){
        var fileUrl;
        //The relative url is /
        if(req.url == '/'){
            fileUrl = '/index.html';
        }else{
            //If the requested URL has something other than /
            fileUrl = req.url;
        }
//Setting the filepath as the relative path
        var filePath = path.resolve('./public'+fileUrl);
        const fileExt = path.extname(filePath);
        //Checking for file extensions
        if(fileExt == '.html'){
            fs.exists(filePath, (exists) => {
                if(!exists){
                    res.statusCode = 404;
                    res.setHeader('Content-Type','text-html');
                    res.end('<html><body><h1>Error 404: ' + fileUrl + ' not found</h1></body></html>');
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type','text/html');
                fs.createReadStream(filePath).pipe(res);
            })
        }else{
            //if the file is not an html file
            res.statusCode = 404;
            res.setHeader('Content-Type','text/html');
            res.end('<html><body><h1>Error 404: ' + fileUrl + ' not an HTML file</h1></body></html>');
        }
    }else{
        //if it is not a GET request
        req.statusCode = 404;
        req.setHeader('Content-Type','text/html');
        res.end('<html><body><h1>Error 404: ' + req.method + ' not supported</h1></body></html>');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
});