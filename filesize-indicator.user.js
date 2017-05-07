// ==UserScript==
// @name         HD-Area improvements: Filesize Indicator
// @namespace    https://openuserjs.org/users/Varoxius
// @updateURL    https://openuserjs.org/meta/Varoxius/filesize-indicator.meta.js
// @downloadURL  https://openuserjs.org/src/scripts/Varoxius/filesize-indicator.user.js
// @version      1.0.0
// @description  hd-area shows a bar for the filesize
// @author       Varoxius
// @match        http://www.hd-area.org/*
// ==/UserScript==
// ==OpenUserJS==
// @author Varoxius
// @collaborator Varoxius
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
        var sizeblock = (function($x) {
            var a = [], sizeFactor = 0, sizeUnit = 0, sizeColor = "#080";
            var size = parseFloat($x[0].nextSibling.nodeValue);
            if($x[0].nextSibling.nodeValue.indexOf("GiB") != -1) {
                sizeFactor = 1073741824;
                sizeUnit = "GiB";
            } else if($x[0].nextSibling.nodeValue.indexOf("MB") != -1) {
                sizeFactor = 1000000;
                sizeUnit = "MB";
            }
            var realSize = Math.round(size * sizeFactor);
            if(realSize > 9000000000) {
                sizeColor = "#ff9800";
            }
            if(realSize > 12000000000) {
                sizeColor = "#e91e63";
            }
            $($x[0].nextSibling).wrap('<span></span>').parent().css('color', sizeColor);
            a.push($x[0].nextSibling);
            a.push($x[0].nextSibling.nextSibling);
            var $newBlock = $x.wrap("<div class='vx-filesize'></div>").parent();
            $newBlock.append(a[0]);
            $newBlock.append(a[1]);
            return $newBlock;
        });
        $(document).ready(function() {
            var sizeNodes = $('#content .download').find('.main:contains("Größe:")');
            sizeNodes.each(function(i){
                sizeblock($(this));
            });
            var styl1 = document.createElement('style');
            styl1.type = 'text/css';
            var css =
                ".vx-controls { position: absolute; width: 400px; height: 86px; background-color: rgba(255, 255, 255, 0.82); top: 10px; left: 50%; margin-left: 80px; border: 1px solid silver; border-radius: 5px; }" +
                ".vx-filesize > span { font-weight: 700; }";
            if (styl1.styleSheet){
                styl1.styleSheet.cssText = css;
            } else {
                styl1.appendChild(document.createTextNode(css));
            }
            $('body').append(styl1);
        });
    });

})();