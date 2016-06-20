/*
 * Library Name: Awesome Functions
 * Version Number: 2016.06.19
 * Original Author: Mark Kumar
 * Documentation: http://codewithmark.com/awesome-functions
 * Licensed under the MIT license
 */
  
;(function ( $, window, document, undefined ) 
{

	 
}( jQuery, window, document));
 
  //Function initiator 
  api = function(){};  
  php = function(){};  
  js = function(){};

  //For Local Storage Functions
  ls =function(){};

  //For Bootstrap Functions
  bs =function(){}; 

  //For login form
  frm =function(){}; 



 

//--->API Call Functions - Start

  //--->User Location Info Function - Start
  api.UserLoc = function(UserElementObj) 
  {
    var LocDataArr = [];
   
    //Make the api call
    jQuery.getJSON("//apimk.com/ip?callback=json", function(data, status)
    {   
      //Add user loc data to div      
      UserElementObj.append('<div class="LocStatus">'+data['status'] +'</div>');
      UserElementObj.append('<div class="LocIP">'+data['ip'] +'</div>');
      UserElementObj.append('<div class="LocCity">'+data['city'] +'</div>');
      UserElementObj.append('<div class="LocState">'+data['state'] +'</div>');
      UserElementObj.append('<div class="LocZip">'+data['zip'] +'</div>');
      UserElementObj.append('<div class="LocCountry">'+data['country'] +'</div>');
      UserElementObj.append('<div class="LocLat">'+data['lat'] +'</div>');
      UserElementObj.append('<div class="LocLong">'+data['lon'] +'</div>');
      UserElementObj.append('<div class="LocTimeZone">'+data['timezone'] +'</div>');
      
      //Wrap it in an array in case you want to customize this to your liking
      LocDataArr.push(
      { 
        'status':data['status'],
        'ip':data['ip'],
        'city':data['city'],
        'state':data['state'],
        'country':data['country'] ,
        'zip':data['zip'],
        'lat':data['lat'],
        'long':data['lon'],
        'timezone':data['timezone'] ,
      } 
      ); 
    });
  };

  //--->User Location Info Function - End
  
   
    
  //--->User Device Access Function - Start
  api.IsMobile = function(UserElementObj) 
  {
    var LocDataArr = [];
    //Make the api call
    jQuery.getJSON("//apimk.com/ismobile?callback=json", function(data, status)
    {   
      //Add user loc data to div      
      UserElementObj.append('<div class="MobileStatus">'+data['Status'] +'</div>');
      UserElementObj.append('<div class="Mobile">'+data['Mobile'] +'</div>');
      UserElementObj.append('<div class="Browser">'+data['Browser'] +'</div>');
      UserElementObj.append('<div class="BrowserVersionNum">'+data['BrowserVersionNum'] +'</div>');
      UserElementObj.append('<div class="Platform">'+data['Platform'] +'</div>'); 

      //Wrap it in an array in case you want to customize this to your liking
      LocDataArr.push(
      { 
        'Status':data['Status'],
        'Mobile':data['Mobile'],
        'Browser':data['Browser'],
        'BrowserVersionNum':data['BrowserVersionNum'],
        'Platform':data['Platform'], 
      });  
      
    }); 
  }; 

  //--->User Device Access Function - End  
    
