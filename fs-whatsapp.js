// ==UserScript==
// @name         Fullscreen Whatsapp & Themes
// @namespace    http://your.homepage/
// @version      2.5.4
// @description  Dark theme, and bg/theme selector.
// @author       Wouter Gerarts
// @match        https://web.whatsapp.com/
// @grant        none
// ==/UserScript==

Storage.prototype.has = function(key) {
    return localStorage[key] !== undefined;
};

Storage.prototype.remove = function(key) {
    if (localStorage.has(key)) {
        delete localStorage[key];
    }
};

window.ImageLoader = function(url, callback) {
    var image = new Image();
    image.onload = function () {
        callback(url, true);
    };
    image.onerror = function () {
        callback(url, false);
    };
    image.src = url;
};

window.StyleUtil = function(className) {
    var styles = [];
    var that = this;
    var classNameInternal = 'StyleUtil_element_' + className;
    this.add = function(rule) {
        styles.push(rule);
    };
    this.render = function() {
        that.remove();
        var s = '<style type="text/css">\n';
        for (var i = 0; i < styles.length; i++) {
            s += styles[i] + '\n';
        }
        s += '</style>';
        var element = $(s).addClass(classNameInternal)[0];
        $('head').append(element);
    };
    this.clear = function() {
        styles = [];
    };
    this.remove = function() {
        $('.' + classNameInternal).remove();
    };
};

window.__background_selection = [
    // original backgrounds
    [ "https://i.imgur.com/dqJ8g3n.jpg", [ 0  , 255, 0   ] ],
    [ "https://i.imgur.com/WSEJKg5.jpg", [ 255, 25 , 255 ] ],
    [ "https://i.imgur.com/erKwTY0.jpg", [ 255, 255, 0   ] ],
    [ "https://i.imgur.com/h7nJ44B.jpg", [ 255, 25 , 255 ] ],
    [ "https://i.imgur.com/ruV4cps.jpg", [ 255, 255, 0   ] ],
    [ "https://i.imgur.com/Tphq748.jpg", [ 255, 50 , 50  ] ],
    [ "https://i.imgur.com/gifwjKH.jpg", [ 255, 255, 0   ] ],
    [ "https://i.imgur.com/cvcBVAS.jpg", [ 200, 200, 255 ] ],
    [ "https://i.imgur.com/QaycXbo.jpg", [ 255, 128, 0   ] ],
    [ "https://i.imgur.com/zYWzqMC.jpg", [ 0  , 170, 255 ] ],
    [ "https://i.imgur.com/4Xemev8.jpg", [ 0  , 255, 0   ] ],
    [ "https://i.imgur.com/v6JN8SV.jpg", [ 255, 225, 50  ] ],
    [ "https://i.imgur.com/u0XxHbj.jpg", [ 240, 180, 15  ] ],
    // new backgrounds batch 2-2-2017
    [ "https://i.imgur.com/AsIyueb.jpg", [ 0  , 90 , 196 ] ],
    [ "https://i.imgur.com/bdteLGN.jpg", [ 230, 200, 100 ] ],
    [ "https://i.imgur.com/JFgxl7M.jpg", [ 170, 0  , 110  ] ],
    [ "https://i.imgur.com/93sx5Rz.jpg", [ 180, 0  , 0   ] ],
    [ "https://i.imgur.com/ceFK0Lb.jpg", [ 255, 128, 0   ] ],
    [ "https://i.imgur.com/JThz5vk.jpg", [ 120, 255, 255 ] ],
    [ "https://i.imgur.com/B5llV0J.jpg", [ 158, 0  , 158 ] ],
    [ "https://i.imgur.com/79hdmKZ.jpg", [ 210, 100 , 0   ] ],
    [ "https://i.imgur.com/hCrOfXi.jpg", [ 40 , 70 , 190 ] ],
    [ "https://i.imgur.com/PGzVE96.jpg", [ 180, 0  , 0   ] ],
    [ "https://i.imgur.com/hAMHKwX.jpg", [ 0  , 192, 255 ] ],
    [ "https://i.imgur.com/ObunCQx.jpg", [ 255, 255, 255 ] ],
    [ "https://i.imgur.com/UDLXz9s.jpg", [ 160 , 0  , 0   ] ],
    [ "https://i.imgur.com/BIvNUTO.jpg", [ 255, 255, 255 ] ],
    // fancy calm backgrounds original batch
    [ "https://i.imgur.com/6Zfe7Fm.jpg", [ 200, 100, 20  ] ],
    [ "https://i.imgur.com/FeSkieh.jpg", [ 0  , 170, 255 ] ],
    [ "https://i.imgur.com/YoExKu2.jpg", [ 200, 100, 20  ] ],
    [ "https://i.imgur.com/YoExKu2.jpg", [ 255, 50 , 50  ] ],
    [ "http://elska.nl/imagehosting/whatsappwebbackground.jpg", [ 255, 50 , 50  ] ],
];

