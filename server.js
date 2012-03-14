/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 3. 15.
 * Time: 오전 12:48
 */
var http = require( 'http' )
        , fs = require( 'fs' )
        , path = require( 'path' )
        , io = require( 'socket.io' );

var server = http.createServer( function( req, res ){
    var filename = path.join( process.cwd(), req.url );

    path.exists( filename, function( exists ){
        if( !exists ){
            res.writeHead( 404, {"Content-Type": "text/plain"} );
            res.write( "404 Not Found\n" );
            res.end();
            return;
        }

        console.log(filename);

        fs.readFile( filename, encoding = 'utf-8', function( err, data ){
            if( err ){
                res.writeHead( 500, {"Content-Type": "text/plain"} );
                res.write( err + "\n" );
                res.end();
                return;
            }
//            res.writeHead( 200, {"Content-Type": "text/html; charset=utf-8"} );
            res.end( data );
        } );
    } );
} );

server.listen( 3000 );

io = io.listen( server );

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
    console.log( '=====A speaker connected..' );
    socket.on( 'disconnect', function(){
        console.log( '-----A speaker disconnect.' );
    } );

    socket.on( 'good slid', function( data ){
        console.log( 'spearker good slid' );
        socket.emit( 'create ball', {} );
    } );
    speakerSocket = socket;
} );

io.sockets.on( 'connection', function( socket ){
    console.log( '=====A phone connected..' );
    socket.on( 'disconnect', function(){
        console.log( '-----A phone disconnect.' );
    } );

    socket.on( 'message', function( msg ){
        console.log( msg );
        socket.send( 'server: ok.' );
    } );

    socket.on( 'good slid', function( data ){
        console.log( data.text );
        speakerSocket.emit( 'create ball', {} );
        socket.emit( 'think you', { text: 'server: think you'} );
    } );
} );




console.log( "서버가 시작되었습니다. http://localhost:3000" );
