http = require('http');
fs = require('fs');
server = http.createServer( function(req, res) {
        console.log("POST");
        var body = '';        
        req.on('data', function (data) {
            body += data;            
        });
        req.on('end', function () {
            if(body.length > 0)
            {
                var obj = JSON.parse(body);
                if(obj.length > 0)
                {
                    var keys = Object.keys(obj[0]);

                    console.log(keys);
                        
                    const Json2csvParser = require('json2csv').Parser;
                    const json2csvParser = new Json2csvParser({ keys });
                    const csv = json2csvParser.parse(obj);
                    console.log(csv);
                    fs.writeFileSync("assets/data.csv", csv, { encoding: 'binary' });
                }
            }
        });
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('post received');
});

port = 6064;
host = '127.0.0.1';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);