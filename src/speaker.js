/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 9. 5.
 * Time: 오후 11:11
 */
var env = require( './env' );

exports.setListener = function( io, callbackForAudience ){
    "use strict";
    io.of( '/speaker' ).on( 'connection', function( speaker ){
        env.log.debug( '=> A speaker connected..' );

        speaker.on( 'disconnect', function(){
            env.log.debug( '=> A speaker disconnect.' );
        } );

//        speaker.on( 'good slide', function( data ){
//            env.log.debug( 'speaker is trigger ' );
//            speaker.volatile.emit( 'create ball', {} );
//        } );

        callbackForAudience( io, speaker );
    } );
};