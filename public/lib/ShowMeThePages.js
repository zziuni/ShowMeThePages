/**
 * Created by JetBrains WebStorm.
 * Project : ShowMeThePages.js (SMTP)
 * Code: https://github.com/zziuni/ShowMeThePages
 * User: luigi.byun(@zziuni)
 * Date: 12. 2. 12.
 * Time: 오후 11:38˚
 */

var smtp = (function(){
    "use strict";
    var version = '0.1';

    var _this = {
        version: version,
        router: ROUTER
    };

    var ROUTER = {
        INDEX: /^\/$/,
        SLIDES: /\/slides/,
        SLIDE: /\/slide\//,
        EDIT: /\/editSlide/,
        WRITE: /\/newSlide/,
        LISTENER: /^\/m\//
    };

    function getUrl(){
        var path = location.pathname;
        return path;
    }

    function addEventListenerSlides(){
        $('.del').on('click', function(){
            var id = $(this).attr('data-id');
            $('.submitDel').attr('data-id', id);
        } );
        $('.edit').on('click', function(){
            var id = $(this).attr('data-id');
            location.href = '/editSlide/' + id;
        } );
        $('.submitDel').on('click', function(){
            var id = $(this).attr('data-id');
            $('#delModal').modal('hide');
            location.href = '/remove/' + id;
        });
        $('#delModal .submitDel').prev().on('click', function(){
            $('#delModal').modal('hide');
        });
    }

    function addEventListenerSlide(){
        $().ready( function(){
            //setting reveal.js
            Reveal.initialize({
                controls: true,
                progress: true,
                history: true,

                theme: Reveal.getQueryHash().theme || 'default', // available themes are in /css/theme
                transition: Reveal.getQueryHash().transition || 'default', // default/cube/page/concave/linear(2d)

                // Optional libraries used to extend on reveal.js
                dependencies: [
                    { src: '/lib/reveal2/lib/js/highlight.js', async: true, callback: function() { window.hljs.initHighlightingOnLoad(); } },
                    { src: '/lib/reveal2/lib/js/classList.js', condition: function() { return !document.body.classList; } },
                    { src: '/lib/reveal2/lib/js/showdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
                    { src: '/lib/reveal2/lib/js/data-markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
                    { src: '/socket.io/socket.io.js', async: true, condition: function() { return window.location.host === 'localhost:1947'; } },
                    { src: '/lib/reveal2/plugin/speakernotes/client.js', async: true, condition: function() { return window.location.host === 'localhost:1947'; } }
                ]
            });

            //after load socket.io
            var speaker = io.connect( '/speaker', {
                'reconnect': true, 'resource': 'socket.io'
            } );

            speaker.on( 'create ball', function( data ){
                createBall();
            } );


        } );
    }

    function addEventListenerWrite(){}

    function addEventListenerEdit(){}

    function addEventListenerIndex(){}

    function addEventListenerAudience(){
        $().ready(function(){
            var audience = io.connect( '', {
                'reconnect': true, 'resource': 'socket.io'
            } );
            audience.on( 'connect', function(){
                printMessage( 'connect to server' );
                audience.send( 'a phone connected to server', function(){} );
            } );

            audience.on( 'message', function( msg ){
                printMessage( msg );
            } );

            var btn = document.getElementsByTagName( 'button' )[0];
            btn.addEventListener( 'click', function(){
                audience.emit( 'good slide', {good: true, text: 'good!!!'} )
            } );

            //utillity
            var contents = document.getElementById( 'message' );
            function printMessage( msg ){
                var text = contents.innerText;
                if( text=="Loading..." ){ contents.textContent = ''; }
                var el = document.createElement( 'div' );
                el.textContent = msg;
                contents.appendChild( el );
            }
        });
    }

    function initCodeMirror(){
        var targetEl = document.getElementById( 'code' );
        var CursorActivityListener = function(){
            editor.setLineClass(hlLine,  null);
            window.hlLine = editor.setLineClass(editor.getCursor().line, "activeline");
        };

        var fullScreenListener = function(){
            var scroller = editor.getScrollerElement();
            if (scroller.className.search(/\bCodeMirror-fullscreen\b/) === -1) {
                scroller.className += " CodeMirror-fullscreen";
                scroller.style.height = "100%";
                scroller.style.width = "100%";
                editor.refresh();
            } else {
                scroller.className = scroller.className.replace(" CodeMirror-fullscreen", "");
                scroller.style.height = '';
                scroller.style.width = '';
                editor.refresh();
            }
        };

        var resetFullScreenListener = function(){
            var scroller = editor.getScrollerElement();
            if (scroller.className.search(/\bCodeMirror-fullscreen\b/) !== -1) {
                scroller.className = scroller.className.replace(" CodeMirror-fullscreen", "");
                scroller.style.height = '';
                scroller.style.width = '';
                editor.refresh();
            }
        };

        var editor = CodeMirror.fromTextArea( targetEl, {
            mode: 'markdown',
            lineNumbers: true,
            matchBrackets: true,
            theme: "default",
            onCursorActivity: CursorActivityListener,
            extraKeys: {
                "F11": fullScreenListener,
                "Esc": resetFullScreenListener
            }
        } );

        window.hlLine = editor.setLineClass(0, "activeline");
    }

    function initEachPage( ){
        var r = ROUTER;
        var router = getUrl();
        if ( r.SLIDES.test( router )){
            addEventListenerSlides();
        }else if( r.WRITE.test( router ) ){
            addEventListenerWrite();
            initCodeMirror();
        }else if( r.EDIT.test( router ) ){
            addEventListenerEdit();
            initCodeMirror();
        }else if ( r.INDEX.test( router ) ){
            addEventListenerIndex();
        }else if( r.LISTENER.test( router ) ){
            addEventListenerAudience();
        }else if( r.SLIDE.test( router ) ){
            addEventListenerSlide();
        }
    }

    function init(){
        initEachPage();
    }
    init();
    return _this;
})();