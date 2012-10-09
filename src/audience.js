/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 9. 5.
 * Time: 오후 11:11
 */
var env = require( './env' );

exports.setListener = function( io, speaker ){
    "use strict";
    io.of('/audience').on( 'connection', function( audience ){
        audience.on( 'disconnect', function(){} );

        audience.on( 'message', function( msg ){
            env.log.debug( 'audience send message : ' + msg );
        } );

        audience.on( 'good slide', function( data ){
            if( speaker ){
                env.log.debug( 'audience is trigger good slide event : ' + data );
                speaker.volatile.emit( 'create ball', {} );
                audience.send( 'sever: think you' );
            }
        } );
    } );
};