

//--->JS Functions - Start
 
  var js = function(){}; 

	js.Int = function(StringVal)
	{
		return parseInt(StringVal);
	};
 
  js.AutoCode = function (n)
  {
      if(!n)
      {
        n = 8;
      }
      var text = '';
      var t1 = new Date().getTime();
      var possible =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'+ t1;

      for(var i=0; i < n; i++)
      {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
  };

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
  };
   

  js.ChangePageTitle =  function (strNewPageTitle)
  {  
    //This will change the title of the page dynamically
    var stTitle = jQuery(document).attr("title", strNewPageTitle); 
  };
 
  js.FormatDateTime = function (value,FormatType) 
  {
    return js.Date(value,FormatType);
  };

  js.Date = function (value,FormatType) 
  {
    var get_val, get_format; 

    if(!value)
    {
      get_val = new Date()
    }
    else if(value)
    {
       get_val = new Date(value).toISOString()
    }

    if(!FormatType)
    {
      get_format = moment(get_val).format() 
    }
    else if(FormatType)
    {
      get_format = moment(get_val).format(FormatType)      
    }    
    return get_format;     
  };

   
  js.GetFutureDate =  function (DaysIntoFuture,FormatType)
  {
    var n=DaysIntoFuture; //number of days to add. 

    if(!DaysIntoFuture)
    {
      var d = moment().add(1, 'day'); 
    }
    if(DaysIntoFuture)
    {
      var d = moment().add(n, 'day');
    }
    
    var data = FormatType !='' ? moment(d).format(FormatType)  : moment(d).toDate() ;
    return data; 

  };

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
  };

  js.IsOnline = function () 
  {
    var Connect  = navigator.onLine ? 'online' : 'offline';
    return Connect; 
  };

  js.GetFolderPath = function () 
  {
    //Will get the path to dir level not file.
    //i.e. http://codewithmark.com/download/123.mp3 
    //will return http://codewithmark.com/download/
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
  };

  js.GetSiteURL = function ()
  {
    var URL = location.protocol + '//' + location.host+ '/'; 
    return URL; 
  };

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
  };
	
	js.DLExt = function (ExtArr)
	{
		var DLExt;
		if(!ExtArr)
		{
			DLExt = ["zip", "rar", "mp3","mp4" ,"pdf", "docx", "pptx", "xlsx",];	
		}	
		else if(ExtArr)
		{
			DLExt = ExtArr; 
		}
		
		return DLExt;
	};

	js.IsHrefExternal = function(HrefLinkSite)
	{
		var LocSite = location.hostname;
		if(LocSite != HrefLinkSite)
		{ 
			//console.log('external link');
			//External link			
			return 'yes';
		}
	};
	
	js.GetFileName = function(FileURL)
	{
		var GetFileName = FileURL.substring( FileURL.lastIndexOf('/')+1 );
		var RemoveFileExt = GetFileName.split('.')[0];
		return RemoveFileExt;
	};
	
	js.GetFileExt = function(FileURL)
	{
		return FileURL.split('.').pop().toLowerCase();
	};
	
	
	
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
 
	};

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
		
    //--->Add external link with no follow- Start
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
            
            var get_current_rel = jQuery(this).attr('rel');

            if(get_current_rel =='follow')
            {
              jQuery(this).attr('target', '_blank')
              return false
            }
            else if(FollowCheck !='yes')
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
                  rel: 'nofollow noopener'
                });
              }
              else
              {
                jQuery(this).after(' <i class="fa fa-external-link" style="font-size:10px; Position:relative; top: -5px;"></i>').attr(
                {
                  target: '_blank',
                  rel: 'nofollow noopener'
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
        }
    });
    //--->Add external link with no follow - End

    js.HideDLLinks();     
  };
	
  //--->Hide dl link info - Start
  js.HideDLLinks = function ()
  {
    //--->Mouse over hide - Start
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
    //--->Mouse over hide - End

    //--->Mouse out hide - Start
    jQuery("a").mouseout(function()
    {
      var LocSite = location.hostname;
      var HrefLinkSite = this.hostname;
      var GetDLLink = jQuery(this).attr('data-dl-link');
      if(GetDLLink) 
      {         
        jQuery(this).attr("href",js.AutoCode(5) );
      }        
    });
    //--->Mouse out hide - End
    

    //--->Create auto download link - Start
    var sessionStorageID = "SessionLinks";

    jQuery("a").filter(function()  
    {
      var DLExt = js.DLExt();

      var href = jQuery(this).attr('href');
      var LinkText = jQuery(this).text();

      var GetFileExt = href.split('.').pop().toLowerCase();
     
      if(jQuery.inArray(GetFileExt, DLExt) != -1) 
      {  
        jQuery(this).attr('download', 'download');

        var WhereObjArr = {'LinkText' : LinkText }
        var LinkCheck = ls.GetArr(sessionStorageID,WhereObjArr);

        var LinkID = js.MD5('',5);

        if(js.Size(LinkCheck) < 1)
        { 
          var PageLink_Encoded = js.Encode(href);
          var d1 =  { 'LinkID' : LinkID, 'PageLink' : PageLink_Encoded, 'href':  href, 'LinkText':LinkText, };
          
          ls.AddArr(sessionStorageID,d1);

          jQuery(this).attr({ href:LinkID});
          jQuery(this).attr('data-dl-link', LinkID);
        }
        else if (js.Size(LinkCheck) >0)
        {
          jQuery(this).attr({ href:LinkID});
          jQuery(this).attr('data-dl-link', LinkCheck[0].LinkID);
        }
      }  
    });
    //--->Create auto download link - End

    //--->Download Click Event - Start
    jQuery( document ).on( 'click', 'a', function(e) 
    {
      var LinkID =jQuery(this).attr('data-dl-link');

      if(LinkID)
      { 
        var WhereObjArr   = {'LinkID' : LinkID }
        var LinkCheck     = ls.GetArr(sessionStorageID,WhereObjArr);
        var GetLink       = js.Decode(LinkCheck[0].PageLink);

        jQuery(this).attr({ href:GetLink});

      } 
    });
    //--->Download Click Event - End
  };
  //--->Hide dl link info - End

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
	};

	js.TableToJSON = function (TableElementID) 
	{ 
    //using table to json plugin
		var ArrData = TableElementID.tableToJSON(); 
		return ArrData;
	}; 
	
  js.EnterKey = function(ElementID,callback)
  {  
    $(document).on('keypress',ElementID, function(event) 
    { 
        var code = (event.keyCode ? event.keyCode : event.which); 
        if (code == 13) 
        {
          callback(event);
        }
    });
  }; 
	
	js.PrintThis = function(ElementContent)
	{   
		w=window.open();
		w.document.write(ElementContent);
		w.print();
		w.close();
	};	
  
  js.LimitChar = function (str, len) 
  {     
    return str.substr(0, len);
  }; 

  js.DataType = function (obj) 
  { 
    var text = obj.constructor.toString()     
    var str = (text.match(/function (.*)\(/)[1]).toLowerCase()
    return str
  };


  js.Size = function (collection) 
  { 
    //using lodash plugin
    var ArrData = _.size(collection); 

    return ArrData
  };  

  js.size1 = function (collection) 
  { 
    var str = typeof(collection)

    if(str ==="number" || str ==="string")
    {
      var d1 = str.toString()
      return collection.toString().length 
    }
    else if(str ==="object" || str ==="array")
    {
      return Object.keys(collection).length
    }    
  }; 

  js.Escape = function (str) 
  { 
    var ArrData = _.escape(str); 
    return ArrData;
  }; 

  js.UnEscape = function (str) 
  { 
    var ArrData = _.unescape(str); 
    return ArrData;
  }; 

  js.GetUserRef = function (str) 
  { 
    var str = document.referrer != '' ? document.referrer: 'direct';
    return str; 
  }; 

  js.URLEncode = function (str) 
  { 
    return encodeURIComponent(str); 
  }; 

  js.URLDecode = function (str) 
  { 
    return decodeURIComponent(str); 
  }; 


  js.MD5 = function (str, len) 
  { 
    if(js.Size(str) >0)
    {
      var GetMD5 = $.md5(str);
    }
    else
    {
      var dt = new Date();
      var d = js.AutoCode(10) + js.FormatDateTime  ('','x') + dt + js.AutoCode(100);
      var GetMD5 = $.md5(d);
    } 
    return len> 0 ? js.LimitChar(GetMD5, len) :  GetMD5 
  }; 


  js.Encode = function (stringToEncode) 
  { 
    if (typeof window !== 'undefined') 
    {
      if (typeof window.btoa !== 'undefined') 
      {
          return window.btoa(unescape(encodeURIComponent(stringToEncode)))
      }
    } 
    else 
    {
      return new Buffer(stringToEncode).toString('base64')
    }

    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    var o1
    var o2
    var o3
    var h1
    var h2
    var h3
    var h4
    var bits
    var i = 0
    var ac = 0
    var enc = ''
    var tmpArr = []

    if (!stringToEncode) 
    {
      return stringToEncode
    }

    stringToEncode = unescape(encodeURIComponent(stringToEncode))

    do 
    {
      // pack three octets into four hexets
      o1 = stringToEncode.charCodeAt(i++)
      o2 = stringToEncode.charCodeAt(i++)
      o3 = stringToEncode.charCodeAt(i++)

      bits = o1 << 16 | o2 << 8 | o3

      h1 = bits >> 18 & 0x3f
      h2 = bits >> 12 & 0x3f
      h3 = bits >> 6 & 0x3f
      h4 = bits & 0x3f

      // use hexets to index into b64, and append result to encoded string
      tmpArr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4)
    } while (i < stringToEncode.length)

    enc = tmpArr.join('')

    var r = stringToEncode.length % 3

    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3)
  };

  js.Decode  = function (encodedData) 
  { 
    if (typeof window !== 'undefined') 
    {
      /*
      if (typeof window.atob !== 'undefined') 
      {
          return decodeURIComponent(escape(window.atob(encodedData)))
      }
      */
    } 
    else 
    {
      return new Buffer(encodedData, 'base64').toString('utf-8')
    }

    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    var o1
    var o2
    var o3
    var h1
    var h2
    var h3
    var h4
    var bits
    var i = 0
    var ac = 0
    var dec = ''
    var tmpArr = []

    if (!encodedData) 
    {
      return encodedData
    }

    encodedData += ''

    do 
    {
      // unpack four hexets into three octets using index points in b64
      h1 = b64.indexOf(encodedData.charAt(i++))
      h2 = b64.indexOf(encodedData.charAt(i++))
      h3 = b64.indexOf(encodedData.charAt(i++))
      h4 = b64.indexOf(encodedData.charAt(i++))

      bits = h1 << 18 | h2 << 12 | h3 << 6 | h4

      o1 = bits >> 16 & 0xff
      o2 = bits >> 8 & 0xff
      o3 = bits & 0xff

      if (h3 === 64) 
      {
        tmpArr[ac++] = String.fromCharCode(o1)
      } 
      else if (h4 === 64) 
      {
        tmpArr[ac++] = String.fromCharCode(o1, o2)
      } 
      else 
      {
        tmpArr[ac++] = String.fromCharCode(o1, o2, o3)
      }
    } while (i < encodedData.length)

    dec = tmpArr.join('')

    return decodeURIComponent(escape(dec.replace(/\0+$/, '')))
  };


	js.PrettyURL = function (ElementID) 
	{ 

		jQuery(document).on('keyup', ElementID, function(event) 
		{
			var UserElementID = ElementID;

			var val = UserElementID.val().toLowerCase();
			//Set to lower case first
			UserElementID.val(val);

			if(val.match(/[^\w-]/) )
			{ 
				var v1 = val.replace(/[^\w]+/g, '-');
				UserElementID.val(v1);
			}
			if (val.match(/^-/)) 
			{

				var v1 = val.replace(/^-+/, '');
				UserElementID.val(v1);
			}
		});
	}; 

	js.Ajax = function (CallType,AjaxURL,DataString)
	{  
		return $.ajax(
		{
		  type: CallType,
		  url: AjaxURL,
      cache: false, 
		  data: DataString,
		  dataType: "json"
		});
	}

  js.CreateTable = function (DataArr,Columns) 
	{
		var GetHeaderNames = js.Size(Columns) <1 ? DataArr[0] : Columns;
		var GetRows = DataArr;

		var d ='';
		d += '<table class="table table-hover table-bordered " width="100%">';

		//--->Create Header- Start
		d += '<thead>';
		d += '<tr>';
		$.each(GetHeaderNames,function(index, value)
		{
			var col_value = js.Size(Columns) <1 ? index : value;
			//d += '<th >'+_.startCase(col_value)+'</th>';
      d += '<th >'+col_value+'</th>';      
		})
		d += '</tr>';
		d += '</thead>';
		//--->Create Header- End

		//--->Create Rows - Start
		d += '<tbody>';
		jQuery.each(GetRows,function(index, v1)
		{
			d += '<tr>';
			jQuery.each(v1,function(index, v2)
			{
				d += '<td id="myTable" >'+v2+'</td>';
			})
			d += '</tr>';
		})
		d += "</tbody>";
		//--->Create Rows - End

		d +=" </table>";
		return d;
	};

  js.IsMobile = function () 
  {
    var a = navigator.userAgent || navigator.vendor || window.opera
      return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)));
  }; 

  js.IsIncluded = function(FileURL)
  {
    var get_file_type = FileURL.split('.').pop().toLowerCase()

    //--->do js > start
      if(get_file_type == 'js')
      {
          var get_links    = document.getElementsByTagName('script')

          //--->loop through all the links > start
          var arr = []
          for (var i = 0; i < get_links.length; i++) 
          {
              var v1 =  get_links[i] 
              var link = v1.src

              if(link == FileURL)
              {   
                  arr.push(FileURL)
              }
          } 
          //--->loop through all the links > end

          //--->found file in header > start
          if(arr.length > 0)
          {
              return arr
          }
          //--->found file in header > end
      }

      //--->do js > end


      //--->do css > start
      if(get_file_type == 'css')
      {
          var get_links    = document.getElementsByTagName('link')

          //--->loop through all the links > start
          var arr = []
          for (var i = 0; i < get_links.length; i++) 
          {
              var v1 =  get_links[i] 
              var link = v1.href

              if(link == FileURL)
              {       
                  arr.push(FileURL)
              }
          } 
          //--->loop through all the links > end

          //--->found file in header > start
          if(arr.length > 0)
          {
              return arr
          }
          //--->found file in header > end
      }

      //--->do css > end

      return false
  };

  js.IncludeOnce = function(FileURL)
  {
    var get_file_type = FileURL.split('.').pop().toLowerCase()

    //--->do js > start
      if(get_file_type == 'js')
      {
          var get_links    = document.getElementsByTagName('script')

          //--->loop through all the links > start
          var arr = []
          for (var i = 0; i < get_links.length; i++) 
          {
              var v1 =  get_links[i] 
              var link = v1.src

              if(link == FileURL)
              {   
                  arr.push(FileURL)
              }
          } 
          //--->loop through all the links > end

          //--->add to header > start
          if(arr.length < 1)
          {
              var head = document.getElementsByTagName('head')[0]
              var script = document.createElement('script')
              script.src = FileURL
              script.type = 'text/javascript'
              head.appendChild(script)
          }
          //--->add to header > end
      }

      //--->do js > end


      //--->do css > start
      if(get_file_type == 'css')
      {
          var get_links    = document.getElementsByTagName('link')

          //--->loop through all the links > start
          var arr = []
          for (var i = 0; i < get_links.length; i++) 
          {
              var v1 =  get_links[i] 
              var link = v1.href

              if(link == FileURL)
              {       
                  arr.push(FileURL)
              }
          } 
          //--->loop through all the links > end

          //--->add to header > start
          if(arr.length < 1)
          {
              var head = document.getElementsByTagName('head')[0];
              var script = document.createElement('link');
              script.href = FileURL;
              script.rel = 'stylesheet';
              head.appendChild(script)
          }
          //--->add to header > end
      }
      //--->do css > end
  };


  js.RemoveOnce = function(FileURL)
  {
    var get_file_type = FileURL.split('.').pop().toLowerCase()

    //--->do js > start
      if(get_file_type == 'js')
      {
          var get_links    = document.getElementsByTagName('script')

          //--->loop through all the links > start
          var arr = []
          for (var i = 0; i < get_links.length; i++) 
          {
              var v1 =  get_links[i] 
              var link = v1.src

              if(link == FileURL)
              {   
                  arr.push(FileURL)
                  v1.parentNode.removeChild(v1)
              }
          } 
          //--->loop through all the links > end        
      }
      //--->do js > end


      //--->do css > start
      if(get_file_type == 'css')
      {
          var get_links    = document.getElementsByTagName('link')

          //--->loop through all the links > start
          var arr = []
          for (var i = 0; i < get_links.length; i++) 
          {
              var v1 =  get_links[i] 
              var link = v1.href

              if(link == FileURL)
              {       
                  arr.push(FileURL)
                  v1.parentNode.removeChild(v1)
              }
          } 
          //--->loop through all the links > end 
      }
      //--->do css > end
  };

  js.FileSize = function(size)
  {
    var i = Math.floor(Math.log(size) / Math.log(1024));
    var s = 
    {
      size: (size / Math.pow(1024, i)).toFixed(2) * 1,
      type:['B', 'kB', 'MB', 'GB', 'TB'][i]
    };
    return s; 

  };

  js.FileRename = function (filename) 
  {
    return filename.replace(/\s+/g, '-').toLowerCase(); 
  };

  js.RemoveCurrentTableRow = function (ele) 
  {  
      ele.closest('tr').css('background-color', 'red');
      
      ele.closest('tr').fadeOut('slow', function()
      {
        $(this).remove();
      });   
  };

  js.SelectUnselectCheckbox = function  (this_el, select_el) 
  {
    if(this_el.prop("checked"))
    {
      select_el.prop('checked', true);
    }
    else
    { 
      select_el.prop('checked', false);        
    }
  };

  js.RemoveAllCheckedValue = function (ele) 
  {  
    ele.each(function(index, v1)
    {   
      if($(this).prop("checked")) 
      {
        $(this).closest('tr').css('background-color', 'red');
        
        $(this).closest('tr').fadeOut('slow', function()
        {
          $(this).remove();
        }); 
      } 
    });
  };

  js.GetAllCheckedValues = function (ele, attr_lookup) 
  {  
    var get_obj = [];
    ele.each(function(index, v1)
    {   
      if($(this).prop("checked")) 
      {
        get_obj.push($(this).attr(attr_lookup));
      } 
    });     
    return get_obj;
  };

  js.AjaxUpload = function(CallType,AjaxURL,DataString,ele_progress_bar)
  {
    return $.ajax(
    {
      xhr: function () 
        {
          var xhr = $.ajaxSettings.xhr();
          var ele = ele_progress_bar;

          var str = ''
          +'<div class="ajax_progress_bar" >'
              +'<div class="progress" style="height:50px;">'
                  +'<div class="progress-bar  progress-bar-success" style="width: 0%; padding:12px;font-size:18px;" >1%</div>'
              +'</div>'
          +'</div>';
          ele.html(str);

            xhr.upload.onprogress = function (e) 
            {
              var percentage = Math.floor(e.loaded / e.total * 100);             

              ele.find('.ajax_progress_bar').find('.progress-bar').html(percentage+'%'+' Complete');
              ele.find('.ajax_progress_bar').find('.progress-bar').css('width', percentage + '%');

                if(percentage >=100)
                {
                  var d = bs.WaitingMsg("Please wait....Processing your files");
                  ele.html(d);
                }
            };
            return xhr;
        },
      url: AjaxURL,
      type: CallType,
      data: DataString,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json"
    });
  };



//--->JS Functions - End 