/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 4. 17.
 * Time: 오후 8:37
 */
var clog = require('clog');
clog.configure( {'log level': 5} );
//=> {'log': true, 'info': true, 'warn': true, 'error': false, 'debug': false}

var presentation = module.exports = {
    showRooms: [],
    isShowRoom: function( slideId ){
        clog.debug('isShowRoom: ' + slideId );
        var showRooms = this.showRooms.filter( function( showRoom ){
            return (showRoom === slideId );
        } );

        if ( showRooms.length > 0 ){
            return true;
        }else{
            return false;
        }
    },

    addShowRoom: function( slideId ){
        clog.debug( 'run addShowRoom:' + slideId );
        this.showRooms.push( slideId );
    }
};