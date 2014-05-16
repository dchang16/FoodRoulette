var express = require('express');
var app = express();
var path = require('path');

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/public', express.static(__dirname + '/public'));

});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});