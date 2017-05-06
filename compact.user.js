// ==UserScript==
// @name         HD-Area improvements: Compact Mode
// @namespace    https://openuserjs.org/users/Varoxius
// @updateURL    https://openuserjs.org/meta/Varoxius/compact.meta.js
// @downloadURL  https://openuserjs.org/src/scripts/Varoxius/compact.user.js
// @version      1.4.0
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
        var dlblock = (function($x) {
            var nexts = $x.nextAll();
            var $newBlock = $x.wrap("<div class='vx-dlblock'></div>").parent();
            $newBlock.append(nexts);
            return $newBlock;
        });
        var descBlock = (function($x) {
            var nexts = $x.nextAll().slice(0, -1);
            var $newBlock = $x.wrap("<div class='vx-descblock'></div>").parent();
            $newBlock.append(nexts);
            return $newBlock;
        });
        $(document).ready(function() {
            var topNodes = $('#content .topbox');
            topNodes.each(function(i){
                block($(this));
            });
            var downloadNodes = $('#content .download').find('.main:contains("Download:")');
            downloadNodes.each(function(i){
                dlblock($(this));
            });
            var descNodes = $('#content .download').find('.main:contains("Beschreibung:")');
            descNodes.each(function(i){
                descBlock($(this));
            });
            var downloadBlocks = $('#content .download');
            downloadBlocks.each(function(i){
                var descBlock = $(this).find('.vx-descblock');
                var dlBlock = $(this).find('.vx-dlblock');
                descBlock.before(dlBlock);
            });
            var styl1 = document.createElement('style');
            styl1.type = 'text/css';
            var css =
                ".vx-block .cover > a { width: 142px!important; display: inline-block; margin-right: 8px; float: left; height 126px; }" +
                ".vx-block .cover img { width: auto!important; max-height: 180px; max-width: 142px; }" +
                ".vx-block .download { width: 548px; height: 268px; overflow: auto; }" +
                ".vx-block .dlbottom { height: 45px; }" +
                ".vx-dlblock { margin-bottom: 8px; border-left: 5px solid #6af; padding: 1px 4px; display: inline-block; }" +
                ".rsx-page-num-list li > span, .rsx-page-num-list li > a { font-size: 14px; display: inline-block; height: 20px; background-color: bisque; border: 1px solid silver; border-radius: 3px; line-height: 20px; padding: 0 7px; }" +
                ".vx-block .download::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); background-color: #F5F5F5; border-radius: 10px; }" +
                ".vx-block .download::-webkit-scrollbar { width: 8px; background-color: #F5F5F5; }" +
                ".vx-block .download::-webkit-scrollbar-thumb { border-radius: 2px; background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.14, #aaa), color-stop(0.44, #bbb), color-stop(0.86, #aaa)); }";
            if (styl1.styleSheet){
                styl1.styleSheet.cssText = css;
            } else {
                styl1.appendChild(document.createTextNode(css));
            }
            $('body').append(styl1);
        });
    });

})();