//--->API Call Functions - End  
    
    
    

    
//--->PHP Functions - Start  
   
  //--->Microtime Function - Start
  php.microtime = function(getAsFloat)   
  {
    var s
    var now
    if (typeof performance !== 'undefined' && performance.now) 
    {
      now = (performance.now() + performance.timing.navigationStart) / 1e3
      if (getAsFloat) 
      {
        return now
      }
      // Math.round(now)
      s = now | 0
      return (Math.round((now - s) * 1e6) / 1e6) + ' ' + s
    } else {
      now = (Date.now ? Date.now() : new Date().getTime()) / 1e3
      if (getAsFloat) {
        return now
      }
      // Math.round(now)
      s = now | 0
      return (Math.round((now - s) * 1e3) / 1e3) + ' ' + s;
    }
  }; 
  //--->Microtime Function - End
  
  
  
  //--->UniqueID Function - Start   
  php.uniqid = function(prefix, more_entropy)    
  {
    //   example 1: uniqid();
    //   returns 1: 'a30285b160c14'
    //   example 2: uniqid('foo');
    //   returns 2: 'fooa30285b1cd361'
    //   example 3: uniqid('bar', true);
    //   returns 3: 'bara20285b23dfd1.31879087'

    if (typeof prefix === 'undefined') {
      prefix = ''
    }

    var retId
    var formatSeed = function (seed, reqWidth) {
      seed = parseInt(seed, 10)
        .toString(16) // to hex str
      if (reqWidth < seed.length) {
        // so long we split
        return seed.slice(seed.length - reqWidth)
      }
      if (reqWidth > seed.length) {
        // so short we pad
        return Array(1 + (reqWidth - seed.length))
          .join('0') + seed
      }
      return seed
    }

    // BEGIN REDUNDANT
    if (!this.php_js) {
      this.php_js = {}
    }
    // END REDUNDANT
    if (!this.php_js.uniqidSeed) {
      // init seed with big random int
      this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15)
    }
    this.php_js.uniqidSeed++

    // start with prefix, add current milliseconds hex string
    retId = prefix
    retId += formatSeed(parseInt(new Date()
      .getTime() / 1000, 10), 8)
    // add seed hex string
    retId += formatSeed(this.php_js.uniqidSeed, 5)
    if (more_entropy) {
      // for more entropy we add a float lower to 10
      retId += (Math.random() * 10)
        .toFixed(8)
        .toString()
    }

    return retId
  }
  //--->UniqueID Function - End
  
  php.str_replace = function  (search, replace, string_containing_text, countObj) 
  {
    //   example 1: str_replace(' ', '.', 'Kevin van Zonneveld')
    //   returns 1: 'Kevin.van.Zonneveld'
    //   example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars')
    //   returns 2: 'hemmo, mars'
    //   example 3: str_replace(Array('S','F'),'x','ASDFASDF')
    //   returns 3: 'AxDxAxDx'
    //   example 4: var countObj = {}
    //   example 4: str_replace(['A','D'], ['x','y'] , 'ASDFASDF' , countObj)
    //   example 4: var $result = countObj.value
    //   returns 4: 4



    var i = 0
    var j = 0
    var temp = ''
    var repl = ''
    var sl = 0
    var fl = 0
    var f = [].concat(search)
    var r = [].concat(replace)
    var s = string_containing_text
    var ra = Object.prototype.toString.call(r) === '[object Array]'
    var sa = Object.prototype.toString.call(s) === '[object Array]'
    s = [].concat(s)

    var $global = (typeof window !== 'undefined' ? window : GLOBAL)
    $global.$locutus = $global.$locutus || {}
    var $locutus = $global.$locutus
    $locutus.php = $locutus.php || {}

    if (typeof (search) === 'object' && typeof (replace) === 'string') {
      temp = replace
      replace = []
      for (i = 0; i < search.length; i += 1) {
        replace[i] = temp
      }
      temp = ''
      r = [].concat(replace)
      ra = Object.prototype.toString.call(r) === '[object Array]'
    }

    if (typeof countObj !== 'undefined') {
      countObj.value = 0
    }

    for (i = 0, sl = s.length; i < sl; i++) {
      if (s[i] === '') {
        continue
      }
      for (j = 0, fl = f.length; j < fl; j++) {
        temp = s[i] + ''
        repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0]
        s[i] = (temp).split(f[j]).join(repl)
        if (typeof countObj !== 'undefined') {
          countObj.value += ((temp.split(f[j])).length - 1)
        }
      }
    }

    return sa ? s : s[0]
  }




    

//--->PHP Functions - End



