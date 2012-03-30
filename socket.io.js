/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 3. 31.
 * Time: 오전 12:45
 */
var http = require( 'http' )
        , fs = require( 'fs' )
        , path = require( 'path' )
        , sio = require( 'socket.io' );

var io;
exports.init = function( app ){

    io = sio.listen( app) ;

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
};

