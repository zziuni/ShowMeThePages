/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 9. 5.
 * Time: 오후 11:11
 */
var clog = require( 'clog' );
clog.configure( {"log level": 5} );

exports.setListener = function( io, speaker ){
    "use strict";
    io.sockets.on( 'connection', function( audience ){
        audience.on( 'disconnect', function(){} );

        audience.on( 'message', function( msg ){
            clog.debug( 'audience send message : ' + msg );
            audience.send( 'server: ok.' );
        } );

        audience.on( 'good slide', function( data ){
            clog.debug( 'audience is trigger good slide event : ' + data );
            if( speaker ){
                speaker.volatile.emit( 'create ball', {} );
            }
            audience.send( 'sever: think you' );
        } );
    } );
};