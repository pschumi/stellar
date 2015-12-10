/*!
 * froala_editor v2.0.3 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(t,o){return void 0===o&&(o="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(o),o}:e(jQuery)}(function(e){"use strict";e.FroalaEditor.PLUGINS.quote=function(t){function o(e){for(;e.parentNode&&e.parentNode!=t.$el.get(0);)e=e.parentNode;return e}function r(){var r,n=t.selection.blocks();for(r=0;r<n.length;r++)n[r]=o(n[r]);t.selection.save();var i=e("<blockquote>");for(i.insertBefore(n[0]),r=0;r<n.length;r++)i.append(n[r]);t.html.unwrap(),t.selection.restore()}function n(){var o,r=t.selection.blocks();for(o=0;o<r.length;o++)"BLOCKQUOTE"!=r[o].tagName&&(r[o]=e(r[o]).parentsUntil(t.$el,"BLOCKQUOTE").get(0));for(t.selection.save(),o=0;o<r.length;o++)r[o]&&e(r[o]).replaceWith(r[o].innerHTML);t.html.unwrap(),t.selection.restore()}function i(e){t.selection.save(),t.html.wrap(!0,!0),t.selection.restore(),"increase"==e?r():"decrease"==e&&n()}return{apply:i}},e.FroalaEditor.RegisterShortcut(222,"quote","increase"),e.FroalaEditor.RegisterShortcut(222,"quote","decrease",!0),e.FroalaEditor.RegisterCommand("quote",{title:"Quote",type:"dropdown",options:{increase:"Increase",decrease:"Decrease"},callback:function(e,t){this.quote.apply(t)}}),e.FroalaEditor.DefineIcon("quote",{NAME:"quote-left"})});