window.loadNewTheme = function(themeData) {
    if (!Array.isArray(themeData)) {
        return;
    }
    if (themeData.length < 2) {
        return;
    }
    if (typeof themeData[0] != 'string') {
        return;
    }
    if (!Array.isArray(themeData[1])) {
        return;
    }
    if (themeData[1].length < 3) {
        return;
    }
    for (var c = 0; c < 3; c++) {
        if (typeof themeData[1][c] != 'number') {
            return;
        }
    }
    window.__background_selection.push(themeData);
    var s = document.getElementsByClassName('icon-theme');
    for (var j = 0; j < s.length; j++) {
        s[j].remove();
    }
    console.log('loaded ' + themeData[0]);
};

function additionalThemeLoader() {
    if (!localStorage.has('WoutoTheme_additionalThemes')) {
        return;
    }
    var add = localStorage.getItem('WoutoTheme_additionalThemes');
    add = JSON.parse(add);
    if (!Array.isArray(add)) {
        return;
    }
    for (var i = 0; i < add.length; i++) {
        var e = add[i];
        loadNewTheme(e);
    }
}

additionalThemeLoader();

for (var i = 0; i < window.__background_selection.length; i++) {
    var url = window.__background_selection[i][0];
    new ImageLoader(url, function(u, s) {
        if (s) {
            console.log("loaded " + u);
        } else {
            console.log("failed loading " + u);
        }
    });
}

var s = Math.floor(Math.random() * window.__background_selection.length);
if (localStorage.has('WoutoTheme_themeIndex')) {
    s = localStorage.getItem('WoutoTheme_themeIndex');
}

window.__chosen_background_index = s;
if (window.__chosen_background_index >= window.__background_selection.length) {
    window.__chosen_background_index = 0;
}

window.__selected_background = window.__background_selection[window.__chosen_background_index];

var themeSelectHtml = '<div class="theme-select-window" style="left: 0px;  right: 0px; height: 329px; position: absolute; top: 0px;z-index: 10000; background: rgb(0, 0, 0);"><div class="theme-menu-header" style="width: 100%; background: rgb(20, 20, 20); color: #eee; height: 59px;vertical-align: middle;"><div class="theme-menu-header-padding" style="padding: 10px;vertical-align: baseline;font-size: 16px;font-weight: 400;line-height: 19px;padding-top: 18px;display: block;float: left;"><button id="theme-menu-close-button"><span class="icon icon-x" style="-webkit-filter: invert(1)"></span></button><div class="theme-menu-header-text" style="top: 20px;position: absolute;left: 48px;">Select Theme</div></div></div><div id="theme-menu-content" style="position: absolute;left: 0px;top: 59px;bottom: 0px;width: 100%; overflow-x: scroll; overflow-y: hidden;"><div id="theme-menu-theme-container" style="margin: 10px;left: 0px;top: 0px;height: 250px; display: inline-flex;"></div></div></div>';
var themeSelectSingle = '<div class="theme-background-selectable" bg-id=0 style="background-size: contain;height: 210px;position: relative;float: left;width: 380px;"><div class="theme-background-image" style="position: absolute;left: 0px;top: 0px;height: 100%;width: 100%;background: url(https://i.imgur.com/dqJ8g3n.jpg);background-size: cover;background-position:center;"></div></div>';

var themeSelectImages = [];

