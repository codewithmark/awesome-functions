/*
 * Library Name: Awesome Functions
 * Version Number: 1.16.9.8
 * Original Author: Mark Kumar
 * Documentation: http://awesomefunctions.com
 * Licensed under the MIT license
 */

  //Function initiator 
  api = function(){};  
  php = function(){};  
  js = function(){};

  //For Cookies
  c =function(){}; 

  //For Local Storage Functions
  ls = function(){};

  //For Bootstrap Functions
  bs =function(){}; 

  //For login form
  frm =function(){}; 
 

//--->API Call Functions - Start
	
	

  //--->User Location Info Function - Start
  api.UserLoc = function(callback) 
  {
    var deferred = new jQuery.Deferred(); 
    if (jQuery.isFunction(callback)) 
    {
      deferred.then(callback);
    }
		//Make the api call
		jQuery.getJSON("https://apimk.com/ip?callback=json", function(data, status)
		{   
			//Wrap it in an array object 
			var DataArr = { 
				'LocStatus':data.status,
				'LocIP':data.ip,
				'LocCity':data.city,
				'LocState':data.state,
				'LocCountry':data.country,
				'LocZip':data.zip,
				'LocLat':data.lat,
				'LocLong':data.lon,
				'LocTimeZone':data.timezone,
			}

			//Set it for cookie
			//c.AddObjArr('UserLocInfo',DataArr)

			//Set it for local storage
			//ls.AddObj("UserLocInfo",DataArr);
			deferred.resolve(DataArr);
		});
		
    return deferred.promise();
  };

  //--->User Location Info Function - End
  
  //--->User Device Access Function - Start
  api.IsMobile = function(callback)   
  {
    var deferred = new jQuery.Deferred(); 
    if (jQuery.isFunction(callback)) 
    {
      deferred.then(callback);
    }
		//Make the api call
		jQuery.getJSON("https://apimk.com/ismobile?callback=json", function(data, status)
		{  
			//Wrap it in an array in case you want to customize this to your liking
			var DataArr =
			{ 
				'Status':data.Status,
				'Mobile':data.Mobile,
				'Browser':data.Browser,
				'BrowserVersionNum':data.BrowserVersionNum,
				'Platform':data.Platform, 
			}  

			//Set it for cookie
			//c.AddObjArr('UserMobileInfo',DataArr)        

			deferred.resolve(DataArr);

		}); 
    return deferred.promise();
  }; 

  //--->User Device Access Function - End  

	
	//--->Short URL Function - Start
  api.ShortURL = function(UserURL,ServiceCall,callback)   
  {
		var deferred = new jQuery.Deferred(); 
    if (jQuery.isFunction(callback)) 
    {
      deferred.then(callback);
    }
		
		var url;
		if(ServiceCall !='')
		{
			var strServiceCall = ServiceCall.toLowerCase();
			
			if (strServiceCall =='bitly'|| strServiceCall =='tinyurl')
			{
				url = "https://apimk.com/shorturl?";
				url +="callback=json";  
				url += "&service_name="+strServiceCall;
				url += "&url="+encodeURIComponent(UserURL);
			}
			else
			{
				url = "https://apimk.com/shorturl?";
				url +="callback=json";  
				url += "&service_name=bitly";
				url += "&url="+encodeURIComponent(UserURL);
			}
		}
		else
		{
			url = "https://apimk.com/shorturl?";
			url +="callback=json";  
			//url += "&service_name=bitly";
			url += "&url="+encodeURIComponent(UserURL);
		}
		
		
		
		//Make the api call	 
		jQuery.getJSON(url, function(data, status)
		{
			deferred.resolve(data);
		}); 
    return deferred.promise();
		
	};
 	//--->Short URL Function - End  
    
//--->API Call Functions - End  
  
//--->Storage Functions - End 

  //--->Cookie Functions - Start
  c.Add = function (cname, cvalue, exdays) 
  {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  c.Get = function (cname) 
  {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) 
    {
      var c = ca[i];
      while (c.charAt(0)==' ') 
      {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) 
      {
        return c.substring(name.length,c.length);
      }
    }
    return "";
  }

  c.AddObjArr = function (cname, cvalue, exdays) 
  {
    var d = new Date();    
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    var ObjArrVal = JSON.stringify(cvalue); 

    document.cookie = cname + "=" + ObjArrVal + "; " + expires;
  }

  c.GetObjArr = function (cname) 
  {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) 
    {
      var c = ca[i];
      while (c.charAt(0)==' ') 
      {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) 
      {
        var val = c.substring(name.length,c.length); 
        return JSON.parse(val) ;
      }
    }
    return "";
  }

  c.Delete = function(name) 
  {
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };
  //--->Cookie Functions - End




  //--->LocalStorage Functions - Start

  ls.Exist = function (LookUpIndexKey) 
  { 
    var Data = localStorage.getItem(LookUpIndexKey);
    if(Data && Data !="")
    {
      return Data;
    }
  }
  
  ls.Delete = function (LookUpIndexKey) 
  { 
    localStorage.removeItem(LookUpIndexKey);
  }

  ls.Empty = function (LookUpIndexKey) 
  { 
    localStorage.setItem(LookUpIndexKey,'');
  }


  //--->Store single value - Start
  ls.Add = function (LookUpIndexKey,Val) 
  { 
    localStorage.setItem(LookUpIndexKey,Val); 
  }

  ls.Get = function (LookUpIndexKey) 
  { 
    var Data = localStorage.getItem(LookUpIndexKey);
    if(Data && Data !="")
    {
      return Data;
    }    
  }
  //--->Store single value - End

  /*
    If you are coming from the database world, then this will help you better understand
    LookUpIndexKey = table name
    AddObj/ArrVal = column(s) with row data
  */

  //--->Store single row - Start
  
  ls.AddObj= function (LookUpIndexKey,ObjVal) 
  { 
    //Check to see if there is already data in the IndexedKey/Table
    var OldRowData =  JSON.parse( localStorage.getItem(LookUpIndexKey) ) 
    
    if(!OldRowData)
    {
      //Add new data
     localStorage.setItem(LookUpIndexKey,JSON.stringify(ObjVal) );
    } 
    else if(OldRowData)
    {
      var NewData = jQuery.extend(ObjVal, OldRowData);
      localStorage.setItem(LookUpIndexKey,JSON.stringify(NewData) ); 
    }
  } 

  ls.GetObj = function (LookUpIndexKey) 
  { 
    var Data = JSON.parse( localStorage.getItem(LookUpIndexKey) );
    return Data;
  }
  //--->Store single row - End




  //--->Store multiple rows - Start
  
  ls.AddArr = function (LookUpIndexKey,ArrVal) 
  { 
    var UserArr = [ArrVal];
    //Check to see if there is already data in the IndexedKey/Table
    var OldRowData = JSON.parse( localStorage.getItem(LookUpIndexKey) ); 
    
    if(!OldRowData)
    {
      //Add new data
     localStorage.setItem(LookUpIndexKey,JSON.stringify(UserArr));
    } 
    else if(OldRowData.length >0)
    {      
      //Append data to old 
      var NewData = jQuery.merge(UserArr, OldRowData);
      
      localStorage.setItem(LookUpIndexKey,JSON.stringify(NewData));    
    }
  }
  
  ls.AddBulkArr = function (LookUpIndexKey,ArrVal) 
  { 
    var UserArr = ArrVal;
    //Check to see if there is already data in the IndexedKey/Table
    var OldRowData = JSON.parse( localStorage.getItem(LookUpIndexKey) ); 
    
    if(!OldRowData)
    {
      //Add new data
     localStorage.setItem(LookUpIndexKey,JSON.stringify(UserArr));
    } 
    else if(OldRowData.length >0)
    {      
      //Append data to old 
      var NewData = jQuery.merge(UserArr, OldRowData);
      
      localStorage.setItem(LookUpIndexKey,JSON.stringify(NewData));    
    }
  }
  
  ls.CountArr = function (LookUpIndexKey) 
  { 
    var RowData = JSON.parse( localStorage.getItem(LookUpIndexKey) );
    return RowData.length;
  }

  ls.GetAllArr = function (LookUpIndexKey,callback) 
  { 
    var RowData = JSON.parse( localStorage.getItem(LookUpIndexKey) ); 
    
    if(!RowData)
    {
      callback( {Status:"Error",TotalRows:0 });
    } 
    else if(RowData.length >0)
    {   

      callback( {Status:"Success",TotalRows:RowData.length, RecData:RowData});
    } 
  } 

  ls.GetArr = function(LookUpIndexKey,FieldName,WhereValueEquals,callback)
  { 
    var RowData = JSON.parse( localStorage.getItem(LookUpIndexKey) );
    var Result = [];
    
    for (var row = 0; row < RowData.length; row++) 
    { 
      var GetRow = RowData[row];
      
      if(GetRow[FieldName] == WhereValueEquals)
      {
        Result.push(RowData[row]);
      }
    } 
    
    if(!Result.length)
    {
      callback( {Status:"Error",TotalRows:0 } );
    }
    else if(Result.length == 1)
    {
      callback( {Status:"Success",TotalRows:1, RecData:Result} );
    }
    else if(Result.length >0)
    {
      callback( {Status:"Success",TotalRows:Result.length, RecData:Result} );
    }
  }

  ls.DeleteArr = function(LookUpIndexKey,FieldName,WhereValueEquals)
  { 
    var RowData = JSON.parse( localStorage.getItem(LookUpIndexKey) );
    //var RowData = [RowData1]
    var ArrVal = [];
    
    for (var row = 0; row < RowData.length; row++) 
    { 
      var GetRow = RowData[row];
      
      if(GetRow[FieldName] != WhereValueEquals)
      {
        console.log(GetRow);
        ArrVal.push(RowData[row]);
      }
    }
    //Delete old array value
    ls.Delete(LookUpIndexKey);

    ls.AddBulkArr (LookUpIndexKey,ArrVal) 

  }
 
  ls.UpdateArrVal = function(LookUpIndexKey,FieldObjArrToUpdatValue,WhereObjArr) 
  {
    var NewObjRowData = JSON.parse( localStorage.getItem(LookUpIndexKey) );
     
    var OldObjRowData = JSON.parse( localStorage.getItem(LookUpIndexKey) );

    var LastVal;
      var NewObjArr = [];
      var OldObjArr = [];

      //--->Update the lookup value - Start
      jQuery.each(NewObjRowData, function(index, val) 
      {
        jQuery.each(WhereObjArr, function(WhereObj, WhereVal) 
        {
           if (val[WhereObj] == WhereVal ) 
           { 
             

            jQuery.each(FieldObjArrToUpdatValue, function(UpdatObj, UpdatVal) 
            { 
              delete(UpdatObj) 

              val[UpdatObj] = UpdatVal
             
              LastVal = val;   

            })  
            NewObjArr.push(LastVal) 

           }  
        }) 
        console.log(NewObjArr ) 
      }); 
      //--->Update the lookup value - End

      //Delete old array value
      ls.Delete(LookUpIndexKey);

      //ls.AddArr (LookUpIndexKey,NewObjArr);

      //--->Get non updated values - Start
      jQuery.each(OldObjRowData, function(index, val) 
      {
        jQuery.each(WhereObjArr, function(WhereObj, WhereVal) 
        {
           if (val[WhereObj] != WhereVal ) 
           {
            OldObjArr.push(val)
           } 
        }) 

      }); 
      //--->Get non updated values - End

      var NewDataArr = jQuery.merge(NewObjArr, OldObjArr);
      ls.AddBulkArr (LookUpIndexKey,NewDataArr);
  } 
  //--->LocalStorage Functions - End

