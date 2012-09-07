/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 4. 24.
 * Time: 오후 8:55
 */
var env = require('../env');

module.exports = {
    setUp: function( callback ){
        "use strict";
        this.foo = true;
        callback();
    },
    'testFoo': function( test ){
        "use strict";
        test.expect( 1 );
        test.ok( this.foo, 'good' );
        test.done();
    },

    'testFoo3': function( test ){
        "use strict";
        test.ok( this.foo, 'good' );
        test.done();
    }
};
