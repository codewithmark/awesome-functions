



  
//--->Storage Functions - Start
  
  //For Cookies
  var c =function(){}; 
  
  c.Enable = function () 
  {
    var cookieEnabled = (navigator.cookieEnabled) ? true : false;

    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled)
    { 
        document.cookie="testcookie";
        cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
    }
    return (cookieEnabled);
  };
    
  //--->Cookie Functions - Start
  c.Add = function (cname, cvalue, exdays) 
  {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  };

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
  };

  c.AddObjArr = function (cname, cvalue, exdays) 
  {
    var d = new Date();    
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    var ObjArrVal = JSON.stringify(cvalue); 

    document.cookie = cname + "=" + ObjArrVal + "; " + expires;
  };

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
  };

  c.Delete = function(name) 
  {
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };
  //--->Cookie Functions - End


//--->LocalStorage Functions - Start

  //For Local Storage Functions
  var ls = function(){};
 
  ls.DeleteAll = function () 
  {     
    localStorage.clear()    
  };

  ls.Delete = function (LookUpIndexKey) 
  {     
    localStorage.removeItem(LookUpIndexKey);     
  };

  ls.Exist = function (LookUpIndexKey) 
  {      
    var DataCheck =  ls.Get(LookUpIndexKey);
    return js.Size(DataCheck) >0 ? true : false;
  };

  ls.Empty = function (LookUpIndexKey) 
  { 
    if(ls.Exist(LookUpIndexKey))
    { 
      localStorage.setItem(LookUpIndexKey,'');
    }
  };

  //--->Store single value - Start
  ls.Add = function (LookUpIndexKey,Val) 
  { 
    localStorage.setItem(LookUpIndexKey,Val); 
  };

  ls.Get = function (LookUpIndexKey) 
  { 
    var Data = localStorage.getItem(LookUpIndexKey);
    if(Data && Data !="")
    {
      return Data;
    }    
  };
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
    var DataCheck =  ls.Get(LookUpIndexKey);
    
    if( js.Size(DataCheck) < 1)      
    {
      //Add new data
     localStorage.setItem(LookUpIndexKey,JSON.stringify(ObjVal) );
    } 
    else if(js.Size(DataCheck) >0)
    {
      var OldRowData =  JSON.parse( localStorage.getItem(LookUpIndexKey));

      //Combine old and and new
      var NewData = jQuery.extend(ObjVal, OldRowData);

      localStorage.setItem(LookUpIndexKey,JSON.stringify(NewData) ); 
    }
  }; 

  ls.GetObj = function (LookUpIndexKey) 
  { 
    var DataCheck =  ls.Get(LookUpIndexKey);

    if( js.Size(DataCheck) < 1 ) 
    {       
      return [];
    } 
    else if( js.Size(DataCheck) >0)
    {   
      return JSON.parse( localStorage.getItem(LookUpIndexKey) );       
    } 
  };

  ls.UpdateObj = function(LookUpIndexKey,FieldObjArrToUpdatValue,WhereObjArr) 
  { 
    var DataCheck =  ls.Get(LookUpIndexKey);

    if( js.Size(DataCheck) < 1 ) 
    {       
      return [];
    } 
    else if( js.Size(DataCheck) >0)
    {   
      var ObjArr = JSON.parse(DataCheck);
 
   
      //Find values to update
      var UpdatedValues =_.chain(ObjArr)
      .find(WhereObjArr)
      .merge(FieldObjArrToUpdatValue)
      .value();
      
      //Combine the values
      var NewValues = _.merge(ObjArr, UpdatedValues);

      //Delete old array value
      ls.Delete(LookUpIndexKey);
      
      //Add the updated values
      localStorage.setItem(LookUpIndexKey,JSON.stringify(NewValues)); 
       
    } 
  }; 
 
  //--->Store single row - End




  //--->Store multiple rows - Start
  
  ls.AddArr = function (LookUpIndexKey,ArrVal) 
  { 
    var UserArr = [ArrVal];
    //Check to see if there is already data in the IndexedKey/Table     
    var DataCheck =  ls.Get(LookUpIndexKey);
    
    if( js.Size(DataCheck) < 1) 
    {
      //Add new data
     localStorage.setItem(LookUpIndexKey,JSON.stringify(UserArr));
    } 
    else if(js.Size(DataCheck) >0)
    {      
      //Append data to old 
      var OldRowData = JSON.parse( localStorage.getItem(LookUpIndexKey) );
      
      var arr = [];

      //combine the old and new data
      //Will allow to add new columns on the fly
      var NewData =  _.concat(arr, OldRowData,UserArr);
      //var NewData = jQuery.merge(OldRowData,UserArr)

      localStorage.setItem(LookUpIndexKey,JSON.stringify(NewData));    
    }
  };

  ls.AddTempArr = function (LookUpIndexKey,ArrVal) 
  { 
    var UserArr = [ArrVal];
    //Check to see if there is already data in the IndexedKey/Table     
    var DataCheck =  ls.Get(LookUpIndexKey);
    
    if( js.Size(DataCheck) < 1) 
    {
      //No old data found 

      //Add new data
     localStorage.setItem(LookUpIndexKey,JSON.stringify(UserArr));
    } 
    else if(js.Size(DataCheck) >0)
    {    
      //Found old data

      //Delete old array value
      ls.Delete(LookUpIndexKey);   

      //Add new data
      localStorage.setItem(LookUpIndexKey,JSON.stringify(UserArr));
    }
  };
  
  ls.AddBulkArr = function (LookUpIndexKey,ArrVal) 
  { 
    var UserArr = ArrVal;
    //Check to see if there is already data in the IndexedKey/Table
    var DataCheck =  ls.Get(LookUpIndexKey);

    if( js.Size(DataCheck) < 1) 
    {
      //Add new data
     localStorage.setItem(LookUpIndexKey,JSON.stringify(UserArr));
    } 
    else if(js.Size(DataCheck) >0)
    { 
      //Found old data

      //Delete old array value
      ls.Delete(LookUpIndexKey);   

      //Add new data
      localStorage.setItem(LookUpIndexKey,JSON.stringify(UserArr));
    }
  };
  
  ls.AddTempBulkArr = function (LookUpIndexKey,ArrVal) 
  { 
    var UserArr = ArrVal;
    //Check to see if there is already data in the IndexedKey/Table
    var DataCheck =  ls.Get(LookUpIndexKey);

    if( js.Size(DataCheck) < 1) 
    {
      //No old data found 
      //Add new data
     localStorage.setItem(LookUpIndexKey,JSON.stringify(UserArr));
    } 
    else if(js.Size(DataCheck) >0)
    {      
      //Found old data

      //Delete old array value
      ls.Delete(LookUpIndexKey);   

      //Add new data
      localStorage.setItem(LookUpIndexKey,JSON.stringify(UserArr));  
    }
  };
  

  ls.CountArr = function (LookUpIndexKey) 
  { 
    //--->Check to see if it has any values - Start
    var DataCheck =  ls.Get(LookUpIndexKey);
   
    if( js.Size(DataCheck) < 1 ) 
    {       
      return [];
    }
    //--->Check to see if it has any values - End 

    else if( js.Size(DataCheck) > 0) 
    {
      //Get total rows   
      var GetRows = JSON.parse( localStorage.getItem(LookUpIndexKey) );     
      return js.Size(GetRows);
    } 
  };

  ls.GetAllArr = function (LookUpIndexKey) 
  {  
    //--->Check to see if it has any values - Start
    var DataCheck =  ls.Get(LookUpIndexKey);
   
    if( js.Size(DataCheck) < 1 ) 
    {       
      return [];
    }
    //--->Check to see if it has any values - End

    else if(js.Size(DataCheck) >0)
    {   
      return JSON.parse( localStorage.getItem(LookUpIndexKey) );
    } 
  };
 

  ls.GetArr = function(LookUpIndexKey,WhereValueEquals)
  { 
    //--->Check to see if it has any values - Start
    var DataCheck =  ls.Get(LookUpIndexKey);
   
    if( js.Size(DataCheck) < 1 ) 
    {       
      return [];
    }
    //--->Check to see if it has any values - End

    var OldRowData = JSON.parse( localStorage.getItem(LookUpIndexKey) );

    var Data = _.filter(OldRowData, WhereValueEquals); 

    if( js.Size(Data) < 1)
    {
      return [];
    } 
    else if( js.Size(Data) >0)
    {   
      return Data;
    } 
  };

  ls.UpdateArr = function(LookUpIndexKey,FieldObjArrToUpdatValue,WhereObjArr) 
  { 
    //--->Check to see if it has any values - Start
    var DataCheck =  ls.Get(LookUpIndexKey);
   
    if( js.Size(DataCheck) < 1 ) 
    {       
      return [];
    }
    //--->Check to see if it has any values - End

    var OldObjRowData = JSON.parse( localStorage.getItem(LookUpIndexKey) ); 

    var FindUpdateableValues = _.filter(OldObjRowData, WhereObjArr);
 
    var Arr1a = [];

    _.forEach(FindUpdateableValues, function(v1, key1) 
    {
      //Find values to update
      var UpdatedValues =_.chain(v1)
      .find(WhereObjArr)
      .merge(FieldObjArrToUpdatValue)
      .value();
      
      //Combine the values
      var d1 = _.merge(v1, UpdatedValues);

      //Converted into array(s)
      Arr1a.push(d1); 

    });

    var GetExcludeValues = _.reject(OldObjRowData, WhereObjArr);

    //Delete old array value
    ls.Delete(LookUpIndexKey);

    var AllValues =  _.concat(Arr1a, GetExcludeValues)

    //Add the updated values
    localStorage.setItem(LookUpIndexKey,JSON.stringify(AllValues)); 
  }; 

  ls.DeleteArr = function(LookUpIndexKey,WhereValueEquals)
  { 
    //--->Check to see if it has any values - Start
    var DataCheck =  ls.Get(LookUpIndexKey);
   
    if( js.Size(DataCheck) < 1 ) 
    {       
      return [];
    }
    //--->Check to see if it has any values - End


    var OldRowData = JSON.parse( localStorage.getItem(LookUpIndexKey) );

    //Find lookup data first
    var Data = _.filter(OldRowData, WhereValueEquals); 

    if( js.Size(Data) < 1)
    {      
      return [];
    } 
    else if( js.Size(Data) >0)
    {   
      var ExcludeLookupData =  _.reject(OldRowData, WhereValueEquals);

      //Delete old array value
      ls.Delete(LookUpIndexKey);
      //Add new array
      ls.AddBulkArr (LookUpIndexKey,ExcludeLookupData) 
    } 
  };
  //--->LocalStorage Functions - End

//--->Storage Functions - End