//--->Storage Functions - End
 
    
  
    
    
    

    
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
    //   example 1: str_replace(' ', '.', 'Code With Mark')
    //   returns 1: 'Code.With.Mark'
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

  js.Template = function(ObjArr,strContent) 
  {
    /*
      var ObjArr ={"{ClassName}":"MkClass2", "{UserName}":"Code With Mark", "{Test}":"Awesome Funtions"};
      var strContent = <div class="MKClass">
                        <div class=" {ClassName}"> Hello my name is : {UserName} and I like {Test}</div>
                      </div>
      var c = js.Template (ObjArr, strContent ) ;

      will return:

    <div class="MKClass">
      <div class=" MkClass2"> Hello my name is : Code With Mark and I like Awesome Funtions</div>
    </div>

    */    
    var Arr1 = [] ;
    var Arr2 = [] ;
    
    jQuery.each(ObjArr, function(search, replace) 
    {
      Arr1.push(search);
      Arr2.push(replace);
    });
    return php.str_replace(Arr1, Arr2, strContent) ; 
  }
 
	
	js.Int = function(StringVal)
	{
		return parseInt(StringVal);
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

  js.FormatDateTime = function (value,FormatType) 
  {
    
    var d = value != '' ? new Date(value) : new Date();
    var data = FormatType !='' ? moment(d).format(FormatType)  : moment(d).toDate() ;
    return data; 
  }

   
  js.GetFutureDate =  function (DaysIntoFuture,FormatType)
  {
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
    
    var data = FormatType !='' ? moment(d).format(FormatType)  : moment(d).toDate() ;
    return data; 

  }

  js.CharCount = function (ElementID,TotalCharsAllowed)
  {
    //Total characters allowed in textarea
    var totalChars    = TotalCharsAllowed; 
    // Textarea input box
    var countTextBox  = ElementID 
    var counterid = 'countchars'+js.AutoCode();
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
        //jQuery('#percent').text(value +'%');
      }
    });
  }

  js.IsOnline = function () 
  {
    var Connect  = navigator.onLine ? 'online' : 'offline';
    return Connect; 
  }

  js.GetFolderPath = function () 
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
    // example : CapitalizeFirstLetter('code with mark);
    // returns : 'Code With Mark'
  
    return (str + '')
      .replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function($1) {
        return $1.toUpperCase();
      });
  }
	
	js.DLExt = function (ExtArr)
	{
		var DLExt;
		if(!ExtArr)
		{
			DLExt = ["zip", "rar", "mp3","mp4" ,"pdf", "docx", "pptx", "xlsx", "js","css"];	
		}	
		else if(ExtArr)
		{
			DLExt = ExtArr; 
		}
		
		return DLExt;
	}

	js.IsHrefExternal = function(HrefLinkSite)
	{
		var LocSite = location.hostname;
		if(LocSite != HrefLinkSite)
		{ 
			//console.log('external link');
			//External link			
			return 'yes';
		}
	}
	
	js.GetFileName = function(FileURL)
	{
		var GetFileName = FileURL.substring( FileURL.lastIndexOf('/')+1 );
		var RemoveFileExt = GetFileName.split('.')[0];
		return RemoveFileExt;
	}
	
	js.GetFileExt = function(FileURL)
	{
		return FileURL.split('.').pop().toLowerCase();
	}
	
	
	
	js.URL = function(LookUpType)
	{
		var LookUp = LookUpType.toLowerCase();
		
		if(LookUp == 'host')
		{
			return location.host;
		}		
		else if(LookUp == 'hostname')
		{
			return location.hostname;
		}
		else if(LookUp == 'path')
		{
			return location.path;
		}
		else if(LookUp == 'href')
		{
			//returns full current url
			return location.href;
		}
		else if(LookUp == 'hash')
		{
			//returns the port
			return location.hash;
		}
 
	}

  js.SEO = function (TurnOffCheck) 
  { 
    if(TurnOffCheck)
    {
      return false;
    }

		var DLExt = js.DLExt();
		
		//--->Add alt tag to all the images - Start
		jQuery("img").filter(function()  
    {	
			
			var img = jQuery(this);
			var FileName = img.attr('src');
			var Title = img.attr('title');
			var AltTag = img.attr('alt');
			if(!AltTag)
			{
				var GetSiteName = js.GetFileName(js.URL('hostname'));
				var GetFileName  = js.GetFileName (FileName);
				//Just for fun
				var GetFileExt = js.GetFileExt(FileName);
				var AddAltText = GetSiteName + '-'+GetFileName+'-'+js.AutoCode();
				img.attr({alt:AddAltText})
				
			}
		});
		//--->Add alt tag to all the images - End
		
		
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
    jQuery("a").filter(function()  
    {
        var FollowCheck = jQuery(this).attr('follow');      
        var LocSite = location.hostname;
        var HrefLinkSite = this.hostname;
				//console.warn('warning test');
				
				//Is external link
				if(js.IsHrefExternal(HrefLinkSite))
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

              //Awesome Font Class
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
            else if(FollowCheck == "yes")
            {
              jQuery(this).after(' <i class="fa fa-external-link" style="font-size:10px; Position:relative; top: -5px;"></i>').attr(
                {
                target: '_blank'                  
                });
            }
          }
          //Download hide link 
          else if(jQuery.inArray(GetFileExt, DLExt) != -1) 
          {  
            jQuery(this).attr({ href:"mkdl"});
            jQuery(this).attr('data-dl-link', href);
						jQuery(this).attr('download', 'download');
          }  
        }
    });
    //--->Add awesome font download icon - Start
		
		//--->Download Click Event - Start
		jQuery( document ).on( 'click', 'a', function(e) 
		{
			var d =jQuery(this).attr('data-dl-link');
			
			if(d)
			{	 
				 //e.preventDefault();  
				jQuery(this).attr({ href:d});
				//jQuery(this).attr('target', '_blank');
				
				//jQuery(this).attr('download', 'download');
				
				// window.location.href = d;	
				//this will prevent from redirecting to you url
				//return false;
			} 
		});
		//--->Download Click Event - End 
  }
	
	js.DateDiff = function (interval, date1, date2 )
	{
			var second = 1000,
			minute = second * 60,
			hour = minute * 60,
			day = hour * 24,
			week = day * 7;
			date1 = new Date(date1).getTime();
			date2 = (date2 == 'now') ? new Date().getTime() : new Date(date2).getTime();
			var timediff = date2 - date1;
			if (isNaN(timediff)) return NaN;
			switch (interval) 
			{
				case "yr":
						return date2.getFullYear() - date1.getFullYear();
				case "month":
						return ((date2.getFullYear() * 12 + date2.getMonth()) - (date1.getFullYear() * 12 + date1.getMonth()));
				case "wk":
						return Math.floor(timediff / week);
				case "day":
						return Math.floor(timediff / day);
				case "hr":
						return Math.floor(timediff / hour);
				case "min":
						return Math.floor(timediff / minute);
				case "sec":
						return Math.floor(timediff / second);
				default:
						return undefined;
			}
	}
	js.TableToJSON = function (TableElementID,callback) 
	{ 
		var ArrData = TableElementID.tableToJSON(); 
		 
		callback(ArrData);
	} 
	
	js.EnterKey = function(ElementID,callback)
	{   
		ElementID.enterKey(function (e) 
		{
			callback(e);
		})
	}	
	
	js.PrintThis = function(ElementContent)
	{   
		w=window.open();
		w.document.write(ElementContent);
		w.print();
		w.close();
	}	
 
 

//--->JS Functions - End 