//--->JS Functions - Start

  js.AjaxCall = function (AjaxCallURL,DataString,CallType,Callback)
  {  
    return jQuery.ajax(
    {
      type: "POST",
      url: AjaxCallURL,
      data: DataString,
      dataType: CallType
    });
  }
 
  js.AutoCode = function (n)
  {
      if(!n)
      {
          n = 5;
      }
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for(var i=0; i < n; i++)
      {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
  }
   

  js.ChangePageTitle =  function (strNewPageTitle)
  {  
    //This will change the title of the page dynamically
    var stTitle = jQuery(document).attr("title", strNewPageTitle); 
  }

  js.GetDateTime = function (value,DateFormatType) 
  { 
      var data = '';
      var d;
      if(value === '')
      {
        d = new Date(); 
      }
      else
      {
       d = new Date(value); 
      }

      var s = function(p)
      {
          return (''+p).length<2?'0'+p:''+p;
      }; 
      
      if(DateFormatType =='server')
      {  
        data = d.getFullYear() + '-'+ s(d.getMonth()+1) + '-' +s(d.getDate());
        
      }
       if(DateFormatType =='dt')
      { 
        data = s(d.getMonth()+1) + '-' +s(d.getDate()) + '-' +d.getFullYear();
        
      }
      if(DateFormatType =='dttm')
      {   
        data = s(d.getMonth()+1) + '-' +s(d.getDate()) + '-' +d.getFullYear() + ' ' + s(d.getHours()) + ':' + s(d.getMinutes()) + ':' +  s(d.getSeconds());
      } 
      
      return data; 
  }

  js.GetFutureDate =  function (DaysIntoFuture,DateFormatType)
  {
    if(!DateFormatType)
    {
      DateFormatType = 'dt';
    }

    var s = function(p)
    {
       return (''+p).length<2?'0'+p:''+p;
    };
      
    var n=DaysIntoFuture; //number of days to add. 
    var today=new Date(); //Today's Date
    if(!DaysIntoFuture)
    {
      var d = new Date(); 
    }
    if(DaysIntoFuture)
    {
      var d = new Date(today.getFullYear(),today.getMonth(),today.getDate()+n);
    }
    
    if(DateFormatType =='server')
    {
      data = d.getFullYear() + '-'+ s(d.getMonth()+1) + '-' +s(d.getDate());
      
    }
     if(DateFormatType =='dt')
    {
      data = s(d.getMonth()+1) + '-' +s(d.getDate()) + '-' +d.getFullYear();
    }
   
    return data;
  }

  js.CharCount = function (ElementID,TotalCharsAllowed)
  {
    //Total characters allowed in textarea
    var totalChars    = TotalCharsAllowed; 
    // Textarea input box
    var countTextBox  = ElementID 
    var counterid = 'countchars'+$.js.AutoCode();
    //Add after box
    countTextBox.after('<br><span name="countchars" id="'+counterid+'">0</span> Characters Remaining.');

    // Remaining chars count will be displayed here
    var charsCountEl  = jQuery('#'+counterid); 
    //initial value of countchars element
    charsCountEl.text(totalChars); 
    countTextBox.keyup(function() 
    { 
      //user releases a key on the keyboard

       //get chars count in textarea
      var thisChars = this.value.replace(/{.*}/g, '').length;
    
      //if we have more chars than it should be
      if(thisChars > totalChars) 
      {
        // total extra chars to delete
        var CharsToDel = (thisChars-totalChars); 
        //remove excess chars from textarea
        this.value = this.value.substring(0,this.value.length-CharsToDel); 
      }
      else
      {
         //count remaining chars
        charsCountEl.text( totalChars - thisChars );
        //$('#percent').text(value +'%');
      }
    });
  }

  js.IsOnline = function () 
  {
    var Connect  = navigator.onLine ? 'online' : 'offline';
    return Connect; 
  }

  js.GetDirPath = function () 
  {
    //Will get the path to dir level not file.
    //i.e. http://codewithmark.com/download/123.mp3 
    //will return http://codewithmark.com/download/
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
  }

  js.GetSiteURL = function ()
  {
    var URL = location.protocol + '//' + location.host+ '/'; 
    return URL; 
  }

  js.MilliSec = function()
  {
  	//Returns a DOMHighResTimeStamp representing the amount of milliseconds elapsed since a reference instant.
  	return performance.now();
  }

  js.CapitalizeFirstLetter = function (str) 
  {
    //   example 1: ucwords('kevin van  zonneveld');
    //   returns 1: 'Kevin Van  Zonneveld'
    //   example 2: ucwords('HELLO WORLD');
    //   returns 2: 'HELLO WORLD'

    return (str + '')
      .replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function($1) {
        return $1.toUpperCase();
      });
  }

  js.SEO = function (TurnOffCheck) 
  {

    if(TurnOffCheck)
    {
      return false;
    }

    //--->Hide dl link info - Start
    jQuery("a").mouseover(function()
    {
      var LocSite = location.hostname;
      var HrefLinkSite = this.hostname;
       var GetDLLink = jQuery(this).attr('data-dl-link');
      if(GetDLLink) 
      {         
        jQuery(this).attr("href",js.AutoCode(5) );
      }        
    });
    //--->Hide dl link info - End

    //--->Add awesome font download icon - Start
    var DLExt = ["zip", "rar", "mp3","mpe" ,"pdf", "docx", "pptx", "xlsx"];

    jQuery("a").filter(function() 
    {
        var FollowCheck = jQuery(this).attr('follow');      
        var LocSite = location.hostname;
        var HrefLinkSite = this.hostname;

        if(LocSite != HrefLinkSite)
        { 
          var href = jQuery(this).attr('href');

          var GetFileExt = href.split('.').pop().toLowerCase();

          //Regular external link
          if(jQuery.inArray(GetFileExt, DLExt) == -1) 
          { 
            if(FollowCheck !='yes')
            {
              //See if it has bootstrap button class
              var BtnClass = jQuery(this).hasClass('btn');

              //Awsome Font Class
              var FaClass = jQuery(this).hasClass('fa');

              if(BtnClass || FaClass)
              {
                jQuery(this).attr(
                {
                  target: '_blank',
                  rel: 'nofollow'
                });
              }
              else
              {
                jQuery(this).after(' <i class="fa fa-external-link" style="font-size:10px; Position:relative; top: -5px;"></i>').attr(
                {
                  target: '_blank',
                  rel: 'nofollow'
                });
              }

            }
            else if(FollowCheck =='yes')
            {
              jQuery(this).after(' <i class="fa fa-external-link" style="font-size:10px; Position:relative; top: -5px;"></i>').attr(
                {
                target: '_blank'                  
                });
            }
          }
          //Download file ext
          else if(jQuery.inArray(GetFileExt, DLExt) != -1) 
          {  
            //$j(this).after(' <i class="fa fa-download " style="font-size:20px; Position:relative; top: -2px;"></i> ')
            jQuery(this).attr(
            {
                  href:"mkdl",
                  download: "download",
                  MKAwesomeThemeTooltip :'MKAwesomeThemeTooltip',
              });
              jQuery(this).attr('data-dl-link', href);
          }  
        }
    });
    //--->Add awesome font download icon - Start


  }