window.awaitAppendMenus = function($) {
    function appendMenus() {

        setInterval(function() {
            if ($(".pane-chat-controls").find('.icon-theme').length < 1) {
                for (var i = 0; i < window.__background_selection.length; i++) {
                    var k = window.__background_selection[i][0];
                    var e = $(themeSelectSingle)[0];
                    $(e).attr('bg-id', i);
                    if (i == window.__chosen_background_index) {
                        $(e).addClass('theme-selected');
                    }
                    $(e).children().css('background', 'url(' + k + ')').css('background-size', 'cover').css('background-position', 'center');
                    themeSelectImages[i] = e;
                }

                var themeSelectDiv = $(themeSelectHtml);
                for (var k2 = 0; k2 < themeSelectImages.length; k2++) {
                    $(themeSelectDiv).find('#theme-menu-theme-container').append(themeSelectImages[k2]);
                }
                $("#main").append(themeSelectDiv);
                $("#theme-menu-close-button").click(window.toggleThemeMenu);
                $(".theme-background-selectable").click(function() {
                    var id = $(this).attr('bg-id');
                    window.__selected_background = window.__background_selection[id];
                    localStorage.setItem('WoutoTheme_themeIndex', id);
                    window.applyThemeColorChanges();
                    $(".theme-background-selectable").removeClass('theme-selected');
                    $(this).addClass('theme-selected');
                });
                var menuHtml = '<div class="menu-item"><button class="icon-theme"style="-webkit-filter:invert(0);text-indent:-5000px;width:24px;height:24px;background:url(https://i.imgur.com/bly1s2B.png);">Theme</button></div>';
                var menu = $(menuHtml);
                $(".pane-chat-controls").children().append(menu);
                $('.icon-theme').click(window.toggleThemeMenu);
            }
        }, 500);
    }

    function await() {
        if (($(".pane-chat-controls").length > 0)) {
            appendMenus();
        } else {
            setTimeout(await, 500);
        }
    }

    await();
};

