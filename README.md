# create google analytics code from contentful

This is an example of using contentful to pull the title and google analytics code from an app_config entry type. You can create an app_config entry for every application, then change the code, title, keywords and any other boiler plate information.

``` js
var config = require('zero-config')(__dirname, { dcValue: 'us-east-1'})
var http = require('http')
var fs = require('fs')
var ejs = require('ejs')
var { createClient } = require('contentful')
var indexTemplate = ejs.compile(fs.readFileSync(__dirname + '/../views/index.html.ejs', 'utf-8'))

var client = createClient(config.get('contentful'))

client.getEntry(config.get('entry'))
  .then(result => {

    var server = http.createServer(function (req, res) {
      res.end(indexTemplate(result.fields))
    })

    server.listen(3000)

  })

```
