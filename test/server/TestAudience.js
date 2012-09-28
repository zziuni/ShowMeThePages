/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 9. 7.
 * Time: 오후 11:24
 */
var env = require( '../env' );

module.exports = {
    setup: function( callback ){
        "use strict";
        callback();
    },

    'setListener': function( t ){
        "use strict";

        t.done();
    }


};