//--->JS Functions - End





//--->LocalStorage Functions - Start

  /*
  	If you are coming from the database world, then this will help you better understand
    LookUpIndexKey = table name
    ArrVal = columns with row data
  */

  ls.Add = function (LookUpIndexKey,ArrVal) 
  { 
    var Data = localStorage.setItem(LookUpIndexKey,JSON.stringify(ArrVal));
    return Data;
  }

  ls.Get = function(LookUpIndexKey,FieldName,WhereValueEquals)
  { 
    var RowData = JSON.parse( localStorage.getItem(LookUpIndexKey) );
    var Result = [];
    
    for (var row = 0; row < RowData.length; row++) 
    { 
      var GetRow =RowData[row];
      
      if(GetRow[FieldName] == WhereValueEquals)
      {
        //console.log(GetRow);
        Result.push(RowData[row]);
      }
    }
    var TotalRec = Result.length ; 
    
    if(!TotalRec)
    {
      return {Status:"Error",TotalRows:0, }
    }
    else if(TotalRec == 1)
    {
      return {Status:"Success",TotalRows:1, RecData:GetRow}
    }
    else if(TotalRec >1)
    {
    	return {Status:"Success",TotalRows:Result.length, RecData:Result}
    }
  }

  ls.GetAll = function (LookUpIndexKey) 
  { 
  	var RowData = JSON.parse( localStorage.getItem(LookUpIndexKey) );	
  	var TotalRec = RowData.length ; 
    
    if(!TotalRec)
    {
      return {Status:"Error",TotalRows:0, }
    } 
    else if(TotalRec >1)
    {
    	return {Status:"Success",TotalRows:TotalRec, RecData:RowData}
    }
   
  }

  ls.Count = function (LookUpIndexKey) 
  { 
  	var RowData = JSON.parse( localStorage.getItem(LookUpIndexKey) );
  	return RowData.length;
  }

  ls.Empty = function (LookUpIndexKey) 
  { 
  	localStorage.setItem(LookUpIndexKey,'');
  }


  ls.Delete = function (LookUpIndexKey) 
  { 
  	localStorage.removeItem(LookUpIndexKey);
  }

 
//--->LocalStorage Functions - End



