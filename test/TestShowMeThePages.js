TestCase("fooTest", {
    setUp: function(){
        this.obj = { foo:function(){return 'foo'}};
    },
    "test foo": function(){
        assertEquals('foo', this.obj.foo());
    }
});