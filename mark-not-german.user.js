// ==UserScript==
// @name         HD-Area improvements: MARK 'NOT GERMAN'
// @namespace    https://openuserjs.org/users/Varoxius
// @updateURL    https://openuserjs.org/meta/Varoxius/mark-not-german.meta.js
// @downloadURL  https://openuserjs.org/src/scripts/Varoxius/mark-not-german.user.js
// @version      1.0.2
// @description  [en] hd-area language warn, [de] hd-area warnung, wenn Sprache nicht Deutsch ist
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
        $(document).ready(function() {
            var conts = $('#content .download');
            conts.each(function(n){
                var $lngNode = $(this).find('.main:contains("Sprache:")');
                if($lngNode[0].nextSibling.nodeValue.indexOf('Deutsch') == -1) { $(this).css('background', '#fdd'); }
            });
        });
    });

})();