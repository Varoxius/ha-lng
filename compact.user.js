// ==UserScript==
// @name         HD-Area improvements: Compact Mode
// @namespace    https://openuserjs.org/users/Varoxius
// @updateURL    https://openuserjs.org/meta/Varoxius/compact.meta.js
// @downloadURL  https://openuserjs.org/src/scripts/Varoxius/compact.user.js
// @version      1.0.0
// @description  hd-area compact layout
// @author       Varoxius
// @match        http://www.hd-area.org/*
// ==/UserScript==
// ==OpenUserJS==
// @author Varoxius
// @collaborator username
// ==/OpenUserJS==

(function() {
    'use strict';

    function include(filename, onload) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = filename;
        script.type = 'text/javascript';
        script.onload = script.onreadystatechange = function() {
            if (script.readyState) {
                if (script.readyState === 'complete' || script.readyState === 'loaded') {
                    script.onreadystatechange = null;
                    onload();
                }
            }
            else {
                onload();
            }
        };
        head.appendChild(script);
    }

    include('//code.jquery.com/jquery-3.2.1.min.js', function() {
        var block = (function($x) {
            var a = [];
            a[1] = $x.next();
            a[2] = $x.next().next();
            var $newBlock = $x.wrap("<div class='vx-block'></div>").parent();
            $newBlock.append(a[1]);
            $newBlock.append(a[2]);
            return $newBlock;
        });
        $(document).ready(function() {
            var topNodes = $('#content .topbox');
            topNodes.each(function(index){
                block($(this));
            });
            var styl1 = document.createElement('style');
            styl1.type = 'text/css';
            var css =
                ".vx-block .cover > a { width: 100px!important; display: inline-block; margin-right: 8px; float: left; height 126px; }" +
                ".vx-block .cover img { width: 100px!important; max-height: 130px; }" +
                ".vx-block .download { width: 548px; }" +
                ".vx-block .dlbottom { height: 45px; }" +
                "#content .vx-block p { overflow: hidden; text-overflow: ellipsis; display: block; white-space: nowrap; height: 30px; }" +
                "#content .vx-block p:hover { text-overflow: initial; white-space: normal; z-index: 90; height: auto; }";
            if (styl1.styleSheet){
                styl1.styleSheet.cssText = css;
            } else {
                styl1.appendChild(document.createTextNode(css));
            }
            $('body').append(styl1);
        });
    });

})();