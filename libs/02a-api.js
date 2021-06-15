

//--->API Call Functions - Start

var api = function(){}; 

	

  //--->User Location Info Function - Start
  api.UserLoc = function(callback) 
  {
    var deferred = new jQuery.Deferred(); 
    if (jQuery.isFunction(callback)) 
    {
      deferred.then(callback);
    }
    //Make the api call

    jQuery.getJSON("https://apimk.com/ip.json", function(data, status)
    {   		 
    	deferred.resolve(data);
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
	jQuery.getJSON("https://apimk.com/ismobile.json", function(data, status)
	{  		
		deferred.resolve(data);

	}); 
    return deferred.promise();
  }; 

  //--->User Device Access Function - End  	
	 
    
//--->API Call Functions - End 