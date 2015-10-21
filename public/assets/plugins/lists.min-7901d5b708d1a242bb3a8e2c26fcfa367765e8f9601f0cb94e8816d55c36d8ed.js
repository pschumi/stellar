/*!
 * froala_editor v1.2.8 (https://www.froala.com/wysiwyg-editor)
 * License https://www.froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */
!function(e){e.Editable.commands=e.extend(e.Editable.commands,{insertOrderedList:{title:"Numbered List",icon:"fa fa-list-ol",refresh:function(){},callback:function(e){this.formatList(e)},undo:!0},insertUnorderedList:{title:"Bulleted List",icon:"fa fa-list-ul",refresh:function(){},callback:function(e){this.formatList(e)},undo:!0}}),e.Editable.prototype.refreshLists=function(){var t=e(this.getSelectionElement()),i=this.parents(t,"ul, ol");if(i.length>0){var n="insertUnorderedList";"OL"==i[0].tagName&&(n="insertOrderedList"),this.$editor.find('button[data-cmd="'+n+'"]').addClass("active")}},e.Editable.prototype.processBackspace=function(t){var i=t.prev();if(i.length){for(this.removeMarkers(),("UL"==i.get(0).tagName||"OL"==i.get(0).tagName)&&(i=i.find("li:last"));i.find("> ul, > ol").length;)i=i.find("> ul li:last, > ol li:last");var n=i.find("> p, > h1, > h3, > h4, > h5, > h6, > div, > pre, > blockquote");if(0===i.text().length&&0===i.find("img, table, input, iframe, video").length)i.remove();else{if(this.emptyElement(i.get(0))||(this.keep_enter=!0,t.find("> p, > h1, > h3, > h4, > h5, > h6, > div, > pre, > blockquote").each(function(t,i){e(i).replaceWith(e(i).html())}),this.keep_enter=!1),n.length)if(e(n[n.length-1]).append(this.markers_html),0===t.find("ul, ol").length)e(n[n.length-1]).append(t.html());else{for(var r=!1,s=t.contents(),a=0;a<s.length;a++){var l=s[a];["OL","UL"].indexOf(s[a].tagName)>=0&&(r=!0),r?e(n[n.length-1]).after(l):e(n[n.length-1]).append(l)}this.$element.find("breakli").remove();var h=n[n.length-1].nextSibling;h&&"BR"==h.tagName&&e(h).remove()}else this.emptyElement(i.get(0))?(this.$element.find("breakli").replaceWith(this.markers_html),i.html(t.html())):(i.append(this.markers_html),i.append(t.html()));t.remove(),this.cleanupLists(),this.restoreSelectionByMarkers()}this.$element.find("breakli").remove()}else this.$element.find("breakli").remove(),this.parents(t,"ul").length?this.formatList("insertUnorderedList",!1):this.formatList("insertOrderedList",!1);this.sync()},e.Editable.prototype.liBackspace=function(){if(""!==this.text())return!0;var t,i=this.getSelectionElement(),n=this.parents(e(i),"table, li");if(n.length>0&&"TABLE"===n[0].tagName)return!0;if(t="LI"==i.tagName?e(i):this.parents(e(i),"li:first"),this.removeMarkers(),this.emptyElement(t.get(0))?(t.prepend("<breakli></breakli>"),1==t.find("br").length&&t.find("br").remove()):this.insertHTML("<breakli></breakli>"),t.find("breakli").prev().length&&"TABLE"===t.find("breakli").prev().get(0).tagName&&t.find("breakli").next().length&&"BR"===t.find("breakli").next().get(0).tagName)return this.setSelection(t.find("breakli").prev().find("td:first").get(0)),t.find("breakli").next().remove(),this.$element.find("breakli").remove(),!1;for(var r,s=t.html(),a=[],l=0;l<s.length;l++){if(chr=s.charAt(l),"<"!=chr)return this.$element.find("breakli").remove(),!0;var h=s.indexOf(">",l+1);if(-1!==h){r=s.substring(l,h+1);var o=this.tagName(r);if(l=h,"breakli"==o){if(!this.isClosingTag(r)&&!this.isClosingTag(a[a.length-1]))return this.processBackspace(t),!1}else a.push(r)}}return this.$element.find("breakli").remove(),!0},e.Editable.prototype.textLiEnter=function(t){this.removeMarkers(),this.insertSimpleHTML("<breakli></breakli>",!1);var i,n,r=t.html(),s=[],a={},l=[],h=0,o=t.prop("attributes"),p="";for(n=0;n<o.length;n++)p+=" "+o[n].name+'="'+o[n].value+'"';var d=!1;for(n=0;n<r.length;n++)if(chr=r.charAt(n),"<"==chr){var f=r.indexOf(">",n+1);if(-1!==f){i=r.substring(n,f+1);var g=this.tagName(i);if(n=f,"breakli"==g){if(!this.isClosingTag(i)){for(var m=s.length-1;m>=0;m--){var c=this.tagName(s[m]);l.push("</"+c+">")}l.push("</li>"),l.push("<li"+p+">");for(var u=0;u<s.length;u++)l.push(s[u]);l.push('<span class="f-marker" data-type="false" data-collapsed="true" data-id="0" data-fr-verified="true"></span><span class="f-marker" data-type="true" data-collapsed="true" data-id="0" data-fr-verified="true"></span>'),d=!1}}else if(l.push(i),d=!1,!this.isSelfClosingTag(i))if(this.isClosingTag(i)){var v=a[g].pop();s.splice(v,1)}else s.push(i),void 0===a[g]&&(a[g]=[]),a[g].push(s.length-1)}}else h++,32!=chr.charCodeAt(0)||d?(l.push(chr),d=!0):l.push("&nbsp;");var b=e(t.parents("ul, ol")[0]);t.replaceWith("<li"+p+">"+l.join("")+"</li>"),b.find("p:empty + table").prev().remove(),b.find("p + table").each(function(t,i){var n=e(i);n.prev().append(n.clone()),n.remove()}),b.find("table + p").each(function(t,i){var n=e(i);n.append(n.prev().clone()),n.prev().remove()}),this.keep_enter=!0,b.find(this.valid_nodes.join(",")).each(e.proxy(function(t,i){""===e(i).text().trim()&&0===e(i).find(this.valid_nodes.join(",")).length&&e(i).prepend(e.Editable.INVISIBLE_SPACE)},this)),this.keep_enter=!1},e.Editable.prototype.liEnter=function(){var t,i=this.getSelectionElement(),n=this.parents(e(i),"table, li");if(n.length>0&&"TABLE"==n[0].tagName)return!0;if(t="LI"==i.tagName?e(i):this.parents(e(i),"li:first"),this.getSelectionTextInfo(t.get(0)).atStart&&""===this.text())t.before("<li>"+e.Editable.INVISIBLE_SPACE+"</li>");else{if(0===this.trim(t.text()).length&&0===t.find("img, table, iframe, input, object").length)return this.outdent(!1),!1;this.textLiEnter(t),this.$element.find("breakli").remove(),this.restoreSelectionByMarkers()}return this.sync(),!1},e.Editable.prototype.listTab=function(){var t=e(this.getSelectionElement());return this.parents(t,"ul, ol").length>0&&0===this.parents(t,"table").length?(this.indent(),!1):void 0},e.Editable.prototype.listShiftTab=function(){var t=e(this.getSelectionElement());return this.parents(t,"ul, ol").length>0&&0===this.parents(t,"table").length?(this.outdent(),!1):void 0},e.Editable.prototype.indentList=function(e,t){return"LI"===e.get(0).tagName?(t?this.outdentLi(e):this.indentLi(e),this.cleanupLists(),!1):!0},e.Editable.prototype.initList=function(){this.addListener("tab",this.listTab),this.addListener("shift+tab",this.listShiftTab),this.addListener("refresh",this.refreshLists),this.addListener("indent",this.indentList),this.isImage||this.isLink||this.options.editInPopup||this.$element.on("keypress",e.proxy(function(t){if(["TEXTAREA","INPUT"].indexOf(t.target.tagName)<0&&!this.isHTML){var i=t.which,n=this.getSelectionElement();if("LI"==n.tagName||this.parents(e(n),"li").length>0){if(13==i&&!t.shiftKey&&this.options.multiLine)return this.liEnter();if(8==i)return this.liBackspace()}}},this))},e.Editable.initializers.push(e.Editable.prototype.initList),e.Editable.prototype.formatList=function(t,i){if(this.browser.msie&&e.Editable.getIEversion()<9)return document.execCommand(t,!1,!1),!1;void 0===i&&(i=!0);var n,r,s=!1,a=!0,l=!1,h=this.getSelectionElements(),o=this.parents(e(h[0]),"ul, ol");if(o.length&&("UL"===o[0].tagName?"insertUnorderedList"!=t&&(s=!0):"insertOrderedList"!=t&&(s=!0)),this.saveSelectionByMarkers(),s){n="ol","insertUnorderedList"===t&&(n="ul");var p=e(o[0]);p.replaceWith("<"+n+">"+p.html()+"</"+n+">")}else{for(var d=0;d<h.length;d++)if(r=e(h[d]),("TD"==r.get(0).tagName||"TH"==r.get(0).tagName)&&this.wrapTextInElement(r),this.parents(r,"li").length>0||"LI"==r.get(0).tagName){var f;f="LI"==r.get(0).tagName?r:e(r.parents("li")[0]);var g=this.parents(r,"ul, ol");if(g.length>0&&(n=g[0].tagName.toLowerCase(),f.before('<span class="close-'+n+'" data-fr-verified="true"></span>'),f.after('<span class="open-'+n+'" data-fr-verified="true"></span>')),0===this.parents(e(g[0]),"ol, ul").length||s)if(0===f.find(this.valid_nodes.join(",")).length){var m=f.html().replace(/\u200B/gi,"");this.options.paragraphy?(0===f.text().replace(/\u200B/gi,"").length&&(m+=f.find("br").length>0?"":this.br),m="<"+this.options.defaultTag+this.attrs(f.get(0))+">"+m,m=m+"</"+this.options.defaultTag+">"):m+=f.find("br").length>0?"":this.br,f.replaceWith(m)}else f.replaceWith(f.html().replace(/\u200B/gi,""));else this.parents(e(g[0]),"ol, ul").length>0&&(f.append('<span class="open-li" data-fr-verified="true"></span>'),f.before('<span class="close-li" data-fr-verified="true"></span>'));l=!0}else a=!1;l&&this.cleanupLists(),(a===!1||s===!0)&&(this.wrapText(),this.restoreSelectionByMarkers(),h=this.getSelectionElements(),this.saveSelectionByMarkers(),this.elementsToList(h,t),this.unwrapText(),this.cleanupLists())}this.options.paragraphy&&!s&&this.wrapText(!0),this.restoreSelectionByMarkers(),i&&this.repositionEditor(),t="insertUnorderedList"==t?"unorderedListInserted":"orderedListInserted",this.triggerEvent(t)},e.Editable.prototype.elementsToList=function(t,i){var n="<ol>";"insertUnorderedList"==i&&(n="<ul>"),t[0]==this.$element.get(0)&&(t=this.$element.find("> "+this.valid_nodes.join(", >")));for(var r=0;r<t.length;r++){var s=e(n);$element=e(t[r]),$element.get(0)!=this.$element.get(0)&&("TD"===$element.get(0).tagName||"TH"===$element.get(0).tagName?(this.wrapTextInElement($element,!0),this.elementsToList($element.find("> "+this.valid_nodes.join(", >")),i)):(""===$element.attr("class")&&$element.removeAttr("class"),s.append($element.get(0).tagName==this.options.defaultTag&&0===$element.get(0).attributes.length?e("<li>").html($element.clone().html()):e("<li>").html($element.clone())),$element.replaceWith(s)))}},e.Editable.prototype.indentLi=function(t){var i=t.parents("ul, ol"),n=i.get(0).tagName.toLowerCase();t.find("> ul, > ol").length>0&&t.prev("li").length>0?(this.wrapTextInElement(t),t.find("> "+this.valid_nodes.join(" , > ")).each(function(t,i){e(i).wrap("<"+n+"></"+n+">").wrap("<li></li>")}),t.prev("li").append(t.find("> ul, > ol")),t.remove()):0===t.find("> ul, > ol").length&&t.prev("li").length>0&&(t.prev().append(e("<"+n+">").append(t.clone())),t.remove(),e(i.find("li").get().reverse()).each(function(t,i){var n=e(i);n.find(" > ul, > ol").length>0&&n.prev()&&n.prev().find(" > ul, > ol").length>0&&1===n.contents().length&&(n.prev().append(n.html()),n.remove())}))},e.Editable.prototype.outdentLi=function(t){var i=e(t.parents("ul, ol")[0]),n=this.parents(i,"ul, ol"),r=i.get(0).tagName.toLowerCase();0===t.prev("li").length&&this.parents(t,"li").length>0?(t.before('<span class="close-'+r+'" data-fr-verified="true"></span>'),t.before('<span class="close-li" data-fr-verified="true"></span>'),t.before('<span class="open-li" data-fr-verified="true"></span>'),t.after('<span class="open-'+r+'" data-fr-verified="true"></span>'),t.replaceWith(t.html())):(t.before('<span class="close-'+r+'" data-fr-verified="true"></span>'),t.after('<span class="open-'+r+'" data-fr-verified="true"></span>'),this.parents(t,"li").length>0&&(t.before('<span class="close-li" data-fr-verified="true"></span>'),t.after('<span class="open-li" data-fr-verified="true"></span>'))),n.length||(0===t.find(this.valid_nodes.join(",")).length?t.replaceWith(t.html().replace(/\u200b/gi,"")+this.br):(t.find(this.valid_nodes.join(", ")).each(e.proxy(function(t,i){this.emptyElement(i)&&e(i).append(this.br)},this)),t.replaceWith(t.html().replace(/\u200b/gi,""))))},e.Editable.prototype.listTextEmpty=function(t){var i=e(t).text().replace(/(\r\n|\n|\r|\t|\u200B)/gm,"");return(""===i||t===this.$element.get(0))&&1===e(t).find("br").length}}(jQuery);