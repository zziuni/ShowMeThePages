
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

Object.defineProperty( Object.prototype, "extend", {
    enumerable: false,
    value: function( from ){
        var props = Object.getOwnPropertyNames( from );
        var dest = this;
        props.forEach( function( name ){
            if( name in dest ){
                var destination = Object.getOwnPropertyDescriptor( from, name );
                Object.defineProperty( dest, name, destination );
            }
        } );
        return this;
    }
} );

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});
app.register( ".html", require( "jqtpl" ).express );
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/shows/:showId', routes.show);
app.get('/shows', routes.shows);
app.get('/getShow/', routes.getShow);
app.get('/test', routes.testting);

app.get('/newSlide', routes.newSlide);
app.get('/slides', routes.slides);
app.get('/editSlide/:slideId', routes.editSlide);
app.get('/slide/:slideId', routes.showSlide);
app.get('/m/:slideId', routes.mobilePoll);

app.listen(3100);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

//socket.io
var http = require( 'http' )
        , fs = require( 'fs' )
        , path = require( 'path' )
        , io = require( 'socket.io' );

io = io.listen( app) ;

io.configure( function(){
    io.enable( 'browser client etag' );
    io.set( 'log level', 3 );
    io.set( 'transports', [
        'websocket'
        , 'flashsocket'
        , 'htmlfile'
        , 'xhr-polling'
        , 'jsonp-polling'
    ] );
} );

var speakerSocket;
io.of( '/speaker' ).on( 'connection', function( socket ){
    console.log( '=> A speaker connected..' );
    socket.on( 'disconnect', function(){
        console.log( '=> A speaker disconnect.' );
    } );

    socket.on( 'good slid', function( data ){
        console.log( '=> spearker good slid' );
        socket.emit( 'create ball', {} );
    } );
    speakerSocket = socket;
} );

io.sockets.on( 'connection', function( socket ){
    console.log( '-> A phone connected..' );
    socket.on( 'disconnect', function(){
        console.log( '-> A phone disconnect.' );
    } );

    socket.on( 'message', function( msg ){
        console.info( 'from phone : ' + msg );
        socket.send( 'server: ok.' );
    } );

    socket.on( 'good slide', function( data ){
        speakerSocket.emit( 'create ball', {} );
        socket.emit( 'think you', { text: 'server: think you'} );
    } );
} );


//Data
var mongo = require('./data_mongo');
