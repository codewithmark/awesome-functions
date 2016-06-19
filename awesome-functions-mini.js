/*
 * Library Name: Awesome Functions
 * Original Author: Mark Kumar
 * Documentation: http://codewithmark.com/awesome-functions
 * Licensed under the MIT license
 */
 !function(){}(jQuery,window,document),api=function(){},php=function(){},js=function(){},ls=function(){},bs=function(){},frm=function(){},api.UserLoc=function(t){var e=[];$.getJSON("//apimk.com/ip?callback=json",function(n){t.append('<div class="LocStatus">'+n.status+"</div>"),t.append('<div class="LocIP">'+n.ip+"</div>"),t.append('<div class="LocCity">'+n.city+"</div>"),t.append('<div class="LocState">'+n.state+"</div>"),t.append('<div class="LocZip">'+n.zip+"</div>"),t.append('<div class="LocCountry">'+n.country+"</div>"),t.append('<div class="LocLat">'+n.lat+"</div>"),t.append('<div class="LocLong">'+n.lon+"</div>"),t.append('<div class="LocTimeZone">'+n.timezone+"</div>"),e.push({status:n.status,ip:n.ip,city:n.city,state:n.state,country:n.country,zip:n.zip,lat:n.lat,"long":n.lon,timezone:n.timezone})})},api.IsMobile=function(t){var e=[];$.getJSON("//apimk.com/ismobile?callback=json",function(n){t.append('<div class="MobileStatus">'+n.Status+"</div>"),t.append('<div class="Mobile">'+n.Mobile+"</div>"),t.append('<div class="Browser">'+n.Browser+"</div>"),t.append('<div class="BrowserVersionNum">'+n.BrowserVersionNum+"</div>"),t.append('<div class="Platform">'+n.Platform+"</div>"),e.push({Status:n.Status,Mobile:n.Mobile,Browser:n.Browser,BrowserVersionNum:n.BrowserVersionNum,Platform:n.Platform})})},php.Microtime=function(t){var e,n;return"undefined"!=typeof performance&&performance.now?(n=(performance.now()+performance.timing.navigationStart)/1e3,t?n:(e=0|n,Math.round(1e6*(n-e))/1e6+" "+e)):(n=(Date.now?Date.now():(new Date).getTime())/1e3,t?n:(e=0|n,Math.round(1e3*(n-e))/1e3+" "+e))},php.UniqueID=function(t,e){"undefined"==typeof t&&(t="");var n,r=function(t,e){return t=parseInt(t,10).toString(16),e<t.length?t.slice(t.length-e):e>t.length?Array(1+(e-t.length)).join("0")+t:t};return this.php_js||(this.php_js={}),this.php_js.uniqidSeed||(this.php_js.uniqidSeed=Math.floor(123456789*Math.random())),this.php_js.uniqidSeed++,n=t,n+=r(parseInt((new Date).getTime()/1e3,10),8),n+=r(this.php_js.uniqidSeed,5),e&&(n+=(10*Math.random()).toFixed(8).toString()),n},js.AjaxCall=function(t,e,n){return $.ajax({type:"POST",url:t,data:e,dataType:n})},js.AutoCode=function(t){t||(t=5);for(var e="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=0;t>r;r++)e+=n.charAt(Math.floor(Math.random()*n.length));return e},js.ChangePageTitle=function(t){$(document).attr("title",t)},js.GetDateTime=function(t,e){var n,r="";n=""===t?new Date:new Date(t);var a=function(t){return(""+t).length<2?"0"+t:""+t};return"server"==e&&(r=n.getFullYear()+"-"+a(n.getMonth()+1)+"-"+a(n.getDate())),"dt"==e&&(r=a(n.getMonth()+1)+"-"+a(n.getDate())+"-"+n.getFullYear()),"dttm"==e&&(r=a(n.getMonth()+1)+"-"+a(n.getDate())+"-"+n.getFullYear()+" "+a(n.getHours())+":"+a(n.getMinutes())+":"+a(n.getSeconds())),r},js.GetFutureDate=function(t,e){e||(e="dt");var n=function(t){return(""+t).length<2?"0"+t:""+t},r=t,a=new Date;if(!t)var o=new Date;if(t)var o=new Date(a.getFullYear(),a.getMonth(),a.getDate()+r);return"server"==e&&(data=o.getFullYear()+"-"+n(o.getMonth()+1)+"-"+n(o.getDate())),"dt"==e&&(data=n(o.getMonth()+1)+"-"+n(o.getDate())+"-"+o.getFullYear()),data},js.CharCount=function(t,e){var n=e,r=t,a="countchars"+$.js.AutoCode();r.after('<br><span name="countchars" id="'+a+'">0</span> Characters Remaining.');var o=$("#"+a);o.text(n),r.keyup(function(){var t=this.value.replace(/{.*}/g,"").length;if(t>n){var e=t-n;this.value=this.value.substring(0,this.value.length-e)}else o.text(n-t)})},js.IsOnline=function(){var t=navigator.onLine?"online":"offline";return t},js.GetDirPath=function(){var t=window.location,e=t.pathname.substring(0,t.pathname.lastIndexOf("/")+1);return t.href.substring(0,t.href.length-((t.pathname+t.search+t.hash).length-e.length))},js.GetSiteURL=function(){var t=location.protocol+"//"+location.host+"/";return t},js.MilliSec=function(){return performance.now()},js.CapitalizeFirstLetter=function(t){return(t+"").replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g,function(t){return t.toUpperCase()})},ls.Add=function(t,e){var n=localStorage.setItem(t,JSON.stringify(e));return n},ls.Get=function(t,e,n){for(var r=JSON.parse(localStorage.getItem(t)),a=[],o=0;o<r.length;o++){var i=r[o];i[e]==n&&a.push(r[o])}var s=a.length;return s?1==s?{Status:"Success",TotalRows:1,RecData:i}:s>1?{Status:"Success",TotalRows:a.length,RecData:a}:void 0:{Status:"Error",TotalRows:0}},ls.GetAll=function(t){var e=JSON.parse(localStorage.getItem(t)),n=e.length;return n?n>1?{Status:"Success",TotalRows:n,RecData:e}:void 0:{Status:"Error",TotalRows:0}},ls.Count=function(t){var e=JSON.parse(localStorage.getItem(t));return e.length},ls.Empty=function(t){localStorage.setItem(t,"")},ls.Delete=function(t){localStorage.removeItem(t)},bs.ShowError=function(t,e){e.after('<div id="derr" class="derr alert alert-danger fa fa-exclamation-triangle form-control" style="padding:5px;font-size:14px"  > '+t+"</div>"),e.css("background-color","yellow"),e.focus()},bs.ClearError=function(){$(".derr").prevAll().css("background-color",""),$(".derr").remove(),$(".derr").hide()},bs.WaitingMsg=function(t){var e="";return e+='<div id="MsgBox" id="derr" class="derr bg-info alert alert-info derr" style="font-size: 40px;padding:10px;">',e+='<i class="fa fa-refresh fa-spin "></i> '+t+" ",e+="</div>"},bs.AlertMsg=function(t,e){var n,r=e.toLowerCase();"success"==r&&(n="alert-success"),"error"==r&&(n="alert-danger"),"info"==r&&(n="alert-info"),"warning"==r&&(n="alert-warning");var a="";return a+='<div class="derr alert '+n+'"  >',a+='<div   style="padding:5px;font-size:16px">',a+='<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>',a+=t,a+="</div>",a+="</div>"},bs.CheckingMsg=function(t,e){var n='<div id="derr" class="derr alert alert-warning" role="alert"> <i class="fa fa-spinner fa-spin"></i> '+e+"</div>";t.after(n)},bs.CreateButton=function(t,e,n){var r="";return r+='<button type="button" id="'+e+'" name="'+e+'"  class="btn '+n+'" Addon>',r+=" "+t,r+=" </button>"},bs.CreateInputField=function(t,e,n,r){var a="";return a='<div class="form-group form-inline">',a+='<input type="text"  id="'+e+'"name='+e+' class="form-control '+n+'" '+r+' value="'+t+'">',a+="</div>"},bs.CreateHiddenInputField=function(t,e,n,r){var a="";return a='<div class="form-group" style="display:none;">',a+='<input type="text"  id="'+e+'"name='+e+' class="form-control '+n+'" '+r+' value="'+t+'">',a+="</div>"},bs.CreateCustomInputField=function(t,e,n,r,a){var o="";return o='<div class="form-group form-inline">',o+='<input type="'+t+'"  id="'+n+'"name='+n+' class="form-control '+r+'" '+a+' value="'+e+'">',o+="</div>"},bs.CreateGroupInputField=function(t,e,n,r,a){var o="";return o+='<form class="form-group form-inline">',o+='<div class="input-group">',o+='<div class="input-group-addon">'+t+"</div>",o+='<input type="text"  id="'+n+'"name='+n+' class="form-control '+r+'" '+a+' value="'+e+'">',o+="</div>",o+="</form>"},bs.CreateCustomGroupInputField=function(t,e,n,r,a,o){var i="";return i+='<form class="form-group form-inline">',i+='<div class="input-group">',i+='<div class="input-group-addon">'+e+"</div>",i+='<input type="'+t+'"  id="'+r+'"name='+r+' class="form-control '+a+'" '+o+' value="'+n+'">',i+="</div>",i+="</form>"},bs.CreateTextBox=function(t,e,n,r){var a=" ";return a+='<div class="form-group form-inline"  >',a+='<textarea name="'+e+'" id="'+e+'" class="form-control  '+n+'"  '+r+" >"+t+"</textarea>",a+="</div>"},bs.CreateHiddenTextBox=function(t,e,n,r){var a=" ";return a+='<div class="form-group" style="display:none;"  >',a+='<textarea name="'+e+'" id="'+e+'" class="form-control  '+n+'"  '+r+" >"+t+"</textarea>",a+="</div>"},bs.CreateGroupTextBox=function(t,e,n,r,a){var o="";return o+='<form class="form-group form-inline">',o+='<div class="input-group">',o+='<div class="input-group-addon">'+t+"</div>",o+='<textarea name="'+n+'" id="'+n+'" class="form-control  '+r+'"  '+a+" >"+e+"</textarea>",o+="</div>",o+="</form>"},bs.CreateDropDown=function(t,e,n,r){var a='<div class="form-group">';a+="<label>"+t+"</label></br>",a+='<select class="form-control" name='+n+" id="+n+" Addon> ",""!=r?(a+='<option value="'+r+'">'+r+"</option> ",a+='<option value="none">Please Select One</option> '):a+='<option value="none">Please Select One</option> ';for(var o=e.split(","),i=o.length,s=0;i>s;s++){var l=o[s];void 0===l&&"undefined"===l||(a+='<option value="'+l+'">'+l+"</option> ")}return a+="</select>",a+="</div>"},frm.IsEmpty=function(t){return""!=t?t:void 0},frm.IsAlphaNumeric=function(t){var e=/^[0-9a-zA-Z]+$/;return e.test(t)},frm.IsNoSpaces=function(t){var e=/^\S+$/i;return e.test(t)},frm.IsEmail=function(t){var e=new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);return e.test(t)},frm.IsURL=function(t){var e=/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;return e.test(t)},frm.IsNumber=function(t){var e=/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;return e.test(t)},frm.IsBetweenNumber=function(t,e){var n=$.trim(t),r=e.split(",");return console.log(r),n>=r[0]&&n<=r[1]?n:void 0},frm.IsLength=function(t,e){var n=$.trim(t);return e==n.length?n:void 0},frm.IsMinLength=function(t,e){var n=$.trim(t);return e>=n.length?n:void 0},frm.IsMaxLength=function(t,e){var n=$.trim(t);return e<=n.length?n:void 0},frm.IsRangeLength=function(t,e){var n=$.trim(t),r=e.split(",");return n.length>=r[0]&&n.length<=r[1]?n:void 0},frm.IsEqualTo=function(t,e){return t==e?t:void 0};