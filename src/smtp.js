/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 3. 31.
 * Time: 오전 12:45
 */
var http = require( 'http' ),
    fs = require( 'fs' ),
    path = require( 'path' ),
    sio = require( 'socket.io' ),
    env = require( './env' ),
    speaker = require( './speaker' ),
    audience = require( './audience.js' );

exports.init = function( app ){
    "use strict";
    env.log.debug( 'call smtp#init()' );
    var io = sio.listen( app );

    io.configure( function(){
        io.enable( 'browser client etag' );
        io.set( 'log level', 2 );
        io.set( 'transports', [
            'websocket',
            'flashsocket',
            'htmlfile',
            'xhr-polling',
            'jsonp-polling'
        ] );
    } );

    speaker.setListener( io, audience.setListener );
};