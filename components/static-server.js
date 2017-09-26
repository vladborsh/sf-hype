const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

module.exports = class Server {

  constructor() {

  }

  start( port ) {
    http.createServer( (req, res) => {
      this.res = res;
      //console.log(`${req.method} ${req.url}`);
      // parse URL
      const parsedUrl = url.parse(req.url);
      // extract URL path
      this.pathname = `.${parsedUrl.pathname}`;
      // maps file extention to MIME types
      const mimeType = this.getMimeTypes();
      fs.exists( this.pathname, exist => {
        if(!exist) {
          // if the file is not found, return 404
          this.res.statusCode = 404;
          this.res.end(`File ${this.pathname} not found!`);
          return;
        }
        // if is a directory, then look for index.html
        if (fs.statSync( this.pathname ).isDirectory()) {
          this.pathname += '/index.html';
        }
        // read file from file system
        fs.readFile(this.pathname, ( err, data ) => {
          if(err){
            this.res.statusCode = 500;
            this.res.end(`Error getting the file: ${err}.`);
          } else {
            // based on the URL path, extract the file extention. e.g. .js, .doc, ...
            const ext = path.parse(this.pathname).ext;
            // if the file is found, set Content-type and send data
            this.res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
            this.res.end(data);
          }
        });
      });
    }).listen( 9000 );
  }


  getMimeTypes() {
    return {
      '.ico': 'image/x-icon',
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.json': 'application/json',
      '.css': 'text/css',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.wav': 'audio/wav',
      '.mp3': 'audio/mpeg',
      '.svg': 'image/svg+xml',
      '.pdf': 'application/pdf',
      '.doc': 'application/msword',
      '.eot': 'appliaction/vnd.ms-fontobject',
      '.ttf': 'aplication/font-sfnt'
    };
  }

}

