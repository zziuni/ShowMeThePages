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
    io = sio.listen( app ) ;

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
    io.of( '/speaker' ).on( 'connection', function( speaker ){
        console.log( '=> A speaker connected..' );

        speaker.on( 'disconnect', function(){
            console.log( '=> A speaker disconnect.' );
        } );

        speaker.on( 'good slid', function( data ){
            console.log( '=> spearker good slid' );
            speaker.emit( 'create ball', {} );
        } );

        speakerSocket = speaker;
    } );

    io.sockets.on( 'connection', function( audience ){
        console.log( '-> A phone connected..' );

        audience.on( 'disconnect', function(){
            console.log( '-> A phone disconnect.' );
        } );

        audience.on( 'message', function( msg ){
            console.info( 'from phone : ' + msg );
            audience.send( 'server: ok.' );
        } );

        audience.on( 'good slide', function( data ){
            if(speakerSocket){
                speakerSocket.emit( 'create ball', {} );
            }
            audience.send( 'server: think you' );
        } );
    } );
};

