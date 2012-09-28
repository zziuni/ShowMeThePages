/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 4. 24.
 * Time: 오후 8:32
 * https://github.com/caolan/nodeunit
 */
var env = require('../env');

module.exports = {
    setUp: function( callback ){
        "use strict";
        this.pt = require('../../presentation');
        this.showRoomId = '1234567890';
        this.showRoomId2 = 'abcdefg';
        callback();
    },
    'addShowRoomTest': function( test ){
        "use strict";
        test.expect(1);
        var pt = this.pt;
        var showRoomId = this.showRoomId;
        pt.addShowRoom( showRoomId);
        var showRooms = pt.showRooms.filter(function(showRoom){
            return ( showRoom.slide === showRoomId );
        });
        test.equal( showRooms[0].slide, showRoomId, 'failur add room. ');
        test.done();
    },
    'getShowRoomTest': function( test ){
        "use strict";
        test.expect(1);
        var showRoomId = this.showRoomId;
        var pt = this.pt;
        var showRooms = pt.getShowRoom( showRoomId );
        test.equal(showRooms[0].slide, showRoomId, 'no room');
        test.done();
    },
    'isShowRoomTrueTest': function( test ){
        "use strict";
        test.expect(1);
        var pt = this.pt;
        var result  = pt.isShowRoom(this.showRoomId);
        test.ok( result, 'a room was not.');
        test.done();
    },
    'isShowRoomFaleTest': function( test ){
        "use strict";
        test.expect(1);
        var pt = this.pt;
        var result  = pt.isShowRoom(this.showRoomId2);
        test.ok( !result, 'a room was not.');
        test.done();
    }
};
