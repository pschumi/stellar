/*!
 * froala_editor v2.0.3 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(t,n){return void 0===n&&(n="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(n),n}:e(jQuery)}(function(e){"use strict";e.extend(e.FroalaEditor.DEFAULTS,{fontSize:["8","9","10","11","12","14","18","24","30","36","48","60","72","96"],fontSizeSelection:!1}),e.FroalaEditor.PLUGINS.fontSize=function(t){function n(e){t.commands.applyProperty("font-size",e+"px")}function o(n,o){var i=t.helpers.getPX(e(t.selection.element()).css("font-size"));o.find(".fr-command.fr-active").removeClass("fr-active"),o.find('.fr-command[data-param1="'+i+'"]').addClass("fr-active");var r=o.find(".fr-dropdown-list"),f=o.find(".fr-active").parent();f.length?r.parent().scrollTop(f.offset().top-r.offset().top-(r.parent().outerHeight()/2-f.outerHeight()/2)):r.parent().scrollTop(0)}function i(n){var o=t.helpers.getPX(e(t.selection.element()).css("font-size"));n.find("> span").text(o)}return{apply:n,refreshOnShow:o,refresh:i}},e.FroalaEditor.RegisterCommand("fontSize",{type:"dropdown",title:"Font Size",displaySelection:function(e){return e.opts.fontSizeSelection},displaySelectionWidth:30,defaultSelection:"12",html:function(){for(var e='<ul class="fr-dropdown-list">',t=this.opts.fontSize,n=0;n<t.length;n++){var o=t[n];e+='<li><a class="fr-command" data-cmd="fontSize" data-param1="'+o+'" title="'+o+'">'+o+"</a></li>"}return e+="</ul>"},callback:function(e,t){this.fontSize.apply(t)},refresh:function(e){this.fontSize.refresh(e)},refreshOnShow:function(e,t){this.fontSize.refreshOnShow(e,t)}}),e.FroalaEditor.DefineIcon("fontSize",{NAME:"text-height"})});