
//--->Form Functions - Start
  
  var frm =function(){};
  
  frm.IsEmpty = function(value)
  {
		var regexp  = /\S+/;
		return !regexp.test(value);
  };

  frm.IsAlphaNumeric = function (value) 
  {
    var regexp  = /^[0-9a-zA-Z]+$/;
    return !regexp.test(value);
  };

  frm.IsNoSpaces = function (value) 
  {
    var regexp  = /^\S+$/i;	 
    return !regexp.test(value);
  };

  frm.IsEmail = function (value) 
  {
    var regexp = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return !regexp.test(value);
  };

  frm.IsURL = function (value) 
  {
      var regexp = /^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i			
      return !regexp.test(value);
  };

  frm.IsNumber = function(value)
  {
    var regexp = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
    return !regexp.test(value);
  };

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
  };

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
  };
	
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
  };

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
  };
 
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
  };
 
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

  frm.IsJSON = function (something) 
  {
    if (typeof something != 'string')
        something = JSON.stringify(something);
    try {
        JSON.parse(something);
        return true;
    } catch (e) {
        return false;
    }
  };
//--->Form Functions - End