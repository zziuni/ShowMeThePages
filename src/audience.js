/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 9. 5.
 * Time: 오후 11:11
 */
var env = require( './env' );
var pt = require( './presentation.js' );

exports.setListener = function( io, speaker ){
    "use strict";
    io.of('/audience').on( 'connection', function( audience ){
        audience.on( 'disconnect', function(){} );

        audience.on( 'message', function( msg ){
            env.log.debug( 'audience send message : ' + msg );
        } );

        audience.on( 'good slide', function( data ){
            if( speaker ){
                env.log.debug( 'audience is trigger good slide event. pt.id : ' + data.id );
//                pt.showRooms.forEach( function( show ){
//                    env.log.debug( 'show.slide:' + show.slide );
//                    env.log.debug( 'show.audiences:' + show.audiences );
//                });

                speaker.volatile.emit( 'create ball', { count : pt.addAdience( data.id ) } );

                audience.send( 'sever: think you' );
            }
        } );
    } );
};