//--->Bootstrap Functions - Start

  bs.ShowError = function (errorText,ElementObjID) 
  {
    
    ElementObjID.after('<div id="derr" class="derr alert alert-danger fa fa-exclamation-triangle form-control" style="padding:5px;font-size:14px"  > '+ errorText+'</div>');
    ElementObjID.css( "background-color", "yellow");
    ElementObjID.focus();
  }

  bs.ClearError = function ()
  {
    $( ".derr" ).prevAll().css( "background-color", "");    
    $(".derr").remove();

    //In case if remove (above) doesn't work
    $(".derr").hide();
  }

  bs.WaitingMsg = function (MsgData)
  {
    var strDIV  = '';
    strDIV  +=  '<div id="MsgBox" id="derr" class="derr bg-info alert alert-info derr" style="font-size: 40px;padding:10px;">';
    strDIV  +=  '<i class="fa fa-refresh fa-spin "></i> '+MsgData+' ';
    strDIV  +=  '</div>';
    return strDIV;
  }

  bs.AlertMsg = function (MsgData,AlertType)
  { 
    //There are 4 types of alerts: success, info, warning and danger

    var Type = AlertType.toLowerCase(); 
    var TypeAlert; 
    if(Type == 'success')
    {
      TypeAlert = 'alert-success';
    }
    if(Type == 'error')
    {
      TypeAlert = 'alert-danger';
    }
    if(Type == 'info')
    {
      TypeAlert = 'alert-info';
    }
    if(Type == 'warning')
    {
      TypeAlert = 'alert-warning';
    } 
    var strDIV  = '';
    strDIV += '<div class="derr alert '+TypeAlert+'"  >'; 
    strDIV += '<div   style="padding:5px;font-size:16px">';
    strDIV += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';    
    strDIV += MsgData; 
    strDIV  +=  '</div>'; 
    strDIV  +=  '</div>';
    return strDIV;
  }

  bs.CheckingMsg = function (ElementObjID,MsgData)
  {
    var AlertDIV= '<div id="derr" class="derr alert alert-warning" role="alert"> <i class="fa fa-spinner fa-spin"></i> '+MsgData+'</div>';
    ElementObjID.after(AlertDIV); 
  }

  bs.CreateButton = function (ButtonText,ID,Class,Addon)
  {
    var template = '';
    template += '<button type="button" id="'+ID+'" name="'+ID+'"  class="btn '+Class+'" Addon>';
    template += ' '+ButtonText
    template += ' </button>';  
    return template;
  }

  
  //--->Input Field Functions - Start

  bs.CreateInputField = function (Value,ID,Class,Addon)
  {
    var template = '';
    template = '<div class="form-group form-inline">';
    template += '<input type="text"  id="'+ID+'"name='+ID+' class="form-control '+Class+'" '+Addon+' value="'+Value+'">';
    template += '</div>';
    return template;
  }

  bs.CreateHiddenInputField = function (Value,ID,Class,Addon)
  {
    var template = '';
    template = '<div class="form-group" style="display:none;">';
    template += '<input type="text"  id="'+ID+'"name='+ID+' class="form-control '+Class+'" '+Addon+' value="'+Value+'">';
    template += '</div>';
    return template;
  }
  
  bs.CreateCustomInputField = function (FieldType,Value,ID,Class,Addon)
  {
    /*
      There are 12 different kind of field type: 
      color,email,number,search,time,week,date,dateime-local,month,rage,tel,url
    */
    var template = '';
    template = '<div class="form-group form-inline">';
    template += '<input type="'+FieldType+'"  id="'+ID+'"name='+ID+' class="form-control '+Class+'" '+Addon+' value="'+Value+'">';
    template += '</div>';
    return template;
  }

  bs.CreateGroupInputField = function (GroupValue,Value,ID,Class,Addon)
  {
    var template = '';
    template += '<form class="form-group form-inline">'
    template += '<div class="input-group">';
    template += '<div class="input-group-addon">'+GroupValue+'</div>';    
    template += '<input type="text"  id="'+ID+'"name='+ID+' class="form-control '+Class+'" '+Addon+' value="'+Value+'">';
    template += '</div>';
    template += '</form>';
    return template;
  }
 

  bs.CreateCustomGroupInputField = function (FieldType,GroupValue,Value,ID,Class,Addon)
  {
    /*
      There are 12 different kind of field type: 
      color,email,number,search,time,week,date,dateime-local,month,rage,tel,url
    */
    var template = '';
    template += '<form class="form-group form-inline">'
    template += '<div class="input-group">';
    template += '<div class="input-group-addon">'+GroupValue+'</div>';    
    template += '<input type="'+FieldType+'"  id="'+ID+'"name='+ID+' class="form-control '+Class+'" '+Addon+' value="'+Value+'">';
    template += '</div>';
    template += '</form>';
    return template;
  }

  //--->Input Field Functions - End
 



  //--->Text Box Functions - Start

  bs.CreateTextBox = function (Value,ID,Class,Addon)
  {
    var template = ' ';
    template += '<div class="form-group form-inline"  >';
    template += '<textarea name="'+ID+'" id="'+ID+'" class="form-control  '+Class+'"  '+Addon+' >'+Value+'</textarea>';
    template += '</div>';  
    return template;    
  }

  bs.CreateHiddenTextBox = function (Value,ID,Class,Addon)
  {
    var template = ' ';
    template += '<div class="form-group" style="display:none;"  >';
    template += '<textarea name="'+ID+'" id="'+ID+'" class="form-control  '+Class+'"  '+Addon+' >'+Value+'</textarea>';
    template += '</div>';  
    return template;    
  }

  bs.CreateGroupTextBox  = function (GroupValue,Value,ID,Class,Addon)
  {
    var template = '';
    template += '<form class="form-group form-inline">'
    template += '<div class="input-group">';
    template += '<div class="input-group-addon">'+GroupValue+'</div>';    
    template += '<textarea name="'+ID+'" id="'+ID+'" class="form-control  '+Class+'"  '+Addon+' >'+Value+'</textarea>';
    template += '</div>';
    template += '</form>';
    return template;
  }

  //--->Text Box Functions - Start


 bs.CreateDropDown  =  function (LabelText,Options, ID,Value,Addon)
  {
    var template = '<div class="form-group">';
        template += '<label>'+LabelText+'</label></br>'
        template += '<select class="form-control" name='+ID+' id='+ID+' Addon> ';

    if(Value != '')
    {
      template += '<option value="'+Value+'">'+Value+'</option> ';
      template += '<option value="none">Please Select One</option> ';
    }
    else
    {
      template += '<option value="none">Please Select One</option> ';
    }

    var strOptions = Options.split(',');
    var TotalRec = strOptions.length;
    for (var i = 0; i <TotalRec; i++) 
    {
      //undefined
      var Val = strOptions[i];
      if(Val !== undefined ||  Val !== "undefined")
      {
        template += '<option value="'+Val+'">'+Val+'</option> ';
      }
    }            

    template += '</select>';
    template += '</div>';   
    return template;
  }