//--->Bootstrap Functions - Start

  bs.ShowError = function (errorText,ElementObjID) 
  {
		var strDiv = ''; 
		strDiv += '<div class="derr">';		
		strDiv += '<div class="alert alert-danger  form-control" style="padding:5px;font-size:14px"  > <i class="fa fa-exclamation-triangle "></i>  '+ errorText+'</div>';
		strDiv += '</div>';
		
    ElementObjID.after(strDiv);
    ElementObjID.css( "background-color", "yellow");
    ElementObjID.focus();
  }

  bs.ClearError = function ()
  {
    jQuery( ".derr" ).prevAll().css( "background-color", "");   

    //In case if remove (above) doesn't work
    jQuery(".derr").hide();
    jQuery(".derr").remove();
  }

  bs.WaitingMsg = function (Msg)
  {
    var strDIV  = '';
    strDIV  +=  '<div id="MsgBox"   class="derr bg-info alert alert-info derr" style="font-size: 40px;padding:10px;">';
    strDIV  +=  '<i class="fa fa-refresh fa-spin "></i> '+Msg+' ';
    strDIV  +=  '</div>';
    return strDIV;
  }

  bs.AlertMsg = function (Msg,AlertType)
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
    strDIV += Msg; 
    strDIV  +=  '</div>'; 
    strDIV  +=  '</div>';
    return strDIV;
  }

  bs.CheckingMsg = function (ElementObjID,Msg)
  {
    var AlertDIV= '<div  class="derr alert alert-warning" role="alert"> <i class="fa fa-spinner fa-spin"></i> '+Msg+'</div>';
    ElementObjID.after(AlertDIV); 
  }

  bs.CreateButton = function (ButtonText,ID,Class,Addon)
  {
    var template = '';
    template += '<button type="button" id="'+ID+'" name="'+ID+'"  class="btn '+Class+'" '+ Addon + ' >';
    template += ' '+ButtonText
    template += ' </button>';  
    return template;
  }

  
  //--->Input Field Functions - Start

  bs.CreateInputField = function (Value,ID,Class,Addon)
  {
    var template = '';
    template = '<div class="form-group form-inline">';
    template += '<input type="text"  id="'+ID+'" name="'+ID+'" class="form-control '+Class+'" '+Addon+' value="'+Value+'">';
    template += '</div>';
    return template;
  }

  bs.CreateHiddenInputField = function (Value,ID,Class,Addon)
  {
    var template = '';
    template = '<div class="form-group" style="display:none;">';
    template += '<input type="text"  id="'+ID+'"name="'+ID+'" class="form-control '+Class+'" '+Addon+' value="'+Value+'">';
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
    template += '<input type="'+FieldType+'"  id="'+ID+'" name="'+ID+'" class="form-control '+Class+'" '+Addon+' value="'+Value+'">';
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
    template += '<input type="'+FieldType+'"  id="'+ID+'" name="'+ID+'" class="form-control '+Class+'" '+Addon+' value="'+Value+'">';
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


  bs.CreateDropDownList  =  function (LabelText,Options, Value, ID,Class,Addon)
  {
    var template = '<div class="form-group form-inline">';
        template += '<label>'+LabelText+'</label></br>'
        template += '<select class="form-control '+Class+' " name='+ID+' id='+ID+' '+Addon+'> ';

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
		var regexp  = /\S+/;
		return !regexp.test(value);
  }

  frm.IsAlphaNumeric = function (value) 
  {
    var regexp  = /^[0-9a-zA-Z]+$/;
    return !regexp.test(value);
  }

  frm.IsNoSpaces = function (value) 
  {
    var regexp  = /^\S+$/i;	 
    return !regexp.test(value);
  }

  frm.IsEmail = function (value) 
  {
    var regexp = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return !regexp.test(value);
  }

  frm.IsURL = function (value) 
  {
      var regexp = /^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i			
      return !regexp.test(value);
  }

  frm.IsNumber = function(value)
  {
    var regexp = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
    return !regexp.test(value);
  }

  frm.IsBetweenNumber = function(value,Len)
  {
    var Val =  jQuery.trim(value) ;
    var Range = Len.split(',');
		
		if(frm.IsNoSpaces(Val))
		{
			return true;
		}
		else if(frm.IsNumber(Val)  )
 		{
			return true;
		}
		else if ( !(Val >= js.Int(Range[0]))   )
		{
			return true;
		}
		else if ( !(Val <= js.Int( Range[1]) )   )
		{
			return true;
		}
		
  }

  frm.IsLength = function(value,Len)
  {
    var Val = jQuery.trim(value); 
		
		if(frm.IsNoSpaces(Val))
		{
			return true;
		}
		else if(  ( js.Int(Len) != Val.length)  )
 		{
			return true;
		}
 
  }
	
  frm.IsMinLength = function(value,Len)
  {
    var Val = jQuery.trim(value);

		if(frm.IsNoSpaces(Val))
		{
			return true;
		}
		else if(  !( js.Int(Len) <= Val.length)  )
 		{
			return true;
		}
 
  }

  frm.IsMaxLength = function(value,Len)
  {
    var Val = jQuery.trim(value);

		if(frm.IsNoSpaces(Val))
		{
			return true;
		}
		else if(  !( js.Int(Len) >= Val.length)  )
 		{
			return true;
		}
  }
 
	frm.IsRangeLength = function(value,Len)
  {
    var Val = jQuery.trim(value);
    var Range = Len.split(',');

		if(frm.IsNoSpaces(Val))
		{
			return true;
		}
		else if ( !(Val.length >= js.Int(Range[0]))   )
		{
			return true;
		}
		else if ( !(Val.length <= js.Int( Range[1]) )   )
		{
			return true;
		} 
  }
 
  frm.IsEqualTo = function(Val,equalTo)
  {   
		if(frm.IsNoSpaces(Val))
		{
			return true;
		}
		else if (Val != equalTo)  
		{
			return true;
		} 
  } 
//--->Form Functions - End
	
	
	

//--->Include any/all plugins and libraries below	
	
//--->Plugin - Start



//--->Enter Key Plugin - Start	
$.fn.enterKey = function (fnc) 
{
    return this.each(function () 
    {
        $(this).keypress(function (ev) 
        {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            if (keycode == '13') 
            {
                fnc.call(this, ev);
            }
        })
    })
}
	
//--->Enter Key Plugin - End	
	
	
//--->HTML Table To Array Plugin - Start
;(function ( $, window, document, undefined ) 
{
	
  $.fn.tableToJSON = function(opts) {

    // Set options
    var defaults = {
      ignoreColumns: [],
      onlyColumns: null,
      ignoreHiddenRows: true,
      ignoreEmptyRows: false,
      headings: null,
      allowHTML: false,
      includeRowId: false,
      textDataOverride: 'data-override',
      textExtractor: null
    };
    opts = $.extend(defaults, opts);

    var notNull = function(value) {
      return value !== undefined && value !== null;
    };

    var ignoredColumn = function(index) {
      if( notNull(opts.onlyColumns) ) {
        return $.inArray(index, opts.onlyColumns) === -1;
      }
      return $.inArray(index, opts.ignoreColumns) !== -1;
    };

    var arraysToHash = function(keys, values) {
      var result = {}, index = 0;
      $.each(values, function(i, value) {
        // when ignoring columns, the header option still starts
        // with the first defined column
        if ( index < keys.length && notNull(value) ) {
          result[ keys[index] ] = value;
          index++;
        }
      });
      return result;
    };

    var cellValues = function(cellIndex, cell, isHeader) {
      var $cell = $(cell),
        // textExtractor
        extractor = opts.textExtractor,
        override = $cell.attr(opts.textDataOverride);
      // don't use extractor for header cells
      if ( extractor === null || isHeader ) {
        return $.trim( override || ( opts.allowHTML ? $cell.html() : cell.textContent || $cell.text() ) || '' );
      } else {
        // overall extractor function
        if ( $.isFunction(extractor) ) {
          return $.trim( override || extractor(cellIndex, $cell) );
        } else if ( typeof extractor === 'object' && $.isFunction( extractor[cellIndex] ) ) {
          return $.trim( override || extractor[cellIndex](cellIndex, $cell) );
        }
      }
      // fallback
      return $.trim( override || ( opts.allowHTML ? $cell.html() : cell.textContent || $cell.text() ) || '' );
    };

    var rowValues = function(row, isHeader) {
      var result = [];
      var includeRowId = opts.includeRowId;
      var useRowId = (typeof includeRowId === 'boolean') ? includeRowId : (typeof includeRowId === 'string') ? true : false;
      var rowIdName = (typeof includeRowId === 'string') === true ? includeRowId : 'rowId';
      if (useRowId) {
        if (typeof $(row).attr('id') === 'undefined') {
          result.push(rowIdName);
        }
      }
      $(row).children('td,th').each(function(cellIndex, cell) {
        result.push( cellValues(cellIndex, cell, isHeader) );
      });
      return result;
    };

    var getHeadings = function(table) {
      var firstRow = table.find('tr:first').first();
      return notNull(opts.headings) ? opts.headings : rowValues(firstRow, true);
    };

    var construct = function(table, headings) {
      var i, j, len, len2, txt, $row, $cell,
        tmpArray = [], cellIndex = 0, result = [];
      table.children('tbody,*').children('tr').each(function(rowIndex, row) {
        if( rowIndex > 0 || notNull(opts.headings) ) {
          var includeRowId = opts.includeRowId;
          var useRowId = (typeof includeRowId === 'boolean') ? includeRowId : (typeof includeRowId === 'string') ? true : false;

          $row = $(row);

          var isEmpty = ($row.find('td').length === $row.find('td:empty').length) ? true : false;

          if( ( $row.is(':visible') || !opts.ignoreHiddenRows ) && ( !isEmpty || !opts.ignoreEmptyRows ) && ( !$row.data('ignore') || $row.data('ignore') === 'false' ) ) {
            cellIndex = 0;
            if (!tmpArray[rowIndex]) {
              tmpArray[rowIndex] = [];
            }
            if (useRowId) {
              cellIndex = cellIndex + 1;
              if (typeof $row.attr('id') !== 'undefined') {
                tmpArray[rowIndex].push($row.attr('id'));
              } else {
                tmpArray[rowIndex].push('');
              }
            }

            $row.children().each(function(){
              $cell = $(this);
              // skip column if already defined
              while (tmpArray[rowIndex][cellIndex]) { cellIndex++; }

              // process rowspans
              if ($cell.filter('[rowspan]').length) {
                len = parseInt( $cell.attr('rowspan'), 10) - 1;
                txt = cellValues(cellIndex, $cell);
                for (i = 1; i <= len; i++) {
                  if (!tmpArray[rowIndex + i]) { tmpArray[rowIndex + i] = []; }
                  tmpArray[rowIndex + i][cellIndex] = txt;
                }
              }
              // process colspans
              if ($cell.filter('[colspan]').length) {
                len = parseInt( $cell.attr('colspan'), 10) - 1;
                txt = cellValues(cellIndex, $cell);
                for (i = 1; i <= len; i++) {
                  // cell has both col and row spans
                  if ($cell.filter('[rowspan]').length) {
                    len2 = parseInt( $cell.attr('rowspan'), 10);
                    for (j = 0; j < len2; j++) {
                      tmpArray[rowIndex + j][cellIndex + i] = txt;
                    }
                  } else {
                    tmpArray[rowIndex][cellIndex + i] = txt;
                  }
                }
              }

              txt = tmpArray[rowIndex][cellIndex] || cellValues(cellIndex, $cell);
              if (notNull(txt)) {
                tmpArray[rowIndex][cellIndex] = txt;
              }
              cellIndex++;
            });
          }
        }
      });
      $.each(tmpArray, function( i, row ){
        if (notNull(row)) {
          // remove ignoredColumns / add onlyColumns
          var newRow = notNull(opts.onlyColumns) || opts.ignoreColumns.length ?
            $.grep(row, function(v, index){ return !ignoredColumn(index); }) : row,

            // remove ignoredColumns / add onlyColumns if headings is not defined
            newHeadings = notNull(opts.headings) ? headings :
              $.grep(headings, function(v, index){ return !ignoredColumn(index); });

          txt = arraysToHash(newHeadings, newRow);
          result[result.length] = txt;
        }
      });
      return result;
    };

    // Run
    var headings = getHeadings(this);
    return construct(this, headings);
  };

	 
}( jQuery, window, document));
 
 
//--->HTML Table To Array Plugin - End	


//--->Plugin - End
	
	
	
//--->Moment Library - Start
/*
moment.js
version : 2.14.1
authors : Tim Wood, Iskren Chernev, Moment.js contributors
license : MIT
momentjs.com
*/

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.moment=t()}(this,function(){"use strict";function e(){return fs.apply(null,arguments)}function t(e){fs=e}function n(e){return e instanceof Array||"[object Array]"===Object.prototype.toString.call(e)}function s(e){return"[object Object]"===Object.prototype.toString.call(e)}function i(e){var t;for(t in e)return!1;return!0}function r(e){return e instanceof Date||"[object Date]"===Object.prototype.toString.call(e)}function a(e,t){var n,s=[];for(n=0;n<e.length;++n)s.push(t(e[n],n));return s}function o(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function u(e,t){for(var n in t)o(t,n)&&(e[n]=t[n]);return o(t,"toString")&&(e.toString=t.toString),o(t,"valueOf")&&(e.valueOf=t.valueOf),e}function d(e,t,n,s){return yt(e,t,n,s,!0).utc()}function l(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null}}function h(e){return null==e._pf&&(e._pf=l()),e._pf}function c(e){if(null==e._isValid){var t=h(e),n=ms.call(t.parsedDateParts,function(e){return null!=e});e._isValid=!isNaN(e._d.getTime())&&t.overflow<0&&!t.empty&&!t.invalidMonth&&!t.invalidWeekday&&!t.nullInput&&!t.invalidFormat&&!t.userInvalidated&&(!t.meridiem||t.meridiem&&n),e._strict&&(e._isValid=e._isValid&&0===t.charsLeftOver&&0===t.unusedTokens.length&&void 0===t.bigHour)}return e._isValid}function f(e){var t=d(NaN);return null!=e?u(h(t),e):h(t).userInvalidated=!0,t}function m(e){return void 0===e}function _(e,t){var n,s,i;if(m(t._isAMomentObject)||(e._isAMomentObject=t._isAMomentObject),m(t._i)||(e._i=t._i),m(t._f)||(e._f=t._f),m(t._l)||(e._l=t._l),m(t._strict)||(e._strict=t._strict),m(t._tzm)||(e._tzm=t._tzm),m(t._isUTC)||(e._isUTC=t._isUTC),m(t._offset)||(e._offset=t._offset),m(t._pf)||(e._pf=h(t)),m(t._locale)||(e._locale=t._locale),_s.length>0)for(n in _s)s=_s[n],i=t[s],m(i)||(e[s]=i);return e}function y(t){_(this,t),this._d=new Date(null!=t._d?t._d.getTime():NaN),ys===!1&&(ys=!0,e.updateOffset(this),ys=!1)}function g(e){return e instanceof y||null!=e&&null!=e._isAMomentObject}function p(e){return 0>e?Math.ceil(e)||0:Math.floor(e)}function w(e){var t=+e,n=0;return 0!==t&&isFinite(t)&&(n=p(t)),n}function v(e,t,n){var s,i=Math.min(e.length,t.length),r=Math.abs(e.length-t.length),a=0;for(s=0;i>s;s++)(n&&e[s]!==t[s]||!n&&w(e[s])!==w(t[s]))&&a++;return a+r}function M(t){e.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+t)}function S(t,n){var s=!0;return u(function(){return null!=e.deprecationHandler&&e.deprecationHandler(null,t),s&&(M(t+"\nArguments: "+Array.prototype.slice.call(arguments).join(", ")+"\n"+(new Error).stack),s=!1),n.apply(this,arguments)},n)}function k(t,n){null!=e.deprecationHandler&&e.deprecationHandler(t,n),gs[t]||(M(n),gs[t]=!0)}function D(e){return e instanceof Function||"[object Function]"===Object.prototype.toString.call(e)}function Y(e){var t,n;for(n in e)t=e[n],D(t)?this[n]=t:this["_"+n]=t;this._config=e,this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function x(e,t){var n,i=u({},e);for(n in t)o(t,n)&&(s(e[n])&&s(t[n])?(i[n]={},u(i[n],e[n]),u(i[n],t[n])):null!=t[n]?i[n]=t[n]:delete i[n]);for(n in e)o(e,n)&&!o(t,n)&&s(e[n])&&(i[n]=u({},i[n]));return i}function O(e){null!=e&&this.set(e)}function T(e,t,n){var s=this._calendar[e]||this._calendar.sameElse;return D(s)?s.call(t,n):s}function b(e){var t=this._longDateFormat[e],n=this._longDateFormat[e.toUpperCase()];return t||!n?t:(this._longDateFormat[e]=n.replace(/MMMM|MM|DD|dddd/g,function(e){return e.slice(1)}),this._longDateFormat[e])}function P(){return this._invalidDate}function W(e){return this._ordinal.replace("%d",e)}function R(e,t,n,s){var i=this._relativeTime[n];return D(i)?i(e,t,n,s):i.replace(/%d/i,e)}function U(e,t){var n=this._relativeTime[e>0?"future":"past"];return D(n)?n(t):n.replace(/%s/i,t)}function C(e,t){var n=e.toLowerCase();xs[n]=xs[n+"s"]=xs[t]=e}function F(e){return"string"==typeof e?xs[e]||xs[e.toLowerCase()]:void 0}function H(e){var t,n,s={};for(n in e)o(e,n)&&(t=F(n),t&&(s[t]=e[n]));return s}function L(e,t){Os[e]=t}function G(e){var t=[];for(var n in e)t.push({unit:n,priority:Os[n]});return t.sort(function(e,t){return e.priority-t.priority}),t}function V(t,n){return function(s){return null!=s?(A(this,t,s),e.updateOffset(this,n),this):j(this,t)}}function j(e,t){return e.isValid()?e._d["get"+(e._isUTC?"UTC":"")+t]():NaN}function A(e,t,n){e.isValid()&&e._d["set"+(e._isUTC?"UTC":"")+t](n)}function E(e){return e=F(e),D(this[e])?this[e]():this}function N(e,t){if("object"==typeof e){e=H(e);for(var n=G(e),s=0;s<n.length;s++)this[n[s].unit](e[n[s].unit])}else if(e=F(e),D(this[e]))return this[e](t);return this}function I(e,t,n){var s=""+Math.abs(e),i=t-s.length,r=e>=0;return(r?n?"+":"":"-")+Math.pow(10,Math.max(0,i)).toString().substr(1)+s}function z(e,t,n,s){var i=s;"string"==typeof s&&(i=function(){return this[s]()}),e&&(Ws[e]=i),t&&(Ws[t[0]]=function(){return I(i.apply(this,arguments),t[1],t[2])}),n&&(Ws[n]=function(){return this.localeData().ordinal(i.apply(this,arguments),e)})}function Z(e){return e.match(/\[[\s\S]/)?e.replace(/^\[|\]$/g,""):e.replace(/\\/g,"")}function q(e){var t,n,s=e.match(Ts);for(t=0,n=s.length;n>t;t++)Ws[s[t]]?s[t]=Ws[s[t]]:s[t]=Z(s[t]);return function(t){var i,r="";for(i=0;n>i;i++)r+=s[i]instanceof Function?s[i].call(t,e):s[i];return r}}function $(e,t){return e.isValid()?(t=B(t,e.localeData()),Ps[t]=Ps[t]||q(t),Ps[t](e)):e.localeData().invalidDate()}function B(e,t){function n(e){return t.longDateFormat(e)||e}var s=5;for(bs.lastIndex=0;s>=0&&bs.test(e);)e=e.replace(bs,n),bs.lastIndex=0,s-=1;return e}function J(e,t,n){Bs[e]=D(t)?t:function(e){return e&&n?n:t}}function Q(e,t){return o(Bs,e)?Bs[e](t._strict,t._locale):new RegExp(X(e))}function X(e){return K(e.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(e,t,n,s,i){return t||n||s||i}))}function K(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function ee(e,t){var n,s=t;for("string"==typeof e&&(e=[e]),"number"==typeof t&&(s=function(e,n){n[t]=w(e)}),n=0;n<e.length;n++)Js[e[n]]=s}function te(e,t){ee(e,function(e,n,s,i){s._w=s._w||{},t(e,s._w,s,i)})}function ne(e,t,n){null!=t&&o(Js,e)&&Js[e](t,n._a,n,e)}function se(e,t){return new Date(Date.UTC(e,t+1,0)).getUTCDate()}function ie(e,t){return n(this._months)?this._months[e.month()]:this._months[(this._months.isFormat||ai).test(t)?"format":"standalone"][e.month()]}function re(e,t){return n(this._monthsShort)?this._monthsShort[e.month()]:this._monthsShort[ai.test(t)?"format":"standalone"][e.month()]}function ae(e,t,n){var s,i,r,a=e.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],s=0;12>s;++s)r=d([2e3,s]),this._shortMonthsParse[s]=this.monthsShort(r,"").toLocaleLowerCase(),this._longMonthsParse[s]=this.months(r,"").toLocaleLowerCase();return n?"MMM"===t?(i=ws.call(this._shortMonthsParse,a),-1!==i?i:null):(i=ws.call(this._longMonthsParse,a),-1!==i?i:null):"MMM"===t?(i=ws.call(this._shortMonthsParse,a),-1!==i?i:(i=ws.call(this._longMonthsParse,a),-1!==i?i:null)):(i=ws.call(this._longMonthsParse,a),-1!==i?i:(i=ws.call(this._shortMonthsParse,a),-1!==i?i:null))}function oe(e,t,n){var s,i,r;if(this._monthsParseExact)return ae.call(this,e,t,n);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),s=0;12>s;s++){if(i=d([2e3,s]),n&&!this._longMonthsParse[s]&&(this._longMonthsParse[s]=new RegExp("^"+this.months(i,"").replace(".","")+"$","i"),this._shortMonthsParse[s]=new RegExp("^"+this.monthsShort(i,"").replace(".","")+"$","i")),n||this._monthsParse[s]||(r="^"+this.months(i,"")+"|^"+this.monthsShort(i,""),this._monthsParse[s]=new RegExp(r.replace(".",""),"i")),n&&"MMMM"===t&&this._longMonthsParse[s].test(e))return s;if(n&&"MMM"===t&&this._shortMonthsParse[s].test(e))return s;if(!n&&this._monthsParse[s].test(e))return s}}function ue(e,t){var n;if(!e.isValid())return e;if("string"==typeof t)if(/^\d+$/.test(t))t=w(t);else if(t=e.localeData().monthsParse(t),"number"!=typeof t)return e;return n=Math.min(e.date(),se(e.year(),t)),e._d["set"+(e._isUTC?"UTC":"")+"Month"](t,n),e}function de(t){return null!=t?(ue(this,t),e.updateOffset(this,!0),this):j(this,"Month")}function le(){return se(this.year(),this.month())}function he(e){return this._monthsParseExact?(o(this,"_monthsRegex")||fe.call(this),e?this._monthsShortStrictRegex:this._monthsShortRegex):(o(this,"_monthsShortRegex")||(this._monthsShortRegex=di),this._monthsShortStrictRegex&&e?this._monthsShortStrictRegex:this._monthsShortRegex)}function ce(e){return this._monthsParseExact?(o(this,"_monthsRegex")||fe.call(this),e?this._monthsStrictRegex:this._monthsRegex):(o(this,"_monthsRegex")||(this._monthsRegex=li),this._monthsStrictRegex&&e?this._monthsStrictRegex:this._monthsRegex)}function fe(){function e(e,t){return t.length-e.length}var t,n,s=[],i=[],r=[];for(t=0;12>t;t++)n=d([2e3,t]),s.push(this.monthsShort(n,"")),i.push(this.months(n,"")),r.push(this.months(n,"")),r.push(this.monthsShort(n,""));for(s.sort(e),i.sort(e),r.sort(e),t=0;12>t;t++)s[t]=K(s[t]),i[t]=K(i[t]);for(t=0;24>t;t++)r[t]=K(r[t]);this._monthsRegex=new RegExp("^("+r.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+i.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+s.join("|")+")","i")}function me(e){return _e(e)?366:365}function _e(e){return e%4===0&&e%100!==0||e%400===0}function ye(){return _e(this.year())}function ge(e,t,n,s,i,r,a){var o=new Date(e,t,n,s,i,r,a);return 100>e&&e>=0&&isFinite(o.getFullYear())&&o.setFullYear(e),o}function pe(e){var t=new Date(Date.UTC.apply(null,arguments));return 100>e&&e>=0&&isFinite(t.getUTCFullYear())&&t.setUTCFullYear(e),t}function we(e,t,n){var s=7+t-n,i=(7+pe(e,0,s).getUTCDay()-t)%7;return-i+s-1}function ve(e,t,n,s,i){var r,a,o=(7+n-s)%7,u=we(e,s,i),d=1+7*(t-1)+o+u;return 0>=d?(r=e-1,a=me(r)+d):d>me(e)?(r=e+1,a=d-me(e)):(r=e,a=d),{year:r,dayOfYear:a}}function Me(e,t,n){var s,i,r=we(e.year(),t,n),a=Math.floor((e.dayOfYear()-r-1)/7)+1;return 1>a?(i=e.year()-1,s=a+Se(i,t,n)):a>Se(e.year(),t,n)?(s=a-Se(e.year(),t,n),i=e.year()+1):(i=e.year(),s=a),{week:s,year:i}}function Se(e,t,n){var s=we(e,t,n),i=we(e+1,t,n);return(me(e)-s+i)/7}function ke(e){return Me(e,this._week.dow,this._week.doy).week}function De(){return this._week.dow}function Ye(){return this._week.doy}function xe(e){var t=this.localeData().week(this);return null==e?t:this.add(7*(e-t),"d")}function Oe(e){var t=Me(this,1,4).week;return null==e?t:this.add(7*(e-t),"d")}function Te(e,t){return"string"!=typeof e?e:isNaN(e)?(e=t.weekdaysParse(e),"number"==typeof e?e:null):parseInt(e,10)}function be(e,t){return"string"==typeof e?t.weekdaysParse(e)%7||7:isNaN(e)?null:e}function Pe(e,t){return n(this._weekdays)?this._weekdays[e.day()]:this._weekdays[this._weekdays.isFormat.test(t)?"format":"standalone"][e.day()]}function We(e){return this._weekdaysShort[e.day()]}function Re(e){return this._weekdaysMin[e.day()]}function Ue(e,t,n){var s,i,r,a=e.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],s=0;7>s;++s)r=d([2e3,1]).day(s),this._minWeekdaysParse[s]=this.weekdaysMin(r,"").toLocaleLowerCase(),this._shortWeekdaysParse[s]=this.weekdaysShort(r,"").toLocaleLowerCase(),this._weekdaysParse[s]=this.weekdays(r,"").toLocaleLowerCase();return n?"dddd"===t?(i=ws.call(this._weekdaysParse,a),-1!==i?i:null):"ddd"===t?(i=ws.call(this._shortWeekdaysParse,a),-1!==i?i:null):(i=ws.call(this._minWeekdaysParse,a),-1!==i?i:null):"dddd"===t?(i=ws.call(this._weekdaysParse,a),-1!==i?i:(i=ws.call(this._shortWeekdaysParse,a),-1!==i?i:(i=ws.call(this._minWeekdaysParse,a),-1!==i?i:null))):"ddd"===t?(i=ws.call(this._shortWeekdaysParse,a),-1!==i?i:(i=ws.call(this._weekdaysParse,a),-1!==i?i:(i=ws.call(this._minWeekdaysParse,a),-1!==i?i:null))):(i=ws.call(this._minWeekdaysParse,a),-1!==i?i:(i=ws.call(this._weekdaysParse,a),-1!==i?i:(i=ws.call(this._shortWeekdaysParse,a),-1!==i?i:null)))}function Ce(e,t,n){var s,i,r;if(this._weekdaysParseExact)return Ue.call(this,e,t,n);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),s=0;7>s;s++){if(i=d([2e3,1]).day(s),n&&!this._fullWeekdaysParse[s]&&(this._fullWeekdaysParse[s]=new RegExp("^"+this.weekdays(i,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[s]=new RegExp("^"+this.weekdaysShort(i,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[s]=new RegExp("^"+this.weekdaysMin(i,"").replace(".",".?")+"$","i")),this._weekdaysParse[s]||(r="^"+this.weekdays(i,"")+"|^"+this.weekdaysShort(i,"")+"|^"+this.weekdaysMin(i,""),this._weekdaysParse[s]=new RegExp(r.replace(".",""),"i")),n&&"dddd"===t&&this._fullWeekdaysParse[s].test(e))return s;if(n&&"ddd"===t&&this._shortWeekdaysParse[s].test(e))return s;if(n&&"dd"===t&&this._minWeekdaysParse[s].test(e))return s;if(!n&&this._weekdaysParse[s].test(e))return s}}function Fe(e){if(!this.isValid())return null!=e?this:NaN;var t=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=e?(e=Te(e,this.localeData()),this.add(e-t,"d")):t}function He(e){if(!this.isValid())return null!=e?this:NaN;var t=(this.day()+7-this.localeData()._week.dow)%7;return null==e?t:this.add(e-t,"d")}function Le(e){if(!this.isValid())return null!=e?this:NaN;if(null!=e){var t=be(e,this.localeData());return this.day(this.day()%7?t:t-7)}return this.day()||7}function Ge(e){return this._weekdaysParseExact?(o(this,"_weekdaysRegex")||Ae.call(this),e?this._weekdaysStrictRegex:this._weekdaysRegex):(o(this,"_weekdaysRegex")||(this._weekdaysRegex=yi),this._weekdaysStrictRegex&&e?this._weekdaysStrictRegex:this._weekdaysRegex)}function Ve(e){return this._weekdaysParseExact?(o(this,"_weekdaysRegex")||Ae.call(this),e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(o(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=gi),this._weekdaysShortStrictRegex&&e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)}function je(e){return this._weekdaysParseExact?(o(this,"_weekdaysRegex")||Ae.call(this),e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(o(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=pi),this._weekdaysMinStrictRegex&&e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)}function Ae(){function e(e,t){return t.length-e.length}var t,n,s,i,r,a=[],o=[],u=[],l=[];for(t=0;7>t;t++)n=d([2e3,1]).day(t),s=this.weekdaysMin(n,""),i=this.weekdaysShort(n,""),r=this.weekdays(n,""),a.push(s),o.push(i),u.push(r),l.push(s),l.push(i),l.push(r);for(a.sort(e),o.sort(e),u.sort(e),l.sort(e),t=0;7>t;t++)o[t]=K(o[t]),u[t]=K(u[t]),l[t]=K(l[t]);this._weekdaysRegex=new RegExp("^("+l.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+u.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+o.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+a.join("|")+")","i")}function Ee(){return this.hours()%12||12}function Ne(){return this.hours()||24}function Ie(e,t){z(e,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),t)})}function ze(e,t){return t._meridiemParse}function Ze(e){return"p"===(e+"").toLowerCase().charAt(0)}function qe(e,t,n){return e>11?n?"pm":"PM":n?"am":"AM"}function $e(e){return e?e.toLowerCase().replace("_","-"):e}function Be(e){for(var t,n,s,i,r=0;r<e.length;){for(i=$e(e[r]).split("-"),t=i.length,n=$e(e[r+1]),n=n?n.split("-"):null;t>0;){if(s=Je(i.slice(0,t).join("-")))return s;if(n&&n.length>=t&&v(i,n,!0)>=t-1)break;t--}r++}return null}function Je(e){var t=null;if(!ki[e]&&"undefined"!=typeof module&&module&&module.exports)try{t=wi._abbr,require("./locale/"+e),Qe(t)}catch(n){}return ki[e]}function Qe(e,t){var n;return e&&(n=m(t)?et(e):Xe(e,t),n&&(wi=n)),wi._abbr}function Xe(e,t){if(null!==t){var n=Si;return t.abbr=e,null!=ki[e]?(k("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),n=ki[e]._config):null!=t.parentLocale&&(null!=ki[t.parentLocale]?n=ki[t.parentLocale]._config:k("parentLocaleUndefined","specified parentLocale is not defined yet. See http://momentjs.com/guides/#/warnings/parent-locale/")),ki[e]=new O(x(n,t)),Qe(e),ki[e]}return delete ki[e],null}function Ke(e,t){if(null!=t){var n,s=Si;null!=ki[e]&&(s=ki[e]._config),t=x(s,t),n=new O(t),n.parentLocale=ki[e],ki[e]=n,Qe(e)}else null!=ki[e]&&(null!=ki[e].parentLocale?ki[e]=ki[e].parentLocale:null!=ki[e]&&delete ki[e]);return ki[e]}function et(e){var t;if(e&&e._locale&&e._locale._abbr&&(e=e._locale._abbr),!e)return wi;if(!n(e)){if(t=Je(e))return t;e=[e]}return Be(e)}function tt(){return ps(ki)}function nt(e){var t,n=e._a;return n&&-2===h(e).overflow&&(t=n[Xs]<0||n[Xs]>11?Xs:n[Ks]<1||n[Ks]>se(n[Qs],n[Xs])?Ks:n[ei]<0||n[ei]>24||24===n[ei]&&(0!==n[ti]||0!==n[ni]||0!==n[si])?ei:n[ti]<0||n[ti]>59?ti:n[ni]<0||n[ni]>59?ni:n[si]<0||n[si]>999?si:-1,h(e)._overflowDayOfYear&&(Qs>t||t>Ks)&&(t=Ks),h(e)._overflowWeeks&&-1===t&&(t=ii),h(e)._overflowWeekday&&-1===t&&(t=ri),h(e).overflow=t),e}function st(e){var t,n,s,i,r,a,o=e._i,u=Di.exec(o)||Yi.exec(o);if(u){for(h(e).iso=!0,t=0,n=Oi.length;n>t;t++)if(Oi[t][1].exec(u[1])){i=Oi[t][0],s=Oi[t][2]!==!1;break}if(null==i)return void(e._isValid=!1);if(u[3]){for(t=0,n=Ti.length;n>t;t++)if(Ti[t][1].exec(u[3])){r=(u[2]||" ")+Ti[t][0];break}if(null==r)return void(e._isValid=!1)}if(!s&&null!=r)return void(e._isValid=!1);if(u[4]){if(!xi.exec(u[4]))return void(e._isValid=!1);a="Z"}e._f=i+(r||"")+(a||""),dt(e)}else e._isValid=!1}function it(t){var n=bi.exec(t._i);return null!==n?void(t._d=new Date(+n[1])):(st(t),void(t._isValid===!1&&(delete t._isValid,e.createFromInputFallback(t))))}function rt(e,t,n){return null!=e?e:null!=t?t:n}function at(t){var n=new Date(e.now());return t._useUTC?[n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate()]:[n.getFullYear(),n.getMonth(),n.getDate()]}function ot(e){var t,n,s,i,r=[];if(!e._d){for(s=at(e),e._w&&null==e._a[Ks]&&null==e._a[Xs]&&ut(e),e._dayOfYear&&(i=rt(e._a[Qs],s[Qs]),e._dayOfYear>me(i)&&(h(e)._overflowDayOfYear=!0),n=pe(i,0,e._dayOfYear),e._a[Xs]=n.getUTCMonth(),e._a[Ks]=n.getUTCDate()),t=0;3>t&&null==e._a[t];++t)e._a[t]=r[t]=s[t];for(;7>t;t++)e._a[t]=r[t]=null==e._a[t]?2===t?1:0:e._a[t];24===e._a[ei]&&0===e._a[ti]&&0===e._a[ni]&&0===e._a[si]&&(e._nextDay=!0,e._a[ei]=0),e._d=(e._useUTC?pe:ge).apply(null,r),null!=e._tzm&&e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),e._nextDay&&(e._a[ei]=24)}}function ut(e){var t,n,s,i,r,a,o,u;t=e._w,null!=t.GG||null!=t.W||null!=t.E?(r=1,a=4,n=rt(t.GG,e._a[Qs],Me(gt(),1,4).year),s=rt(t.W,1),i=rt(t.E,1),(1>i||i>7)&&(u=!0)):(r=e._locale._week.dow,a=e._locale._week.doy,n=rt(t.gg,e._a[Qs],Me(gt(),r,a).year),s=rt(t.w,1),null!=t.d?(i=t.d,(0>i||i>6)&&(u=!0)):null!=t.e?(i=t.e+r,(t.e<0||t.e>6)&&(u=!0)):i=r),1>s||s>Se(n,r,a)?h(e)._overflowWeeks=!0:null!=u?h(e)._overflowWeekday=!0:(o=ve(n,s,i,r,a),e._a[Qs]=o.year,e._dayOfYear=o.dayOfYear)}function dt(t){if(t._f===e.ISO_8601)return void st(t);t._a=[],h(t).empty=!0;var n,s,i,r,a,o=""+t._i,u=o.length,d=0;for(i=B(t._f,t._locale).match(Ts)||[],n=0;n<i.length;n++)r=i[n],s=(o.match(Q(r,t))||[])[0],s&&(a=o.substr(0,o.indexOf(s)),a.length>0&&h(t).unusedInput.push(a),o=o.slice(o.indexOf(s)+s.length),d+=s.length),Ws[r]?(s?h(t).empty=!1:h(t).unusedTokens.push(r),ne(r,s,t)):t._strict&&!s&&h(t).unusedTokens.push(r);h(t).charsLeftOver=u-d,o.length>0&&h(t).unusedInput.push(o),t._a[ei]<=12&&h(t).bigHour===!0&&t._a[ei]>0&&(h(t).bigHour=void 0),h(t).parsedDateParts=t._a.slice(0),h(t).meridiem=t._meridiem,t._a[ei]=lt(t._locale,t._a[ei],t._meridiem),ot(t),nt(t)}function lt(e,t,n){var s;return null==n?t:null!=e.meridiemHour?e.meridiemHour(t,n):null!=e.isPM?(s=e.isPM(n),s&&12>t&&(t+=12),s||12!==t||(t=0),t):t}function ht(e){var t,n,s,i,r;if(0===e._f.length)return h(e).invalidFormat=!0,void(e._d=new Date(NaN));for(i=0;i<e._f.length;i++)r=0,t=_({},e),null!=e._useUTC&&(t._useUTC=e._useUTC),t._f=e._f[i],dt(t),c(t)&&(r+=h(t).charsLeftOver,r+=10*h(t).unusedTokens.length,h(t).score=r,(null==s||s>r)&&(s=r,n=t));u(e,n||t)}function ct(e){if(!e._d){var t=H(e._i);e._a=a([t.year,t.month,t.day||t.date,t.hour,t.minute,t.second,t.millisecond],function(e){return e&&parseInt(e,10)}),ot(e)}}function ft(e){var t=new y(nt(mt(e)));return t._nextDay&&(t.add(1,"d"),t._nextDay=void 0),t}function mt(e){var t=e._i,s=e._f;return e._locale=e._locale||et(e._l),null===t||void 0===s&&""===t?f({nullInput:!0}):("string"==typeof t&&(e._i=t=e._locale.preparse(t)),g(t)?new y(nt(t)):(n(s)?ht(e):r(t)?e._d=t:s?dt(e):_t(e),c(e)||(e._d=null),e))}function _t(t){var s=t._i;void 0===s?t._d=new Date(e.now()):r(s)?t._d=new Date(s.valueOf()):"string"==typeof s?it(t):n(s)?(t._a=a(s.slice(0),function(e){return parseInt(e,10)}),ot(t)):"object"==typeof s?ct(t):"number"==typeof s?t._d=new Date(s):e.createFromInputFallback(t)}function yt(e,t,r,a,o){var u={};return"boolean"==typeof r&&(a=r,r=void 0),(s(e)&&i(e)||n(e)&&0===e.length)&&(e=void 0),u._isAMomentObject=!0,u._useUTC=u._isUTC=o,u._l=r,u._i=e,u._f=t,u._strict=a,ft(u)}function gt(e,t,n,s){return yt(e,t,n,s,!1)}function pt(e,t){var s,i;if(1===t.length&&n(t[0])&&(t=t[0]),!t.length)return gt();for(s=t[0],i=1;i<t.length;++i)t[i].isValid()&&!t[i][e](s)||(s=t[i]);return s}function wt(){var e=[].slice.call(arguments,0);return pt("isBefore",e)}function vt(){var e=[].slice.call(arguments,0);return pt("isAfter",e)}function Mt(e){var t=H(e),n=t.year||0,s=t.quarter||0,i=t.month||0,r=t.week||0,a=t.day||0,o=t.hour||0,u=t.minute||0,d=t.second||0,l=t.millisecond||0;this._milliseconds=+l+1e3*d+6e4*u+1e3*o*60*60,this._days=+a+7*r,this._months=+i+3*s+12*n,this._data={},this._locale=et(),this._bubble()}function St(e){return e instanceof Mt}function kt(e,t){z(e,0,0,function(){var e=this.utcOffset(),n="+";return 0>e&&(e=-e,n="-"),n+I(~~(e/60),2)+t+I(~~e%60,2)})}function Dt(e,t){var n=(t||"").match(e)||[],s=n[n.length-1]||[],i=(s+"").match(Ui)||["-",0,0],r=+(60*i[1])+w(i[2]);return"+"===i[0]?r:-r}function Yt(t,n){var s,i;return n._isUTC?(s=n.clone(),i=(g(t)||r(t)?t.valueOf():gt(t).valueOf())-s.valueOf(),s._d.setTime(s._d.valueOf()+i),e.updateOffset(s,!1),s):gt(t).local()}function xt(e){return 15*-Math.round(e._d.getTimezoneOffset()/15)}function Ot(t,n){var s,i=this._offset||0;return this.isValid()?null!=t?("string"==typeof t?t=Dt(Zs,t):Math.abs(t)<16&&(t=60*t),!this._isUTC&&n&&(s=xt(this)),this._offset=t,this._isUTC=!0,null!=s&&this.add(s,"m"),i!==t&&(!n||this._changeInProgress?It(this,Gt(t-i,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,e.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?i:xt(this):null!=t?this:NaN}function Tt(e,t){return null!=e?("string"!=typeof e&&(e=-e),this.utcOffset(e,t),this):-this.utcOffset()}function bt(e){return this.utcOffset(0,e)}function Pt(e){return this._isUTC&&(this.utcOffset(0,e),this._isUTC=!1,e&&this.subtract(xt(this),"m")),this}function Wt(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(Dt(zs,this._i)),this}function Rt(e){return this.isValid()?(e=e?gt(e).utcOffset():0,(this.utcOffset()-e)%60===0):!1}function Ut(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Ct(){if(!m(this._isDSTShifted))return this._isDSTShifted;var e={};if(_(e,this),e=mt(e),e._a){var t=e._isUTC?d(e._a):gt(e._a);this._isDSTShifted=this.isValid()&&v(e._a,t.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function Ft(){return this.isValid()?!this._isUTC:!1}function Ht(){return this.isValid()?this._isUTC:!1}function Lt(){return this.isValid()?this._isUTC&&0===this._offset:!1}function Gt(e,t){var n,s,i,r=e,a=null;return St(e)?r={ms:e._milliseconds,d:e._days,M:e._months}:"number"==typeof e?(r={},t?r[t]=e:r.milliseconds=e):(a=Ci.exec(e))?(n="-"===a[1]?-1:1,r={y:0,d:w(a[Ks])*n,h:w(a[ei])*n,m:w(a[ti])*n,s:w(a[ni])*n,ms:w(a[si])*n}):(a=Fi.exec(e))?(n="-"===a[1]?-1:1,r={y:Vt(a[2],n),M:Vt(a[3],n),w:Vt(a[4],n),d:Vt(a[5],n),h:Vt(a[6],n),m:Vt(a[7],n),s:Vt(a[8],n)}):null==r?r={}:"object"==typeof r&&("from"in r||"to"in r)&&(i=At(gt(r.from),gt(r.to)),r={},r.ms=i.milliseconds,r.M=i.months),s=new Mt(r),St(e)&&o(e,"_locale")&&(s._locale=e._locale),s}function Vt(e,t){var n=e&&parseFloat(e.replace(",","."));return(isNaN(n)?0:n)*t}function jt(e,t){var n={milliseconds:0,months:0};return n.months=t.month()-e.month()+12*(t.year()-e.year()),e.clone().add(n.months,"M").isAfter(t)&&--n.months,n.milliseconds=+t-+e.clone().add(n.months,"M"),n}function At(e,t){var n;return e.isValid()&&t.isValid()?(t=Yt(t,e),e.isBefore(t)?n=jt(e,t):(n=jt(t,e),n.milliseconds=-n.milliseconds,n.months=-n.months),n):{milliseconds:0,months:0}}function Et(e){return 0>e?-1*Math.round(-1*e):Math.round(e)}function Nt(e,t){return function(n,s){var i,r;return null===s||isNaN(+s)||(k(t,"moment()."+t+"(period, number) is deprecated. Please use moment()."+t+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),r=n,n=s,s=r),n="string"==typeof n?+n:n,i=Gt(n,s),It(this,i,e),this}}function It(t,n,s,i){var r=n._milliseconds,a=Et(n._days),o=Et(n._months);t.isValid()&&(i=null==i?!0:i,r&&t._d.setTime(t._d.valueOf()+r*s),a&&A(t,"Date",j(t,"Date")+a*s),o&&ue(t,j(t,"Month")+o*s),i&&e.updateOffset(t,a||o))}function zt(e,t){var n=e.diff(t,"days",!0);return-6>n?"sameElse":-1>n?"lastWeek":0>n?"lastDay":1>n?"sameDay":2>n?"nextDay":7>n?"nextWeek":"sameElse"}function Zt(t,n){var s=t||gt(),i=Yt(s,this).startOf("day"),r=e.calendarFormat(this,i)||"sameElse",a=n&&(D(n[r])?n[r].call(this,s):n[r]);return this.format(a||this.localeData().calendar(r,this,gt(s)))}function qt(){return new y(this)}function $t(e,t){var n=g(e)?e:gt(e);return this.isValid()&&n.isValid()?(t=F(m(t)?"millisecond":t),"millisecond"===t?this.valueOf()>n.valueOf():n.valueOf()<this.clone().startOf(t).valueOf()):!1}function Bt(e,t){var n=g(e)?e:gt(e);return this.isValid()&&n.isValid()?(t=F(m(t)?"millisecond":t),"millisecond"===t?this.valueOf()<n.valueOf():this.clone().endOf(t).valueOf()<n.valueOf()):!1}function Jt(e,t,n,s){return s=s||"()",("("===s[0]?this.isAfter(e,n):!this.isBefore(e,n))&&(")"===s[1]?this.isBefore(t,n):!this.isAfter(t,n))}function Qt(e,t){var n,s=g(e)?e:gt(e);return this.isValid()&&s.isValid()?(t=F(t||"millisecond"),"millisecond"===t?this.valueOf()===s.valueOf():(n=s.valueOf(),this.clone().startOf(t).valueOf()<=n&&n<=this.clone().endOf(t).valueOf())):!1}function Xt(e,t){return this.isSame(e,t)||this.isAfter(e,t)}function Kt(e,t){return this.isSame(e,t)||this.isBefore(e,t)}function en(e,t,n){var s,i,r,a;return this.isValid()?(s=Yt(e,this),s.isValid()?(i=6e4*(s.utcOffset()-this.utcOffset()),t=F(t),"year"===t||"month"===t||"quarter"===t?(a=tn(this,s),"quarter"===t?a/=3:"year"===t&&(a/=12)):(r=this-s,a="second"===t?r/1e3:"minute"===t?r/6e4:"hour"===t?r/36e5:"day"===t?(r-i)/864e5:"week"===t?(r-i)/6048e5:r),n?a:p(a)):NaN):NaN}function tn(e,t){var n,s,i=12*(t.year()-e.year())+(t.month()-e.month()),r=e.clone().add(i,"months");return 0>t-r?(n=e.clone().add(i-1,"months"),s=(t-r)/(r-n)):(n=e.clone().add(i+1,"months"),s=(t-r)/(n-r)),-(i+s)||0}function nn(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function sn(){var e=this.clone().utc();return 0<e.year()&&e.year()<=9999?D(Date.prototype.toISOString)?this.toDate().toISOString():$(e,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):$(e,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function rn(t){t||(t=this.isUtc()?e.defaultFormatUtc:e.defaultFormat);var n=$(this,t);return this.localeData().postformat(n)}function an(e,t){return this.isValid()&&(g(e)&&e.isValid()||gt(e).isValid())?Gt({to:this,from:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()}function on(e){return this.from(gt(),e)}function un(e,t){return this.isValid()&&(g(e)&&e.isValid()||gt(e).isValid())?Gt({from:this,to:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()}function dn(e){return this.to(gt(),e)}function ln(e){var t;return void 0===e?this._locale._abbr:(t=et(e),null!=t&&(this._locale=t),this)}function hn(){return this._locale}function cn(e){switch(e=F(e)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":case"date":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===e&&this.weekday(0),"isoWeek"===e&&this.isoWeekday(1),"quarter"===e&&this.month(3*Math.floor(this.month()/3)),this}function fn(e){return e=F(e),void 0===e||"millisecond"===e?this:("date"===e&&(e="day"),this.startOf(e).add(1,"isoWeek"===e?"week":e).subtract(1,"ms"))}function mn(){return this._d.valueOf()-6e4*(this._offset||0)}function _n(){return Math.floor(this.valueOf()/1e3)}function yn(){return new Date(this.valueOf())}function gn(){var e=this;return[e.year(),e.month(),e.date(),e.hour(),e.minute(),e.second(),e.millisecond()]}function pn(){var e=this;return{years:e.year(),months:e.month(),date:e.date(),hours:e.hours(),minutes:e.minutes(),seconds:e.seconds(),milliseconds:e.milliseconds()}}function wn(){return this.isValid()?this.toISOString():null}function vn(){return c(this)}function Mn(){return u({},h(this))}function Sn(){return h(this).overflow}function kn(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function Dn(e,t){z(0,[e,e.length],0,t)}function Yn(e){return bn.call(this,e,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function xn(e){return bn.call(this,e,this.isoWeek(),this.isoWeekday(),1,4)}function On(){return Se(this.year(),1,4)}function Tn(){var e=this.localeData()._week;return Se(this.year(),e.dow,e.doy)}function bn(e,t,n,s,i){var r;return null==e?Me(this,s,i).year:(r=Se(e,s,i),t>r&&(t=r),Pn.call(this,e,t,n,s,i))}function Pn(e,t,n,s,i){var r=ve(e,t,n,s,i),a=pe(r.year,0,r.dayOfYear);return this.year(a.getUTCFullYear()),this.month(a.getUTCMonth()),this.date(a.getUTCDate()),this}function Wn(e){return null==e?Math.ceil((this.month()+1)/3):this.month(3*(e-1)+this.month()%3)}function Rn(e){var t=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==e?t:this.add(e-t,"d")}function Un(e,t){t[si]=w(1e3*("0."+e))}function Cn(){return this._isUTC?"UTC":""}function Fn(){return this._isUTC?"Coordinated Universal Time":""}function Hn(e){return gt(1e3*e)}function Ln(){return gt.apply(null,arguments).parseZone()}function Gn(e){return e}function Vn(e,t,n,s){var i=et(),r=d().set(s,t);return i[n](r,e)}function jn(e,t,n){if("number"==typeof e&&(t=e,e=void 0),e=e||"",null!=t)return Vn(e,t,n,"month");var s,i=[];for(s=0;12>s;s++)i[s]=Vn(e,s,n,"month");return i}function An(e,t,n,s){"boolean"==typeof e?("number"==typeof t&&(n=t,t=void 0),t=t||""):(t=e,n=t,e=!1,"number"==typeof t&&(n=t,t=void 0),t=t||"");var i=et(),r=e?i._week.dow:0;if(null!=n)return Vn(t,(n+r)%7,s,"day");var a,o=[];for(a=0;7>a;a++)o[a]=Vn(t,(a+r)%7,s,"day");return o}function En(e,t){return jn(e,t,"months")}function Nn(e,t){return jn(e,t,"monthsShort")}function In(e,t,n){return An(e,t,n,"weekdays")}function zn(e,t,n){return An(e,t,n,"weekdaysShort")}function Zn(e,t,n){return An(e,t,n,"weekdaysMin")}function qn(){var e=this._data;return this._milliseconds=qi(this._milliseconds),this._days=qi(this._days),this._months=qi(this._months),e.milliseconds=qi(e.milliseconds),e.seconds=qi(e.seconds),e.minutes=qi(e.minutes),e.hours=qi(e.hours),e.months=qi(e.months),e.years=qi(e.years),this}function $n(e,t,n,s){var i=Gt(t,n);return e._milliseconds+=s*i._milliseconds,e._days+=s*i._days,e._months+=s*i._months,
e._bubble()}function Bn(e,t){return $n(this,e,t,1)}function Jn(e,t){return $n(this,e,t,-1)}function Qn(e){return 0>e?Math.floor(e):Math.ceil(e)}function Xn(){var e,t,n,s,i,r=this._milliseconds,a=this._days,o=this._months,u=this._data;return r>=0&&a>=0&&o>=0||0>=r&&0>=a&&0>=o||(r+=864e5*Qn(es(o)+a),a=0,o=0),u.milliseconds=r%1e3,e=p(r/1e3),u.seconds=e%60,t=p(e/60),u.minutes=t%60,n=p(t/60),u.hours=n%24,a+=p(n/24),i=p(Kn(a)),o+=i,a-=Qn(es(i)),s=p(o/12),o%=12,u.days=a,u.months=o,u.years=s,this}function Kn(e){return 4800*e/146097}function es(e){return 146097*e/4800}function ts(e){var t,n,s=this._milliseconds;if(e=F(e),"month"===e||"year"===e)return t=this._days+s/864e5,n=this._months+Kn(t),"month"===e?n:n/12;switch(t=this._days+Math.round(es(this._months)),e){case"week":return t/7+s/6048e5;case"day":return t+s/864e5;case"hour":return 24*t+s/36e5;case"minute":return 1440*t+s/6e4;case"second":return 86400*t+s/1e3;case"millisecond":return Math.floor(864e5*t)+s;default:throw new Error("Unknown unit "+e)}}function ns(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*w(this._months/12)}function ss(e){return function(){return this.as(e)}}function is(e){return e=F(e),this[e+"s"]()}function rs(e){return function(){return this._data[e]}}function as(){return p(this.days()/7)}function os(e,t,n,s,i){return i.relativeTime(t||1,!!n,e,s)}function us(e,t,n){var s=Gt(e).abs(),i=dr(s.as("s")),r=dr(s.as("m")),a=dr(s.as("h")),o=dr(s.as("d")),u=dr(s.as("M")),d=dr(s.as("y")),l=i<lr.s&&["s",i]||1>=r&&["m"]||r<lr.m&&["mm",r]||1>=a&&["h"]||a<lr.h&&["hh",a]||1>=o&&["d"]||o<lr.d&&["dd",o]||1>=u&&["M"]||u<lr.M&&["MM",u]||1>=d&&["y"]||["yy",d];return l[2]=t,l[3]=+e>0,l[4]=n,os.apply(null,l)}function ds(e){return void 0===e?dr:"function"==typeof e?(dr=e,!0):!1}function ls(e,t){return void 0===lr[e]?!1:void 0===t?lr[e]:(lr[e]=t,!0)}function hs(e){var t=this.localeData(),n=us(this,!e,t);return e&&(n=t.pastFuture(+this,n)),t.postformat(n)}function cs(){var e,t,n,s=hr(this._milliseconds)/1e3,i=hr(this._days),r=hr(this._months);e=p(s/60),t=p(e/60),s%=60,e%=60,n=p(r/12),r%=12;var a=n,o=r,u=i,d=t,l=e,h=s,c=this.asSeconds();return c?(0>c?"-":"")+"P"+(a?a+"Y":"")+(o?o+"M":"")+(u?u+"D":"")+(d||l||h?"T":"")+(d?d+"H":"")+(l?l+"M":"")+(h?h+"S":""):"P0D"}var fs,ms;ms=Array.prototype.some?Array.prototype.some:function(e){for(var t=Object(this),n=t.length>>>0,s=0;n>s;s++)if(s in t&&e.call(this,t[s],s,t))return!0;return!1};var _s=e.momentProperties=[],ys=!1,gs={};e.suppressDeprecationWarnings=!1,e.deprecationHandler=null;var ps;ps=Object.keys?Object.keys:function(e){var t,n=[];for(t in e)o(e,t)&&n.push(t);return n};var ws,vs={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},Ms={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},Ss="Invalid date",ks="%d",Ds=/\d{1,2}/,Ys={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},xs={},Os={},Ts=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,bs=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Ps={},Ws={},Rs=/\d/,Us=/\d\d/,Cs=/\d{3}/,Fs=/\d{4}/,Hs=/[+-]?\d{6}/,Ls=/\d\d?/,Gs=/\d\d\d\d?/,Vs=/\d\d\d\d\d\d?/,js=/\d{1,3}/,As=/\d{1,4}/,Es=/[+-]?\d{1,6}/,Ns=/\d+/,Is=/[+-]?\d+/,zs=/Z|[+-]\d\d:?\d\d/gi,Zs=/Z|[+-]\d\d(?::?\d\d)?/gi,qs=/[+-]?\d+(\.\d{1,3})?/,$s=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Bs={},Js={},Qs=0,Xs=1,Ks=2,ei=3,ti=4,ni=5,si=6,ii=7,ri=8;ws=Array.prototype.indexOf?Array.prototype.indexOf:function(e){var t;for(t=0;t<this.length;++t)if(this[t]===e)return t;return-1},z("M",["MM",2],"Mo",function(){return this.month()+1}),z("MMM",0,0,function(e){return this.localeData().monthsShort(this,e)}),z("MMMM",0,0,function(e){return this.localeData().months(this,e)}),C("month","M"),L("month",8),J("M",Ls),J("MM",Ls,Us),J("MMM",function(e,t){return t.monthsShortRegex(e)}),J("MMMM",function(e,t){return t.monthsRegex(e)}),ee(["M","MM"],function(e,t){t[Xs]=w(e)-1}),ee(["MMM","MMMM"],function(e,t,n,s){var i=n._locale.monthsParse(e,s,n._strict);null!=i?t[Xs]=i:h(n).invalidMonth=e});var ai=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,oi="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ui="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),di=$s,li=$s;z("Y",0,0,function(){var e=this.year();return 9999>=e?""+e:"+"+e}),z(0,["YY",2],0,function(){return this.year()%100}),z(0,["YYYY",4],0,"year"),z(0,["YYYYY",5],0,"year"),z(0,["YYYYYY",6,!0],0,"year"),C("year","y"),L("year",1),J("Y",Is),J("YY",Ls,Us),J("YYYY",As,Fs),J("YYYYY",Es,Hs),J("YYYYYY",Es,Hs),ee(["YYYYY","YYYYYY"],Qs),ee("YYYY",function(t,n){n[Qs]=2===t.length?e.parseTwoDigitYear(t):w(t)}),ee("YY",function(t,n){n[Qs]=e.parseTwoDigitYear(t)}),ee("Y",function(e,t){t[Qs]=parseInt(e,10)}),e.parseTwoDigitYear=function(e){return w(e)+(w(e)>68?1900:2e3)};var hi=V("FullYear",!0);z("w",["ww",2],"wo","week"),z("W",["WW",2],"Wo","isoWeek"),C("week","w"),C("isoWeek","W"),L("week",5),L("isoWeek",5),J("w",Ls),J("ww",Ls,Us),J("W",Ls),J("WW",Ls,Us),te(["w","ww","W","WW"],function(e,t,n,s){t[s.substr(0,1)]=w(e)});var ci={dow:0,doy:6};z("d",0,"do","day"),z("dd",0,0,function(e){return this.localeData().weekdaysMin(this,e)}),z("ddd",0,0,function(e){return this.localeData().weekdaysShort(this,e)}),z("dddd",0,0,function(e){return this.localeData().weekdays(this,e)}),z("e",0,0,"weekday"),z("E",0,0,"isoWeekday"),C("day","d"),C("weekday","e"),C("isoWeekday","E"),L("day",11),L("weekday",11),L("isoWeekday",11),J("d",Ls),J("e",Ls),J("E",Ls),J("dd",function(e,t){return t.weekdaysMinRegex(e)}),J("ddd",function(e,t){return t.weekdaysShortRegex(e)}),J("dddd",function(e,t){return t.weekdaysRegex(e)}),te(["dd","ddd","dddd"],function(e,t,n,s){var i=n._locale.weekdaysParse(e,s,n._strict);null!=i?t.d=i:h(n).invalidWeekday=e}),te(["d","e","E"],function(e,t,n,s){t[s]=w(e)});var fi="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),mi="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),_i="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),yi=$s,gi=$s,pi=$s;z("H",["HH",2],0,"hour"),z("h",["hh",2],0,Ee),z("k",["kk",2],0,Ne),z("hmm",0,0,function(){return""+Ee.apply(this)+I(this.minutes(),2)}),z("hmmss",0,0,function(){return""+Ee.apply(this)+I(this.minutes(),2)+I(this.seconds(),2)}),z("Hmm",0,0,function(){return""+this.hours()+I(this.minutes(),2)}),z("Hmmss",0,0,function(){return""+this.hours()+I(this.minutes(),2)+I(this.seconds(),2)}),Ie("a",!0),Ie("A",!1),C("hour","h"),L("hour",13),J("a",ze),J("A",ze),J("H",Ls),J("h",Ls),J("HH",Ls,Us),J("hh",Ls,Us),J("hmm",Gs),J("hmmss",Vs),J("Hmm",Gs),J("Hmmss",Vs),ee(["H","HH"],ei),ee(["a","A"],function(e,t,n){n._isPm=n._locale.isPM(e),n._meridiem=e}),ee(["h","hh"],function(e,t,n){t[ei]=w(e),h(n).bigHour=!0}),ee("hmm",function(e,t,n){var s=e.length-2;t[ei]=w(e.substr(0,s)),t[ti]=w(e.substr(s)),h(n).bigHour=!0}),ee("hmmss",function(e,t,n){var s=e.length-4,i=e.length-2;t[ei]=w(e.substr(0,s)),t[ti]=w(e.substr(s,2)),t[ni]=w(e.substr(i)),h(n).bigHour=!0}),ee("Hmm",function(e,t){var n=e.length-2;t[ei]=w(e.substr(0,n)),t[ti]=w(e.substr(n))}),ee("Hmmss",function(e,t){var n=e.length-4,s=e.length-2;t[ei]=w(e.substr(0,n)),t[ti]=w(e.substr(n,2)),t[ni]=w(e.substr(s))});var wi,vi=/[ap]\.?m?\.?/i,Mi=V("Hours",!0),Si={calendar:vs,longDateFormat:Ms,invalidDate:Ss,ordinal:ks,ordinalParse:Ds,relativeTime:Ys,months:oi,monthsShort:ui,week:ci,weekdays:fi,weekdaysMin:_i,weekdaysShort:mi,meridiemParse:vi},ki={},Di=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,Yi=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,xi=/Z|[+-]\d\d(?::?\d\d)?/,Oi=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],Ti=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],bi=/^\/?Date\((\-?\d+)/i;e.createFromInputFallback=S("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(e){e._d=new Date(e._i+(e._useUTC?" UTC":""))}),e.ISO_8601=function(){};var Pi=S("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=gt.apply(null,arguments);return this.isValid()&&e.isValid()?this>e?this:e:f()}),Wi=S("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=gt.apply(null,arguments);return this.isValid()&&e.isValid()?e>this?this:e:f()}),Ri=function(){return Date.now?Date.now():+new Date};kt("Z",":"),kt("ZZ",""),J("Z",Zs),J("ZZ",Zs),ee(["Z","ZZ"],function(e,t,n){n._useUTC=!0,n._tzm=Dt(Zs,e)});var Ui=/([\+\-]|\d\d)/gi;e.updateOffset=function(){};var Ci=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,Fi=/^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;Gt.fn=Mt.prototype;var Hi=Nt(1,"add"),Li=Nt(-1,"subtract");e.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",e.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var Gi=S("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(e){return void 0===e?this.localeData():this.locale(e)});z(0,["gg",2],0,function(){return this.weekYear()%100}),z(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Dn("gggg","weekYear"),Dn("ggggg","weekYear"),Dn("GGGG","isoWeekYear"),Dn("GGGGG","isoWeekYear"),C("weekYear","gg"),C("isoWeekYear","GG"),L("weekYear",1),L("isoWeekYear",1),J("G",Is),J("g",Is),J("GG",Ls,Us),J("gg",Ls,Us),J("GGGG",As,Fs),J("gggg",As,Fs),J("GGGGG",Es,Hs),J("ggggg",Es,Hs),te(["gggg","ggggg","GGGG","GGGGG"],function(e,t,n,s){t[s.substr(0,2)]=w(e)}),te(["gg","GG"],function(t,n,s,i){n[i]=e.parseTwoDigitYear(t)}),z("Q",0,"Qo","quarter"),C("quarter","Q"),L("quarter",7),J("Q",Rs),ee("Q",function(e,t){t[Xs]=3*(w(e)-1)}),z("D",["DD",2],"Do","date"),C("date","D"),L("date",9),J("D",Ls),J("DD",Ls,Us),J("Do",function(e,t){return e?t._ordinalParse:t._ordinalParseLenient}),ee(["D","DD"],Ks),ee("Do",function(e,t){t[Ks]=w(e.match(Ls)[0],10)});var Vi=V("Date",!0);z("DDD",["DDDD",3],"DDDo","dayOfYear"),C("dayOfYear","DDD"),L("dayOfYear",4),J("DDD",js),J("DDDD",Cs),ee(["DDD","DDDD"],function(e,t,n){n._dayOfYear=w(e)}),z("m",["mm",2],0,"minute"),C("minute","m"),L("minute",14),J("m",Ls),J("mm",Ls,Us),ee(["m","mm"],ti);var ji=V("Minutes",!1);z("s",["ss",2],0,"second"),C("second","s"),L("second",15),J("s",Ls),J("ss",Ls,Us),ee(["s","ss"],ni);var Ai=V("Seconds",!1);z("S",0,0,function(){return~~(this.millisecond()/100)}),z(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),z(0,["SSS",3],0,"millisecond"),z(0,["SSSS",4],0,function(){return 10*this.millisecond()}),z(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),z(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),z(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),z(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),z(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),C("millisecond","ms"),L("millisecond",16),J("S",js,Rs),J("SS",js,Us),J("SSS",js,Cs);var Ei;for(Ei="SSSS";Ei.length<=9;Ei+="S")J(Ei,Ns);for(Ei="S";Ei.length<=9;Ei+="S")ee(Ei,Un);var Ni=V("Milliseconds",!1);z("z",0,0,"zoneAbbr"),z("zz",0,0,"zoneName");var Ii=y.prototype;Ii.add=Hi,Ii.calendar=Zt,Ii.clone=qt,Ii.diff=en,Ii.endOf=fn,Ii.format=rn,Ii.from=an,Ii.fromNow=on,Ii.to=un,Ii.toNow=dn,Ii.get=E,Ii.invalidAt=Sn,Ii.isAfter=$t,Ii.isBefore=Bt,Ii.isBetween=Jt,Ii.isSame=Qt,Ii.isSameOrAfter=Xt,Ii.isSameOrBefore=Kt,Ii.isValid=vn,Ii.lang=Gi,Ii.locale=ln,Ii.localeData=hn,Ii.max=Wi,Ii.min=Pi,Ii.parsingFlags=Mn,Ii.set=N,Ii.startOf=cn,Ii.subtract=Li,Ii.toArray=gn,Ii.toObject=pn,Ii.toDate=yn,Ii.toISOString=sn,Ii.toJSON=wn,Ii.toString=nn,Ii.unix=_n,Ii.valueOf=mn,Ii.creationData=kn,Ii.year=hi,Ii.isLeapYear=ye,Ii.weekYear=Yn,Ii.isoWeekYear=xn,Ii.quarter=Ii.quarters=Wn,Ii.month=de,Ii.daysInMonth=le,Ii.week=Ii.weeks=xe,Ii.isoWeek=Ii.isoWeeks=Oe,Ii.weeksInYear=Tn,Ii.isoWeeksInYear=On,Ii.date=Vi,Ii.day=Ii.days=Fe,Ii.weekday=He,Ii.isoWeekday=Le,Ii.dayOfYear=Rn,Ii.hour=Ii.hours=Mi,Ii.minute=Ii.minutes=ji,Ii.second=Ii.seconds=Ai,Ii.millisecond=Ii.milliseconds=Ni,Ii.utcOffset=Ot,Ii.utc=bt,Ii.local=Pt,Ii.parseZone=Wt,Ii.hasAlignedHourOffset=Rt,Ii.isDST=Ut,Ii.isLocal=Ft,Ii.isUtcOffset=Ht,Ii.isUtc=Lt,Ii.isUTC=Lt,Ii.zoneAbbr=Cn,Ii.zoneName=Fn,Ii.dates=S("dates accessor is deprecated. Use date instead.",Vi),Ii.months=S("months accessor is deprecated. Use month instead",de),Ii.years=S("years accessor is deprecated. Use year instead",hi),Ii.zone=S("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",Tt),Ii.isDSTShifted=S("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",Ct);var zi=Ii,Zi=O.prototype;Zi.calendar=T,Zi.longDateFormat=b,Zi.invalidDate=P,Zi.ordinal=W,Zi.preparse=Gn,Zi.postformat=Gn,Zi.relativeTime=R,Zi.pastFuture=U,Zi.set=Y,Zi.months=ie,Zi.monthsShort=re,Zi.monthsParse=oe,Zi.monthsRegex=ce,Zi.monthsShortRegex=he,Zi.week=ke,Zi.firstDayOfYear=Ye,Zi.firstDayOfWeek=De,Zi.weekdays=Pe,Zi.weekdaysMin=Re,Zi.weekdaysShort=We,Zi.weekdaysParse=Ce,Zi.weekdaysRegex=Ge,Zi.weekdaysShortRegex=Ve,Zi.weekdaysMinRegex=je,Zi.isPM=Ze,Zi.meridiem=qe,Qe("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var t=e%10,n=1===w(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+n}}),e.lang=S("moment.lang is deprecated. Use moment.locale instead.",Qe),e.langData=S("moment.langData is deprecated. Use moment.localeData instead.",et);var qi=Math.abs,$i=ss("ms"),Bi=ss("s"),Ji=ss("m"),Qi=ss("h"),Xi=ss("d"),Ki=ss("w"),er=ss("M"),tr=ss("y"),nr=rs("milliseconds"),sr=rs("seconds"),ir=rs("minutes"),rr=rs("hours"),ar=rs("days"),or=rs("months"),ur=rs("years"),dr=Math.round,lr={s:45,m:45,h:22,d:26,M:11},hr=Math.abs,cr=Mt.prototype;cr.abs=qn,cr.add=Bn,cr.subtract=Jn,cr.as=ts,cr.asMilliseconds=$i,cr.asSeconds=Bi,cr.asMinutes=Ji,cr.asHours=Qi,cr.asDays=Xi,cr.asWeeks=Ki,cr.asMonths=er,cr.asYears=tr,cr.valueOf=ns,cr._bubble=Xn,cr.get=is,cr.milliseconds=nr,cr.seconds=sr,cr.minutes=ir,cr.hours=rr,cr.days=ar,cr.weeks=as,cr.months=or,cr.years=ur,cr.humanize=hs,cr.toISOString=cs,cr.toString=cs,cr.toJSON=cs,cr.locale=ln,cr.localeData=hn,cr.toIsoString=S("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",cs),cr.lang=Gi,z("X",0,0,"unix"),z("x",0,0,"valueOf"),J("x",Is),J("X",qs),ee("X",function(e,t,n){n._d=new Date(1e3*parseFloat(e,10))}),ee("x",function(e,t,n){n._d=new Date(w(e))}),e.version="2.14.1",t(gt),e.fn=zi,e.min=wt,e.max=vt,e.now=Ri,e.utc=d,e.unix=Hn,e.months=En,e.isDate=r,e.locale=Qe,e.invalid=f,e.duration=Gt,e.isMoment=g,e.weekdays=In,e.parseZone=Ln,e.localeData=et,e.isDuration=St,e.monthsShort=Nn,e.weekdaysMin=Zn,e.defineLocale=Xe,e.updateLocale=Ke,e.locales=tt,e.weekdaysShort=zn,e.normalizeUnits=F,e.relativeTimeRounding=ds,e.relativeTimeThreshold=ls,e.calendarFormat=zt,e.prototype=zi;var fr=e;return fr});

//--->Moment Library - End
