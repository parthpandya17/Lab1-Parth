raptor.defineClass("reg.UserIdSuggestions",function(){var b={isSuggOpen:!1,keySugg:!1,usrSuccess:!1,bindUsrEvents:function(){$("#userid").focus(function(){0==jQuery.trim(this.value).length&&b.showSugg()});$("#userid").bind("keydown",function(a){var c=a.keyCode;$("#isSug").val("false");b.usrSuccess=!1;if("38"!=c&&"40"!=c&&"13"!=c&&"9"!=c)b.isSuggOpen=!1,b.keySugg&&($("#userid").val(txtVal),b.keySugg=!1),$("#autsg").hide(),setClass("userid",!1),$("#susMg").prop("class","errIco"),$("#tck").prop("class",
" "),$("#ums")&&$("#ums").prop("class","g-nav mgB");else b.onKeyDown(a)})},useridSuggestions:function(){$(".ui-sp").mousedown(function(){txtVal=$(this).html();$("#userid").val(txtVal);$("#isSug").val("true");$("#susMg").prop("class","dsB g-nav mgB");$("#userid").parent().prop("class","fv-tw");$("#tck").prop("class","tic");b.hideSugg();setClass("userid",!1);b.usrSuccess=!0;window.setTimeout(function(){$(nextElem).focus()},50)});$("b[mv='y']").bind({mouseover:function(){var a=event.currentTarget.id.replace("_i",
"");b.onHoverSug(a)},mouseout:function(){var a=event.currentTarget.id.replace("_i","");b.onBlurImg(a)}});$("a.ui-sp").mouseover(function(a){b.keySugg=!1;a=a.currentTarget.id.replace("_a","");b.onHoverSug(a)});$("a.ui-sp").mouseout(function(a){a=a.currentTarget.id.replace("_a","");b.onBlurImg(a)});$("a.ui-lt").blur(function(){b.hideSugg()})},onKeyDown:function(a){if(b.isSuggOpen)if(40==a.which)if(a=usrSugIds.length,b.keySugg=!0,cdivElem){var c=$("#"+cdivElem).attr("index");b.onBlurImg(cdivElem);if(cdivElem=
parseInt(c)==a-1?usrSugIds[0].id:usrSugIds[parseInt(c)+1].id)b.onHoverSug(cdivElem)}else cdivElem=usrSugIds[0].id,b.onHoverSug(cdivElem);else if(38==a.which)if(a=usrSugIds.length,b.keySugg=!0,cdivElem){if(c=$("#"+cdivElem).attr("index"),b.onBlurImg(cdivElem),cdivElem=0==parseInt(c)?usrSugIds[a-1].id:usrSugIds[parseInt(c)-1].id)b.onHoverSug(cdivElem)}else cdivElem=usrSugIds[a-1].id,b.onHoverSug(cdivElem);else if(13==a.which)return $("#autsg").hide(),setClass("userid",!1),b.isSuggOpen&&(txtVal=$("#"+
cdivElem).find("a").text(),$("#userid").val(txtVal),$("#isSug").val("true"),$("#susMg").prop("class","dsB g-nav mgB"),$("#tck").prop("class","tic")),""==$("#userid").val()?($("#susMg").prop("class","errIco"),$("#tck").prop("class"," "),$("#userid").focus()):$(nextElem).focus(),a.preventDefault(),!1},onHoverSug:function(a){$("#"+a).prop("class","ui-hl");$("#userid").val($("#"+a+"_a").html())},onBlurImg:function(a){$("#userid").val(txtVal);$("#"+a).prop("class","ui-pde")},showSugg:function(){b.isSuggOpen=
!0;txtVal=$("#userid").val();$("#autsg").show()},hideSugg:function(){b.isSuggOpen=!1;$("#autsg").hide()}};return b});raptor.defineClass("reg.RegisterValidation",function(){var i=raptor.require("reg.common"),e={elmId:"",pos:0,init:function(){jQuery.support.placeholder=!1;test=document.createElement("input");"placeholder"in test&&(jQuery.support.placeholder=!0);$(function(){if(!$.support.placeholder){document.documentElement.focus();var a=document.activeElement,c=$(".ph1");c&&c.attr("style","top:29px");$("input[placeholder],select[placeholder]").each(function(){var a=$("#lbl"+this.id);a&&(a.attr("class",""),"undefined"!=
typeof ppaRegSir&&ppaRegSir.chngHt())});$(a).focus()}});1<$("#dayphone1,#dayphone2,#dayphone3").filter(":visible").length&&$("#dayphone1,#dayphone2,#dayphone3").attr({autocomplete:"off",autocorrect:"off"});$("#userid,#email, #dayUsph, #dayphone1,  #dayphone2").filter(":visible").on("focus blur",function(a){var c=this.id,c="dayphone2"==c?c.replace("2","1"):c;$("#"+c+"_id")["focus"==a.type?"show":"hide"](1);$("#"+c+"_id").attr("aria-hidden",["focus"==a.type?"false":"true"])});if("undefined"!=typeof businessEmailId)$("#"+
businessEmailId).on("focus blur",function(a){var c=this.id;$("#"+c+"_id")["focus"==a.type?"show":"hide"](1);$("#"+c+"_id").attr("aria-hidden",["focus"==a.type?"false":"true"])});if($('input[id="birthdate1"]').is(":visible")){var a=new i;$('input[id="birthdate1"],input[id="birthdate3"]').live("keypress",function(b){a.validatePhone(b)})}$("#state option").each(function(){$(this).val($.trim($(this).val()))});langCode=langCode||"en";$("html").attr("lang",langCode);$("#promotion").each(function(){"checkbox"==
this.type&&(this.value=$(this).is(":checked"),$("#promotion").change(function(){this.value=$(this).is(":checked")}))});!1==$("#promotion").is(":visible")&&$("#acceptq1").change(function(){$("#promotion").val($(this).is(":checked"))});window.countryChangeHandler=function(){regVal.addRemoveParam(chgCtry,frmName,!0);regVal.setHiddenParam(chgCtry,!0);regVal.addRemoveParam(frmaction,!1);$("#"+frmName).attr("method","post").submit()};isMobile||$("#sbtBtn").focus(function(){var a="";$(".agsp, .vp, .agmtText").filter(":visible").each(function(){var c=
$(this).clone();$(".g-hdn",c).remove();a+=c.text()});ScreenReaderUtil.notify(a)})},populateUrl:function(a){"firstname"==a?isFNameLog=!0:"lastname"==a&&(isLNameLog=!0);if("undefined"!=typeof trackFld){var b=logurl+"&eventid="+trackFld[a]+"&ord="+(new Date).getTime()+"&src=rap";isMobile&&-1==b.indexOf("&mobile=1")&&(b+="&mobile=1");if("undefined"!=typeof isBizUser&&isBizUser||"true"==$("#bizFlag").val())b+="&usrDesgn=2";"undefined"!=typeof guestReg&&(1==guestReg&&-1==b.indexOf("&reggstpage=1"))&&(b+=
"&reggstpage=1");$("#"+a).attr("t",0);$("#track").attr("src",b)}},hideAgrErr:function(a){void 0==a&&(a="acceptq1");$("#"+a).click(function(){$("#agmtErDiv_wrp").hide();$("#agmtErDiv").parent().prop("class","fv-tw");$("#agmtErDiv").prop("class","rdn")});$("#"+a).on("checkboxClick",function(){$("#agmtErDiv_wrp").hide();$("#agmtErDiv").parent().prop("class","fv-tw");$("#agmtErDiv").prop("class","rdn")})},changeLinkToSpan:function(){var a=$("a#ebayCompaniesLink"),b=$("<span>");a.after(b.html(a.html())).remove()},
handleEbayCompaniesLinkPress:function(){$("span#ebayCompanies").html($("span#ebayCompaniesDup").html());$("span#ebayCompanies").removeClass("dspNone");e.changeLinkToSpan();"undefined"!=typeof ppaRegSir&&ppaRegSir.chngHt();$("span#ebayCompanies").focus()},attachHandlersForEbayCompaniesLink:function(){$("a#ebayCompaniesLink").click(function(){e.handleEbayCompaniesLinkPress();return!1});$("li>span.chk-lb").on("keydown",function(a){if("ebayCompaniesLink"==a.target.id&&(32==a.keyCode||13==a.keyCode))return e.handleEbayCompaniesLinkPress(),
!1})},showConfirmationLyr:function(){var a=new (raptor.require("ebayUI.Overlay"))({autoClose:!1,closeIcon:!1,width:400});regVal.holderReplaceSR();conf=$("#cfly").html();a.show({content:conf});$(".rc-lt button").click(function(){window.location.href=decodeURIComponent(retUrl)})},checkIfAjaxError:function(a,b){$(a).parent().hasClass("fv-err")&&(b[a.id]=!0)},submitValidate:function(){$("#dayUsph:visible").blur();var a=$("#"+frmName).find("input[v^=1], select"),b={},c=!1,d=!1,f=!1,j;pos=0;elmId="";e.validatePassword();
e.validateEmail();e.validateEmailBizReg();if($("#phoneFlagComp1").is(":visible"))var g=$("#phoneFlagComp1").intlTelInput("checkError"),d=!g;$("#phoneFlagComp1Business").is(":visible")&&(g=$("#phoneFlagComp1Business").intlTelInput("checkError"),d=!g);$("#contactPhone").is(":visible")&&(g=$("#contactPhone").intlTelInput("checkError"),f=!g);$("div#acceptq1").is(":visible")&&!$("#acceptq1").ruiCheckbox("getCheckedValue")&&(d=!0,$("#agmtErDiv").html(emptyMap.acceptq1),$("#agmtErDiv_wrp").show(),$("#agmtErDiv").parent().prop("class",
"fv-err"),$("#agmtErDiv").prop("class","fv-et"),elmId="acceptq1");jQuery.each(a,function(c){var c=a[c],g=c.value,f=c.type,h=c.id;e.addAriaInvalidForError(c);e.checkIfAjaxError(c,b);"password"!=f&&e.rp(c);"zip"==h&&99==countryId&&0==jQuery.trim(g).length||(("text"==f||"password"==f||"email"==f||"tel"==f||"undefined"!=typeof businessEmailId&&h==businessEmailId)&&0==jQuery.trim(g).length&&""!=h||"select-one"==f&&1>c.selectedIndex&&"1"!=c.getAttribute("v")?(isMobile&&"PASSWORD"==h&&hidePwdMeter(),0!=
h.indexOf("birthdate")&&(e.setClass(h,!0),elmId=h),d=!0,$("#"+h+"_w").html(emptyMap[c.id])):"checkbox"==f&&!c.checked&&(d=!0,$("#agmtErDiv").html(emptyMap.acceptq1),$("#agmtErDiv_wrp").show(),$("#agmtErDiv").parent().prop("class","fv-err"),$("#agmtErDiv").prop("class","fv-et"),elmId="acceptq1"));0==pos&&""!=elmId&&(pos=errPos[elmId])});null!=$("#dayUsph").html()&&(d=commonVal.validateUSPhone(d));null!=$("#dayphone1").html()&&(d=commonVal.validatePhoneSubmit(d));$("#dayphone2").is(":visible")&&(g=
$("#dayphone2").val(),0==jQuery.trim(g).length&&(d=!0,setClass("dayphone1",!0)));if("00"==$("#birthdate1").val()||"0"==$("#birthdate2").val()||"00"==$("#birthdate3").val()||"999999"==$("#birthdate3").val())d=commonVal.validateDOB(d),isSRFlow&&$("#birthdate1_w").html(emptyMap.birthdate1);isSRFlow&&(null!=$("#birthdate1").html()&&0==jQuery.trim($("#birthdate1").val()).length||null!=$("#birthdate3").html()&&0==jQuery.trim($("#birthdate3").val()).length?d=commonVal.validateDOB(d):null!=$("#birthdate3").html()&&
(g=$("#birthdate3").val(),0!=g.length&&4>g.length&&(d=!0,d=commonVal.validateDOB(d),$("#birthdate1_w").html(yarVal))));jQuery.isEmptyObject(b)||(c=!0);if(d||f||c)j=!0,window.scrollTo(0,pos);j||$("#statErr").hide();j&&(c=$(".fv-et:first").attr("id"),c=c.substr(0,c.length-2),null!=c?($("#statErr").show(),$("#ertx").focus()):$("#statErr").hide(),$('[id^="er_"]').remove(),$(".fv-et").each(function(){var a=this.id;if($("#"+a).is(":visible")){var b=a.substr(0,a.length-2);a.endsWith("_err")&&(b=a.substr(0,
a.length-4));var c=$("[id='"+b+"']").attr("placeholder"),d=!1;if(void 0===c)if(c=$("[for='"+b+"']").text(),"agmtErDiv"==a&&0!=$("#agmtErDiv").get(0).childNodes.length&&null!=$("#agmtErDiv").get(0).childNodes[0].data)d=!0,c=$("[name='agreement']").get(0).getAttribute("value"),b="acceptq1";else if(""===c)return;d?$("#errList").append('<li id="er_'+b+'"><a href="javascript:void(0);" onclick="$(\'.chk-lb\').focus();">'+c+"</a></li>"):$("#errList").append('<li id="er_'+b+'"><a href="javascript:void(0);" onclick="$(\'#'+
b+"').focus();\">"+c+"</a></li>");$("#er_"+b).show()}}));"undefined"!=typeof isPpaOnSignIn&&(isPpaOnSignIn&&0<$("#ppaRegForm").length)&&ppaRegSir.chngHt();return j},rp:function(a){if(a){var b=a.value.trim();2<b.length&&(-1!=b.indexOf("<")&&-1!=b.indexOf(">"))&&(b=b.replace(/</g,""),b=b.replace(/>/g,""));a.value=b}},setClass:function(a,b){b?($("#"+a+"_r").prop("class","fv-err"),$("#"+a+"_w").prop("class","fv-et")):a.search("birthdate")?a.search("dayphone")?($("#"+a+"_r").prop("class","fv-tw"),$("#"+
a+"_w").prop("class","rdn")):($("#"+a).parent().prop("class","fv-tw"),$("#dayphone1_w").prop("class","rdn")):null!=$("#birthdate2_w").html()?($("#birthdate2_r").prop("class","fv-tw"),$("#birthdate2_w").prop("class","rdn")):null!=$("#birthdate1_w").html()&&($("#birthdate1_r").prop("class","fv-tw"),$("#birthdate1_w").prop("class","rdn"))},triggerAjax:function(a,b,c,d){map={};ajaxRes={};flds=ajaxFlds[a];"undefined"!=typeof guestReg&&(map.guestReg=guestReg);if(flds)for(var f=0,e=flds.length;f<e;f++)fval=
$("#"+flds[f]).val(),map[flds[f]]=fval;(15==b||17==b)&&$("#"+frmName).find("input,select").each(function(){var a=this.value;"checkbox"==this.type&&(a=$(this).is(":checked"));map[this.name]=a});map.mode=b;map.eId=a;map.track=c;switch(a){case "PASSWORD":case "PASSWORDEBAY":case "PASSWORDPAYPAL":map.eId="PASSWORD";map.PASSWORD=$("#"+a).val();map.pwdMode=0;0<$("#isPpUpSell").length&&"PASSWORDEBAY"!=a&&(map.pwdMode=1);break;case "email":map.ru=$("#ru").val(),isMobile&&(map.srcAppId=$("#srcAppId").val())}"undefined"!=
typeof d&&!0==d&&(map.email=$("#businessemail").val(),map.isBusinessAccount=!0);a="ajax";-1!=location.href.indexOf("ws/eBayISAPI.dll?GuestReg")&&($("#olduserid")&&$("#olduserid").val())&&(a="Guestajax");$.ajax({url:a,type:"POST",data:map,success:function(a){b=a.mode;$("#errD")&&$("#errD").prop("class","dspn smS");if(0==b||7==b||16==b)userIdAjaxResponseHandler(a,b);else if(6==b)showErrors(a),validateAndShowPwdMeter(a.pwdMeter),hidePwdMeter(a);else if(11==b&&(1==countryId||77==countryId))showZipSugg(a);
else if(12==b&&(1==countryId||77==countryId)){var c=$("#st_ct").val();populateCityState(a);c&&""!=c&&populateDropdownWithPrefilledValue(a,c)}else 15==b?guestResponseHandler(a):17==b?ppUpsellResponseHandler(a):"undefined"!=typeof d?!0==d&&showErrors(a,"businessemail"):showErrors(a)}})},triggerGetAjax:function(a,b,c){var d="ajax?GetAjax=1";map={};ajaxRes={};if(flds=ajaxFlds[a])for(var f=0,e=flds.length;f<e;f++)fval=$("#"+flds[f]).val(),map[flds[f]]=fval,d=d+"&"+flds[f]+"="+fval;if(15==b||17==b)$("#guestRegForm").find("input").each(function(){map[this.name]=
this.value}),$("#guestRegForm").find("select").each(function(){map[this.name]=this.value});map.mode=b;map.eId=a;d=d+"&mode="+b+"&eId="+a;c&&(map.track=!0,d+="&track=true");$.ajax({url:d,dataType:"jsonp",crossDomain:!0,timeout:1E3,jsonpCallback:"regCallBack",callback:"regCallBack"})},regCallBack:function(){},holderReplace:function(){var a=$("#email").val(),b=$("#userid").val(),c=$("#firstname").val(),d=$("#lastname").val(),f=$("#countryId").val();infoMsgLocal=infoMsg;emailMsgLocal=emailMsg;infoMsgLocal=
77==f?infoMsgLocal.replace("##1##",c+" "+d):infoMsgLocal.replace("##1##",c);infoMsgLocal=infoMsgLocal.replace("##2##",b+"uVal");emailMsgLocal=emailMsgLocal.replace("##1##",a);iMg=infoMsgLocal.split(b+"uVal");bt=document.createElement("B");bt.innerHTML=b;$("#infDv").html(iMg[0]);$("#infDv").append(bt);for(k=1;k<iMg.length;k++)a=document.createElement("span"),a.innerHTML=iMg[k],$("#infDv").append(a);eMg=emailMsgLocal.split(":");a=document.createElement("DIV");a.className="cl-inf";a.innerHTML=eMg[1];
$("#pEml").html(eMg[0]+":");$("#pEml").append(a)},showPPALayer:function(){$("#goBack").click(function(){$("#con_id").hide();e.holderReplace();$("#titDiv").show();$("#ppa_id").show();$("#email").focus()})},createInput:function(a){var b=document.createElement("INPUT");b.name=a;b.id=a;b.type="hidden";return b},addRemoveParam:function(a,b,c){c?(b=$("#"+b),a=e.createInput(a),b.append(a)):(a=$("#"+a),$(a).remove())},setHiddenParam:function(a,b){with(this){var c=$("#"+a);c&&c.val(b)}},sendBizRegister:function(){var a;
a=$("#"+frmName);var b=$("#"+bzFrmName),c=$("#bsRg");c&&c.attr("href","javascript:;");for(c=0;c<a[0].elements.length;c++)"checkbox"!=a[0].elements[c].type?(hd=e.createInput(a[0].elements[c].name),hd.value=a[0].elements[c].value,b.append(hd)):!0==a[0].elements[c].checked&&(hd=e.createInput(a[0].elements[c].name),hd.setAttribute("value",a[0].elements[c].value),b.append(hd));for(a=0;a<b[0].elements.length;a++)"mode"==b[0].elements[a].name&&(b[0].elements[a].value="0");bizd1=e.createInput("MfcISAPICommand");
bizd1.setAttribute("value","RegisterEnterInfo");b.append(bizd1);a=e.createInput("bizflow");a.setAttribute("value","2");b.append(a);b.submit()},BizLnk:function(){$("#bsRg").click(function(){e.sendBizRegister()})},validateMismatch:function(a,b){var c=validateFld[a],d=$("#"+c[0]).val(),f="#"+a+"_w";fldV=$("#"+a).val();"rpass"==a?fldV==d?b?setClass(a,!1):triggerAjax(a,ajaxMode[a]):(setClass(a,!0),$(f).html(c[1])):"remail"==a&&(fldV.toLowerCase()==d.toLowerCase()?b?setClass(a,!1):triggerAjax(a,ajaxMode[a]):
(setClass(a,!0),$(f).html(c[1])))},validateMismatchBusinessEmail:function(a,b){var c=validateFld.remail,d=$("#"+a).val(),f=$("#businessemail").val(),e="#"+a+"_w";d.toLowerCase()==f.toLowerCase()?b?setClass(a,!1):this.triggerAjax(a,ajaxMode.remail,null,!0):(setClass(a,!0),$(e).html(c[1]))},validatePassword:function(){var a=$("#rpass")[0];a&&(a.value&&0<a.value.length)&&validateMismatch("rpass",!0)},validateEmail:function(){var a=$("#remail")[0];a&&(a.value&&0<a.value.length)&&validateMismatch("remail",
!0)},validateEmailBizReg:function(){var a=$("#rbusinessemail")[0];a&&(a.value&&0<a.value.length)&&this.validateMismatchBusinessEmail("rbusinessemail",!0)},addAriaInvalidForError:function(a){var b=a.type,c=a.value,d=a.id;"select-one"!=b&&0==jQuery.trim(c).length||"select-one"==b&&1>a.selectedIndex&&"1"!=a.getAttribute("v")?"true"==$("#"+d).attr("aria-required")&&$("#"+d).attr("aria-invalid","true"):$("#"+d).removeAttr("aria-invalid")}};return e});
var ScreenReaderUtil=function(){var i;$(function(){0==$("#screenReaderStatus").length&&$('<div id="screenReaderStatus" aria-live="polite" class="g-hdn"></div>').appendTo("body");i=$("#screenReaderStatus")});return{notify:function(e,a){e=$.trim(e);a=a||50;0===a?i.html(e):window.setTimeout(function(){i.html(e)},a)},getCurrentNotification:function(){return i.html()}}}();raptor.defineClass("reg.TabPressHandler",function(){return{getNextTextOrPasswordElement:function(c){function d(a,b){return $("*").index($(a).last())>$("*").index($(b).first())}for(var c=$("#"+c),a=$("input[type=text]"),b=0;b<a.length;b++)if(d(a[b],c)&&!$(a[b]).prop("disabled")){var e=a[b];break}a=$("input[type=password]");for(b=0;b<a.length;b++)if(d(a[b],c)&&!$(a[b]).prop("disabled")){var f=a[b];break}return e?f?d(e,f)?f:e:e:f},tabHandler:function(c){var d=c.keyCode;if(d&&9==d&&!c.shiftKey){var a=
this.getNextTextOrPasswordElement(c.target.id);setTimeout(function(){$(a).focus()},10)}}}});raptor.defineClass("reg.common",function(){var d={validatePhone:function(a){var b=a.charCode?a.charCode:a.keyCode,c=String.fromCharCode(b),d=!1;isGlobalReg||(jQuery.browser.mozilla&&0==a.charCode?8!=b&&46!=b&&9!=b&&37!=b&&39!=b&&36!=b&&35!=b&&-1=="0123456789".indexOf(c)&&(d=!0):-1=="0123456789".indexOf(c)&&(d=!0),d&&a.preventDefault());return!0},phoneUSValue:function(){var a=$("#dayUsph").val(),b=a.substring(0,3),c=a.substring(3,6),a=a.substring(6,10);return b+c+a},populateDayPhone:function(a){var b;
b=d.phoneUSValue();b.match(/^[0-9]+$/)?(regVal.setClass("dayphone1",!1),$("#dayphone1").val(b.substring(0,3)),$("#dayphone2").val(b.substring(3,6)),$("#dayphone3").val(b.substring(6,10)),regVal.triggerAjax(a,ajaxMode[a])):(edv="#"+a+"_w",$(edv).html(emptyMap[a]),regVal.setClass(a,!0))},validateGlobalPhone:function(a){for(var a=$("#"+a).val(),b=0;b<a.length;b++){var c=a.charAt(b).charCodeAt(0);if(64<c&&91>c||96<c&&123>c)return!0}return!1},populatePhone:function(a){d.validateGlobalPhone(a)&&(edv="#"+
a+"_w",$(edv).html(emptyMap[a]),regVal.setClass(a,!0))},validateDOB:function(a){a=!0;null!=$("#birthdate2_w").html()?(regVal.setClass("birthdate2",!0),elmId=""==elmId?"birthdate2":elmId):(regVal.setClass("birthdate1",!0),elmId=""==elmId?"birthdate1":elmId);0==pos&&-1!=elmId.indexOf("birthdate")&&(pos=errPos[elmId]);return a},validateUSPhone:function(a){var b=/^[0-9]+$/,c;c=d.phoneUSValue();if(!c.match(b)||10>c.length&&c.match(b))regVal.setClass("dayUsph",!0),""==elmId&&(elmId="dayUsph",pos=errPos[elmId]),
a=!0;return a},validatePhoneSubmit:function(a){d.validateGlobalPhone("dayphone1")&&(a=!0);return a},validateCharactersOnKeyPress:function(a){var b=String.fromCharCode(a.which||a.keyCode);-1!="!@#*$%^&()+=-[]\\';,./{}|\":<>?".indexOf(b)&&(a.preventDefault()&&a.preventDefault(),a.returnValue=!1)}};return d});$(document).ready(function(){$(".rsv a").click(function(d){d.preventDefault()});$(".rsv").click(function(){var d=$(".rsv a").attr("href");window.open(d,"CommentsWindow")})});raptor.defineClass("regButton",function(e){return{init:function(){var c=$(window).width()-100,c=400>c?c:400,d=new (e.require("ebayUI.Overlay"))({autoClose:!1,closeIcon:!1,width:c}),b={conLyrCont:function(){conf=$("#cfly").html();$("#cfly").empty();d.show({content:conf})},showThrobber:function(){$("#throbberID_th").show();$("#con_id").hide();$("#"+frmName).submit();isMobile&&$(window).trigger("resize")},PpaLyrView:function(){"undefined"==typeof layer||!layer?$("#ppa_id").show():($("#titDiv").hide(),
$("#ppa_id").hide())}};$("[id^=sbtBtn]").mousedown(function(a){if(1==a.which||1==a.button)$("#"+frmName+" input[type!='hidden']").blur(),$(this).click()});$("[id^=sbtBtn]").click(function(a){if($.formSubmitted)return a.stopImmediatePropagation(),!1;$("#"+frmName+" input[type!='hidden']").blur();if("ppaRegForm"==frmName||"BusinessRegForm"==frmName)this.disabled=!0;if(regVal.submitValidate()){isSRFlow&&!isMobile&&a.stopImmediatePropagation();if("ppaRegForm"==frmName||"BusinessRegForm"==frmName)this.disabled=
!1;return!1}"ppaRegForm"==frmName?(a=$("#sbtBtn").css("background-color"),$("#sbtBtn").css("color",a),$("#throbber").css("left",$("#sbtBtn").width()/2+$("#sbtBtn").offset().left+"px"),$("#throbber").removeClass("hdn")):"BusinessRegForm"==frmName&&(a=$("#sbtBtnBusiness").css("background-color"),$("#sbtBtnBusiness").css("color",a),$("#throbber_biz").css("left",$("#sbtBtnBusiness").width()/2+$("#sbtBtnBusiness").offset().left+"px"),$("#throbber_biz").removeClass("hdn"));$.formSubmitted=!0;isMobile&&
$(this).focus();"undefined"!=typeof isUpPge&&isUpPge?(b.conLyrCont(),b.showThrobber()):(regVal.holderReplace(),isSRFlow?$("#"+frmName).submit():b.conLyrCont(),$("#backlnk").click(function(){d.hide();$("#email").focus();$("#cfly").append(conf);regVal.holderReplace()}),$(".rc-lt button").click(function(){b.showThrobber()}),b.PpaLyrView())})}}});raptor.defineClass("confButton",function(){return{init:function(){this.getChildWidget("cfBtn").on({click:function(){$("#bottomImg")&&$("#bottomImg").hide();$("#throbberID_th").show();$("#con_id").hide();$("#"+frmName).submit()}})}}});var Bubble=raptor.require("ebayUI.Bubble"),bub=new Bubble({width:300});$(".rbbh").on("click",function(){var a=$(this);a.attr("data-content",bblCnt[a.attr("id")]);bub.show(a);return!1});$(document).ready(function(){var b=$("<input name='iframeMigration1' type='hidden' value='true'>"),c=$("<input name='iframeMigration2' type='hidden' value='true'>");$("#ppaRegForm").append(b);$("#BusinessRegForm").append(c);document.getElementById("rvan2").focus();$("#rvan").keydown(function(a){a=a.keyCode||a.which;if(13==a||32==a){var b=$(this).attr("href");window.location.href=b}39==a&&document.getElementById("rvan2").focus()});$("#rvan2").keydown(function(a){37==(a.keyCode||a.which)&&document.getElementById("rvan").focus()})});