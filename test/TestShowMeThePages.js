TestCase("fooTest", {
    "test foo": function(){
        var obj = { foo:function(){return 'foo'}};
        assertEquals('foo', obj.foo());
    }
});