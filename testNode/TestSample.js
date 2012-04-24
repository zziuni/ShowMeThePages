/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 4. 24.
 * Time: 오후 8:55
 */
module.exports = {
    setUp: function( callback ){
        this.foo = true;
        callback();
    },
    'testFoo': function( test ){
        test.expect(1);
        test.ok(this.foo, 'good');
        test.done();
    },

    'testFoo3': function( test ){
        test.ok(this.foo, 'good');
        test.done();
    }
};
