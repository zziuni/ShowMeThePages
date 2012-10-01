/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 4. 17.
 * Time: 오후 8:37
 */
var env = require('./env.js');

var presentation = module.exports = {
    showRooms: [],
    isShowRoom: function( slideId ){
        "use strict";
        env.log.debug( 'isShowRoom: ' + slideId );
        var showRooms = this.showRooms.filter( function( showRoom ){
            return (showRoom.slide === slideId );
        } );
        return ( showRooms.length > 0 );
    },

    addShowRoom: function( slideId ){
        "use strict";
        env.log.debug( 'run addShowRoom:' + slideId );
        this.showRooms.push( { slide: slideId, audiences: [] } );
    },

    getShowRoom: function( slideid ){
        "use strict";
        return this.showRooms.filter( function( showRoom ){
            return ( showRoom.slide === slideid );
        } );
    }


};