//--->Bootstrap Functions - End





//--->Form Functions - Start

  frm.IsEmpty = function(value)
  {
    if(value != '')
    {
      return value;
    }
  }

  frm.IsAlphaNumeric = function (value) 
  {
    var regexp  = /^[0-9a-zA-Z]+$/;
    return regexp.test(value);
  }

  frm.IsNoSpaces = function (value) 
  {
    var regexp  = /^\S+$/i;
    return regexp.test(value);
  }
 

  frm.IsEmail = function (value) 
  {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(value);
  }

  frm.IsURL = function (value) 
  {
      var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
      return regexp.test(value);
  }

  frm.IsNumber = function(value)
  {
    var regexp = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
    return regexp.test(value);
  }

  frm.IsBetweenNumber = function(value,Len)
  {
    var Val = $.trim(value);
    var Range = Len.split(',');

    console.log(Range);

    if(Val >= Range[0] && Val <= Range[1])
    {
      return Val;
    }
  }


  frm.IsLength = function(value,Len)
  {
    var Val = $.trim(value);

    if(Len == Val.length)
    {
      return Val;
    }
  }

  frm.IsMinLength = function(value,Len)
  {
    var Val = $.trim(value);

    if(Len >= Val.length)
    {
      return Val;
    }
  }

  frm.IsMaxLength = function(value,Len)
  {
    var Val = $.trim(value);

    if(Len <= Val.length)
    {
      return Val;
    }
  }
 

  frm.IsRangeLength = function(value,Len)
  {
    var Val = $.trim(value);
    var Range = Len.split(',');

    if(Val.length >= Range[0] && Val.length <= Range[1])
    {
      return Val;
    }
  }

  frm.IsEqualTo = function(value,equalTo)
  {   
    if(value ==equalTo)
    {
      return value;
    }
  } 
//--->Form Functions - End
