/*
 * Library Name: Awesome Functions
 * Original Author: Mark Kumar
 * Site: http://CodeWithMark.com
 * Licensed under the MIT license
 */
  
;(function ( $, window, document, undefined ) 
{
  //Function initiator 
  $.api = function(){};
  $.js = function(){};
  $.php = function(){};
  //For Local Storage Functions
  $.ls =function(){};
 

  $.api.UserLoc = function(UserElementObj) 
  {
    var LocDataArr = [];
   
    //Make the api call
    $.getJSON("//apimk.com/ip?callback=json", function(data, status)
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
  $.api.IsMobile = function(UserElementObj) 
  {
    var LocDataArr = [];
    //Make the api call
    $.getJSON("//apimk.com/ismobile?callback=json", function(data, status)
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


  //--->UniqueID Function - Start
  $.api.UniqueID = function(UserElementObj) 
  {
    var LocDataArr = [];
   
    //Make the api call
    $.getJSON("//apimk.com/uniqueid?callback=json", function(data, status)
    {   
      //Add user loc data to div      
      UserElementObj.append('<div class="UniqueIDStatus">'+data['Status'] +'</div>');
      UserElementObj.append('<div class="UniqueID">'+data['ID'] +'</div>');
      
      //Wrap it in an array in case you want to customize this to your liking
      LocDataArr.push(
      { 
        'status':data['status'],
        'UniqueID':data['ID'], 
      } 
      ); 
    });
  }; 
  //--->UniqueID Function - End

    
    
    
//--->API Call Functions - End  
    
    
    

    
//--->PHP Functions - Start
  
   
  //--->Microtime Function - Start
  $.php.Microtime = function(getAsFloat) 
  {
    return Microtime (getAsFloat) ;
  }; 
  function Microtime (getAsFloat) 
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
  $.php.UniqueID = function() 
  {
    return UniqueID();
  }; 
  function UniqueID (prefix, more_entropy) 
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
    
    

//--->PHP Functions - End



//--->JS Functions - Start

$.js.AjaxCall = function (AjaxCallURL,DataString,CallType,Callback)
{  
  return $.ajax(
  {
    type: "POST",
    url: AjaxCallURL,
    data: DataString,
    dataType: CallType
  });
}
 
$.js.AutoCode = function (n)
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
 

$.js.ChangePageTitle =  function (strNewPageTitle)
{  
  //This will change the title of the page dynamically
  var stTitle = $(document).attr("title", strNewPageTitle); 
}

$.js.GetDateTime = function (value,DateFormatType) 
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

$.js.GetFutureDate =  function (DaysIntoFuture,DateFormatType)
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

$.js.CharCount = function (ElementID,TotalCharsAllowed)
{
  //Total characters allowed in textarea
  var totalChars    = TotalCharsAllowed; 
  // Textarea input box
  var countTextBox  = ElementID 
  var counterid = 'countchars'+$.js.AutoCode();
  //Add after box
  countTextBox.after('<br><span name="countchars" id="'+counterid+'">0</span> Characters Remaining.');

  // Remaining chars count will be displayed here
  var charsCountEl  = $('#'+counterid); 
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

$.js.IsOnline = function () 
{
  var Connect  = navigator.onLine ? 'online' : 'offline';
  return Connect; 
}

$.js.GetDirPath = function () 
{
  //Will get the path to dir level not file.
  //i.e. http://codewithmark.com/download/123.mp3 
  //will return http://codewithmark.com/download/
  var loc = window.location;
  var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
  return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}

$.js.GetSiteURL = function ()
{
  var URL = location.protocol + '//' + location.host+ '/'; 
  return URL; 
}

$.js.MilliSec = function()
{
	//Returns a DOMHighResTimeStamp representing the amount of milliseconds elapsed since a reference instant.
	return performance.now();
}

//--->JS Functions - End





//--->LocalStorage - Start

/*
	If you are coming from the database world, then this will help you better understand
  LookUpIndexKey = table name
  ArrVal = columns with row data
*/

$.ls.Add = function (LookUpIndexKey,ArrVal) 
{ 
  var Data = localStorage.setItem(LookUpIndexKey,JSON.stringify(ArrVal));
  return Data;
}

$.ls.Get = function(LookUpIndexKey,FieldName,WhereValueEquals)
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

$.ls.GetAll = function (LookUpIndexKey) 
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

$.ls.Count = function (LookUpIndexKey) 
{ 
	var RowData = JSON.parse( localStorage.getItem(LookUpIndexKey) );
	return RowData.length;
}

$.ls.Empty = function (LookUpIndexKey) 
{ 
	localStorage.setItem(LookUpIndexKey,'');
}


$.ls.Delete = function (LookUpIndexKey) 
{ 
	localStorage.removeItem(LookUpIndexKey);
}

 
//--->LocalStorage - End




    
    

//--->Loadt Time Function - Start
$.jsPageLoadTime = function() 
{
	$(document).on("pageload",function()
	{
	  // Get current time.
	  var CurTime = new Date().getTime();
	  // Calculate page load time.
	  var LoadTime = CurTime - performance.timing.navigationStart;

	  return LoadTime;
	}); 
}; 
//--->Loadt Time Function - End


  
 
}( jQuery, window, document));