window.getColorTone = function(c, a) {
    var r = window.__selected_background[1][0] * c;
    var g = window.__selected_background[1][1] * c;
    var b = window.__selected_background[1][2] * c;
    r = (r > 255) ? 255 : r < 0 ? 0 : r;
    g = (g > 255) ? 255 : g < 0 ? 0 : g;
    b = (b > 255) ? 255 : b < 0 ? 0 : b;
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    if (typeof a === "number") {
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
    } else {
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
};

(function() {
    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);

    var checkReady = function(callback) {
        if (window.jQuery) {
            callback(jQuery);
        }
        else {
            window.setTimeout(function() { checkReady(callback); }, 100);
        }
    };

    checkReady(function($) {
        window.applyThemeColorChanges = function() {
            $('.changes-with-theme').remove();
            $('head').append('<style class="changes-with-theme" type="text/css">*::-webkit-scrollbar-thumb { background:' + window.getColorTone(0.3, false) + ' }  *::-webkit-scrollbar-track{background:' + window.getColorTone(1, 0.7) + ' !important;}</style>');
            $('head').append('<style class="changes-with-theme" type="text/css">#main { width: inherit !important; background-image: url(' + window.__selected_background[0] + ') !important; background-size: cover; background-position: center; }</style>');
            //Broken
            $('head').append('<style class="changes-with-theme" type="text/css">.bubble.bubble-attach { background: rgba(0, 0, 0, 0.6) !important; color: #fff !important; border-radius: 8px !important; border: 1px solid ' + window.getColorTone(0.7, false) + ' !important; }</style>');
            $('head').append('<style class="changes-with-theme" type="text/css">.bubble.bubble-text { border-radius: 8px !important; border: 1px solid ' + window.getColorTone(0.7, false) + ' !important; }</style>');
            $('head').append('<style class="changes-with-theme" type="text/css">.bubble-image { border-radius: 8px !important; border: 1px solid ' + window.getColorTone(0.7, false) + ' !important; background-color: rgba(0, 0, 0, 0.6) !important; }</style>');
            
            //Fixed
            $('head').append('<style class="changes-with-theme" type="text/css">.Tkt2p { background: rgba(0, 0, 0, 0.6) !important; color: #fff !important; border-radius: 8px !important; border: 1px solid ' + window.getColorTone(0.7, false) + ' !important; }</style>');
            $('head').append('<style class="changes-with-theme" type="text/css">.Tkt2p { border-radius: 8px !important; border: 1px solid ' + window.getColorTone(0.7, false) + ' !important; }</style>');
            $('head').append('<style class="changes-with-theme" type="text/css">.Tkt2p { border-radius: 8px !important; border: 1px solid ' + window.getColorTone(0.7, false) + ' !important; background-color: rgba(0, 0, 0, 0.6) !important; }</style>');

            $('head').append('<style class="changes-with-theme" type="text/css">.message-datetime { color: ' + window.getColorTone(1.25, false) + ' !important; }</style>');
            $('head').append('<style class="changes-with-theme" type="text/css">.chat-time { color: ' + window.getColorTone(1.25, false) + ' !important; }</style>');
            $('head').append('<style class="changes-with-theme" type="text/css">.cont-input-search { border: 2px solid ' + window.getColorTone(0.8, false) + ' !important; }</style>');
        };

        window.toggleThemeMenu = function() {
            if ($('.theme-select-window').hasClass('theme-select-window-active')) {
                $('.theme-select-window').removeClass('theme-select-window-active');
            } else {
                $('.theme-select-window').addClass('theme-select-window-active');
            }
        };

        window.awaitAppendMenus($);

        window.applyThemeColorChanges();

        $('head').append('<style type="text/css">.theme-select-window-active { display: inherit !important; }</style>');
        $('head').append('<style type="text/css">.theme-select-window { display: none; }</style>');
        $('head').append('<style type="text/css">.theme-background-selectable { margin: 10px; }</style>');
        $('head').append('<style type="text/css">.theme-background-selectable:hover { margin: 4px; border: 6px solid rgb(110, 220, 255); }</style>');
        $('head').append('<style type="text/css">.theme-selected { margin: 0px !important; border: 10px solid rgb(50, 180, 255) !important; }</style>');
        $('head').append('<style type="text/css">.icon-status-check { -webkit-filter: invert(1) !important; }</style>');
        $('head').append('<style type="text/css">.icon-status-dblcheck { -webkit-filter: invert(1) !important; }</style>');
        $('head').append('<style type="text/css">.chat:after{border-bottom: 1px solid #333 !important; left: 0px !important; width: 100% !important; border-top: 1px solid #333 !important}</style>');
        $('head').append('<style type="text/css">.message-in:before{opacity:0.0 !important;} .message-out:before{opacity:0.0 !important;}</style>');
        $('head').append('<style type="text/css">.app.two { left: 0px !important; top: 0px !important; width: 100% !important; height: 100% !important; }</style>');
        $('head').append('<style type="text/css">.pane.pane-intro { width: inherit !important; }</style>');
        $('head').append('<style type="text/css">.pane-body .pane-chat-body { padding: 17px 30px 8px !important; }</style>');
        $('head').append('<style type="text/css">.message { background: none !important; max-width: 50% !important; box-shadow: none !important; }</style>');
        $('head').append('<style type="text/css">.message-system { max-width: 100% !important; }</style>');
        $('head').append('<style type="text/css">.message-system-body { background-color: rgba(0, 0, 0, 0.8) !important; color: #fff }</style>');
        $('head').append('<style type="text/css">.msg.msg-unread.message.msg-wide { max-width: inherit !important; }</style>');
        $('head').append('<style type="text/css">.msg.msg-unread.message.msg-wide { background-color: rgba(0, 0, 0, 0.5) !important; }</style>');
        $('head').append('<style type="text/css">.msg-unread-body { background-color: #222 !important; color: #fff !important; }</style>');
        $('head').append('<style type="text/css">.block-compose { background-color: rgba(0, 0, 0, 0.7) !important; }</style>');
        $('head').append('<style type="text/css">.input-container { background-color: rgba(0, 0, 0, 0.9) !important; color: #fff !important; }</style>');
        $('head').append('<style type="text/css">.bubble.bubble-text { background: rgba(0, 0, 0, 0.6) !important; color: #fff !important; }</style>');
        $('head').append('<style type="text/css">.emojitext.selectable-text { color: #fff !important; }</style>');
        //$('head').append('<style type="text/css">.emojitext.selectable-text.selectable-text { color: #fff !important; }</style>');
        $('head').append('<style type="text/css">.message-text strong { color: #fff !important; text-shadow: 1px 1px 0px rgba(0,0,0,0.3)}</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.quoted-msg .message-text .emojitext { color: #bfbfbf !important; }</style>');
        $('head').append('<style type="text/css">.screen-name-text { color: #ccc !important; }</style>');
        $('head').append('<style type="text/css">.pane-header.pane-chat-header { background-color: rgba(0, 0, 0, 0.5) !important; color: #fff !important; }</style>');
        $('head').append('<style type="text/css">.chat-title { color: #fff !important; }</style>');
        $('head').append('<style type="text/css">.chat-status { color: #aaa !important; }</style>');
        $('head').append('<style type="text/css">.chat { background-color: #111 !important; border-bottom: 1px solid rgb(51, 51, 51); }</style>');
        $('head').append('<style type="text/css">.pane-body.pane-list-body { background-color: #333 !important; }</style>');
        $('head').append('<style type="text/css">.active.chat { border-bottom: 1px solid #333 !important; }</style>');
        $('head').append('<style type="text/css">.pane.pane-intro { background-color: #000 !important; }</style>');
        $('head').append('<style type="text/css">.pane-header.pane-list-header { background-color: #111 !important; }</style>');
        $('head').append('<style type="text/css">.chat-secondary { color: rgba(218, 218, 218, 0.8) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css"> input.input-search { color: rgb(255, 255, 255) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css"> list-search { color: rgb(51, 51, 51) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css"> button.icon { -webkit-filter: invert(1) !important; }</style>');
        $('head').append('<style type="text/css"> button.icon-search-morph { -webkit-filter: invert(0) !important; }</style>');
        $('head').append('<style type="text/css">.pane-subheader.pane-list-subheader.subheader-search { background-color: #111 !important; }</style>');
        $('head').append('<style type="text/css">.cont-input-search { background-color: #333 !important; }</style>');
        $('head').append('<style type="text/css">.input.input-search { background-color: #333 !important; color: #eee !important; }</style>');
        $('head').append('<style type="text/css">.list-title { background-color: #000 !important; font-weight: bold !important; }</style>');
        //$('head').append('<style type="text/css">.active.chat { background-color: rgb(35, 35, 35) !important; }</style>');
        $('head').append('<style type="text/css">.hover.chat { background-color: rgb(17, 35, 35) !important; }</style>');
        $('head').append('<style type="text/css">.icon.icon-down.btn-context { -webkit-filter: invert(1) !important; }</style>');
        $('head').append('<style type="text/css">.pane-chat-body { background: rgba(0, 0, 0, 0.3) !important; }</style>');
        $('head').append('<style type="text/css">.pane-chat-tile { background: rgba(0, 0, 0, 0.0) !important; }</style>');
        $('head').append('<style type="text/css">.pane-body.pane-chat-tile-container { background: rgba(0, 0, 0, 0.0) !important; }</style>');
        $('head').append('<style type="text/css">.compose-popup-panel .quoted-msg .quoted-msg-status { border-radius: 8px !important; border: 1px solid rgb(179, 35, 35) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.compose-popup-panel { background-color: rgba(0, 0, 0, 0.4) !important; padding-bottom: 5px; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.btn-background { background-color: rgba(0, 0, 0, 0.1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.intro { background-color: rgba(25, 25, 25, 1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.body { background-color: rgba(25, 25, 25, 1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.empty .empty-top { background-color: rgba(25, 25, 25, 1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">#startup { background-color: rgba(25, 25, 25, 1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.backdrop-transparent { background-color: rgba(25, 25, 25, 1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.popup { background-color: rgba(68, 68, 68, 1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.popup-title { color: rgba(163, 163, 163, 1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.popup-contents { color: rgba(163, 163, 163, 1); }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.media-panel-header { background-color: rgba(17, 17, 17, 1); }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.media-content { background-color: rgba(17, 17, 17, 1); }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.media-viewer-thumbs { background-color: rgba(17, 17, 17, 1); }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.media-viewer { background-color: rgba(17, 17, 17, 1); }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.media-collection { border-top: solid 1px rgba(35, 35, 35, 1); }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.message-system { background-color: rgba(25, 25, 25, 0.75) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.message-system-body { background-color: rgba(0, 0, 0, 0) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.compose-box-items-overlay-container { border-left: none !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.backdrop.backdrop-cover { background-color: rgba(17, 17, 17, 1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.pane-header { background-color: rgba(17, 17, 17, 1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.well { background-color: rgba(25, 25, 25, 1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.drawer-section { background-color: rgba(25, 25, 25, 1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.header-title { color: rgba(255, 255, 255, 1) !important; }</style>');//===================================ADDED LINE==============================//
        //$('head').append('<style type="text/css">.icon { filter: invert(1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.input-text { color: rgba(255, 255, 255, 1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.title { color: rgba(255, 255, 255, 1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.drawer { background-color: rgba(17, 17, 17, 0.7) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.chatlist .chat-body { background-color: rgba(17, 17, 17, 0.7) !important; border-top: none !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.row-body { border-bottom: none !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.chatlist { background-color: rgba(17, 17, 17, 0.7) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.avatar { background-color: rgba(17, 17, 17, 1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.chatlist-panel-body { background-color: rgba(17, 17, 17, 1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.hover { border-bottom: orange !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.dropdown { background-color: rgba(25, 25, 25, 1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.dropdown-item-hover { background-color: rgba(17, 17, 17, 1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.dropdown-item-action { color: rgba(255, 255, 255, 0.7) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.backdrop { background-color: rgba(17, 17, 17, 0.7) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.chat-body { border-top: none !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.chat-body { border-top: none !important; }</style>');//===================================ADDED LINE==============================//
        //$('head').append('<style type="text/css">.pane-two { background-color: rgba(35, 35, 35, 1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">._1DZAH { color: rgba(255, 0, 0, 0.7) !important; }</style>');//===================================ADDED LINE==============================// MAY BREAK! (timestamp color)
        $('head').append('<style type="text/css">._1i1U7 { background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(84, 19, 19, 0.5)) !important; }</style>');//===================================ADDED LINE==============================// MAY BREAK! (chat item hover gradient)
        $('head').append('<style type="text/css">.drawer-header-small { background-color: rgba(35, 35, 35, 0.7) !important; }</style>');//===================================ADDED LINE==============================// Contact info drawer header background
        $('head').append('<style type="text/css">._1CRb5 { background-color: rgba(25, 25, 25, 1) !important; }</style>');//===================================ADDED LINE==============================// Contact info div background color
        $('head').append('<style type="text/css">.drawer-title { color: rgba(255, 255, 255, 1) !important; }</style>');//===================================ADDED LINE==============================// Contact info drawer header text color
        $('head').append('<style type="text/css">.iYPsH { color: rgba(240, 240, 240, 1) !important; }</style>');//===================================ADDED LINE==============================// Contact info text color
        $('head').append('<style type="text/css">._3LL06 { color: rgba(240, 240, 240, 1) !important; }</style>');//===================================ADDED LINE==============================// Contact info text color
        $('head').append('<style type="text/css">.DcItJ { border-top: none !important; }</style>');//===================================ADDED LINE==============================// Border on the contact info buttons
        $('head').append('<style type="text/css">._1CkkN { background-color: rgba(25, 25, 25, 1) !important; }</style>');//===================================ADDED LINE==============================// Contact info button background
        $('head').append('<style type="text/css">._2uLFU { background-color: rgba(25, 25, 25, 1) !important; }</style>');//===================================ADDED LINE==============================// Dropdown menu background
        $('head').append('<style type="text/css">._2dGjP { color: rgba(240, 240, 240, 1) !important; }</style>');//===================================ADDED LINE==============================// Dropdown menu text color
        $('head').append('<style type="text/css">._3qlW9 { background-color: rgba(35, 35, 35, 1) !important; }</style>');//===================================ADDED LINE==============================// Initial 'remain connected' background
        $('head').append('<style type="text/css">.iHhHL { color: rgba(240, 240, 240, 1) !important; }</style>');//===================================ADDED LINE==============================// Initial 'remain connected' text color
        $('head').append('<style type="text/css">._1ClcF { color: rgba(150, 150, 150, 1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">._2sNbV { background-color: rgba(25, 25, 25, 1) !important; }</style>');//===================================ADDED LINE==============================// Profile background
        $('head').append('<style type="text/css">.selectable-text { color: rgba(240, 240, 240, 1) !important; }</style>');//===================================ADDED LINE==============================// Profile input text
        $('head').append('<style type="text/css">._1AKfk { background-color: rgba(35, 35, 35, 1) !important; }</style>');//===================================ADDED LINE==============================// New chat dividers
        $('head').append('<style type="text/css">._1Iexl { width: 100% !important; }</style>');//===================================ADDED LINE==============================// Fixes chat width
        $('head').append('<style type="text/css">.chatlist-panel-search { background-color: rgba(35, 35, 35, 1) !important; }</style>');//===================================ADDED LINE==============================// Search bar background
        $('head').append('<style type="text/css">._2MSJr { background-color: rgba(25, 25, 25, 1) !important; border: 1px solid #02d1a4 !important; }</style>');//===================================ADDED LINE==============================// Search bar background
        $('head').append('<style type="text/css">#input-chatlist-search { background-color: rgba(25, 25, 25, 1) !important; }</style>');//===================================ADDED LINE==============================// Search bar background
        $('head').append('<style type="text/css">.quoted-mention { color: rgba(140, 140, 140, 1) !important; }</style>');//===================================ADDED LINE==============================// Quote text color
        $('head').append('<style type="text/css">.compose-popup-panel { border: solid 1px rgba(179, 35, 35, 1) !important; }</style>');//===================================ADDED LINE==============================// Quote bar border
        $('head').append('<style type="text/css">._27BA_ { background-color: rgba(0, 0, 0, 0.25) !important; }</style>');//===================================ADDED LINE==============================// Quote bar background
        $('head').append('<style type="text/css">.emoji-search-row-input { display: none !important; }</style>');//===================================ADDED LINE==============================// Removing the search bar for emojis
        $('head').append('<style type="text/css">.emoji-panel-body { padding-top: 15px !important; }</style>');//===================================ADDED LINE==============================// Quote bar background

        //Wapp green: #09d261
        //Wapp light green: #02d1a4
        $('head').append('<style type="text/css">.icon-muted { filter: invert(1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.icon-search { filter: invert(1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.icon-x { filter: invert(1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.down-context { filter: invert(1) !important; }</style>');//===================================ADDED LINE==============================//
        $('head').append('<style type="text/css">.rrzlm { filter: invert(1) !important; }</style>');//===================================ADDED LINE==============================// Contact info 'block contact' icon color invert
        $('head').append('<style type="text/css">._2SbJ1 { filter: invert(1) !important; }</style>');//===================================ADDED LINE==============================// Message send button
        $('head').append('<style type="text/css">.compose-btn-emoji { filter: invert(1) !important; }</style>');//===================================ADDED LINE==============================// Emoji button
        $('head').append('<style type="text/css">.rAUz7 { filter: invert(1) !important; }</style>');//===================================ADDED LINE==============================// Top-left buttons
        $('head').append('<style type="text/css">._3cyFx { filter: invert(1) !important; }</style>');//===================================ADDED LINE==============================// Profile edit buttons
        $('head').append('<style type="text/css">.drawer-title-action { filter: invert(1) !important; }</style>');//===================================ADDED LINE==============================// Contact close button


        function fixCSS() {
            try {
                $(".app.two")
                    .css('left', '0px')
                    .css('top', '0px')
                    .css('width', '100%')
                    .css('height', '100%');
            } catch (k) {}
            try {
                $("#main")
                    .css('width', 'inherit')
                    .css('background-image', 'url(https://i.imgur.com/dqJ8g3n.jpg)');
            } catch (e) {}
            try { $(".pane.pane-intro").css('width', 'inherit');} catch(k) { }
            try { $(".pane-body .pane-chat-body").css('padding', '17px 30px 8px');} catch(k) { }
            try { $(".message").css('max-width', '50%').css('background', 'none').css('box-shadow', 'none'); } catch(k) { }
            try { $(".msg.msg-unread.message.msg-wide").css('max-width', 'inherit');} catch(k) { }
            try { $(".drawer-container-mid.flow-drawer-container").css('width', $(".pane-body.pane-chat-body.lastTabIndex")[0].getBoundingClientRect().width + 'px');} catch(k) { }
            try { $(".msg.msg-unread.message.msg-wide").css('background-color', 'rgba(0, 0, 0, 0.5)');} catch(k) { }
            try { $(".msg-unread-body").css('background-color', '#222').css('color', '#fff');} catch(k) { }
            try { $(".block-compose").css('background-color', 'rgba(0, 0, 0, 0.7)');} catch(k) { }
            try { $(".input-container").css('background-color', 'rgba(0, 0, 0, 0.9)').css('color', '#fff');} catch(k) { }
            try { $(".bubble.bubble-text").css('background-color', 'none').css('color', '#fff');} catch(k) { }
            try { $(".bubble.bubble-attach").css('background-color', 'none').css('color', '#fff');} catch(k) { }
            try { $(".bubble.bubble-attach").find('span').filter(function() { return $(this).text() !== ""; }).css('color', '#fff'); } catch (k) { }
            try { $(".emojitext.selectable-text").css('color', '#fff');} catch(k) { }
            try { $(".screen-name-text").css('color', '#ccc');} catch(k) { }
            try { $(".bubble.bubble-text").css('border-radius', '8px');} catch(k) { }
            try { $(".bubble-image").css('border-radius', '5px').css('background-color', 'none');} catch(k) { }
            try { $(".message-datetime").css('color', 'rgb(0, 255, 150)');} catch(k) { }
            try { $(".pane-header.pane-chat-header").css('background-color', 'rgba(0, 0, 0, 0.5)').css('color', '#fff');} catch(k) { }
            try { $(".pane-header.chat-secondary").css('color', 'rgba(255, 255, 255, 0.7)').css('color', '#fff');} catch(k) { }
            try { $(".list-search").css('background-color', 'rgb(17, 17, 17)');} catch(k) { }//===================================ADDED LINE==============================//
            try { $(".input-search").css('background-color', 'rgb(51, 51, 51)');} catch(k) { }//===================================ADDED LINE==============================//
            try { $(".chat-meta").css('color', 'rgba(255, 0, 0, 0.8)');} catch(k) { }//===================================ADDED LINE==============================//
            try { $(".chat-title").css('color', '#fff');} catch(k) { }
            try { $(".chat-status").css('color', '#aaa');} catch(k) { }
            try { $(".chat").css('background-color', '#111'); } catch (k) { }
            try { $(".pane-body.pane-list-body").css('background-color', '#333'); } catch (k) { }
            try { $(".pane-chat-body").css('background', 'rgba(0, 0, 0, 0.75)'); } catch (k) { }
            try { $(".active.chat").css('border-bottom', '1px solid #333'); } catch (k) { }
            try { $(".pane.pane-intro").css('background-color', '#000'); } catch (k) { }
            try { $(".intro-image").remove(); } catch (k) { }
            try { $(".pane-header.pane-list-header").css('background-color', '#111'); } catch (k) { }
            try { $("button.icon").css('-webkit-filter', 'invert(1)'); } catch (k) { }
            try { $("button.icon-search-morph").css('-webkit-filter', 'invert(0)'); } catch (k) { }
            try { $(".pane-subheader.pane-list-subheader.subheader-search").css('background-color', '#111'); } catch (k) { }
            try { $(".cont-input-search").css('background-color', '#333'); } catch(k) { }
            try { $(".input.input-search").css('background-color', '#333').css('color', '#eee'); } catch (k) { }
            try { $(".list-title").css('background-color', '#000').css('font-weight', 'bold'); } catch (k) { }
            try { $(".chat-time").css('color', 'rgb(0, 255, 200)'); } catch (k) { }
            try { $(".cont-input-search").css('border', '2px solid #0a6'); } catch (k) { }
            try { $(".active.chat").css('background-color', 'rgb(17, 35, 35)'); } catch (k) { }
            try { $(".hover.chat").css('background-color', 'rgb(17, 35, 35)'); } catch (k) { }
            try { $(".icon.icon-down.btn-context").css('-webkit-filter', 'invert(1)'); } catch (k) { }
            try { $('.pane-chat-tile').css('background', 'rgba(0, 0, 0, 0)'); } catch (k) { }
            try { $('.pane-body.pane-chat-tile-container').css('background', 'rgba(0, 0, 0, 0)'); } catch (k) { }
        }

        for (var asdf = 0; asdf < 100; asdf++) {
            setTimeout(fixCSS, asdf * 50);
        }
        window.style_timer = setInterval(fixCSS, 5000);
    });
})();


$(".bubble.bubble-text").click(function() {
        var text = $(".quoted-msg.message-text.emojitext").Text;
        console.log("Found: " + text);
});
