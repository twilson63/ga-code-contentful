var http = require('http')
var fs = require('fs')
var ejs = require('ejs')
var fetchConfig = require('zero-config')
var config = fetchConfig(__dirname, { dcValue: 'us-east-1'})
var { createClient } = require('contentful')
var indexTemplate = ejs.compile(fs.readFileSync(__dirname + '/views/index.html.ejs', 'utf-8'))

var client = createClient(config.get('contentful'))

client.getEntry(config.get('entry'))
  .then(result => {
    var server = http.createServer(function (req, res) {
      res.writeHead(200, { 'content-type': 'text/html'})
      res.end(indexTemplate(result.fields))
    })

    server.listen(3000)

  })
