/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 9. 5.
 * Time: 오후 11:11
 */
var env = require( './env' );

exports.setListener = function( io, speaker ){
    "use strict";
    io.sockets.on( 'connection', function( audience ){
        audience.on( 'disconnect', function(){} );

        audience.on( 'message', function( msg ){
            env.log.debug( 'audience send message : ' + msg );
            audience.send( 'server: ok.' );
        } );

        audience.on( 'good slide', function( data ){
            env.log.debug( 'audience is trigger good slide event : ' + data );
            if( speaker ){
                speaker.volatile.emit( 'create ball', {} );
            }
            audience.send( 'sever: think you' );
        } );
    } );
};