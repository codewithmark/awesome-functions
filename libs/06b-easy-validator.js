
//--->easy validator > start 
(function($) 
{
	//--->easyvalidator plugin > start
	$.fn.easyvalidator = function(options) 
	{
		//base DOM element			
		var base_ele = this;

		//--->add css classes > start
		if(!$(document).find('.easyvalidator-alert-classes').length)
		{
			var str = ''
			+'<div class="easyvalidator-alert-classes">'
				+'<style>'
					+'.ev-alert{border-bottom: 1px solid #f50202;background: yellow;}'
					+'.ev-alert-msg{color: red;}'
				+'</style>'
			+'</div>';
			$(str).appendTo('body');					 
		}				
		//--->add css classes > end

		//remove all old alerts first	
		clear_alerts (base_ele);

		var toReturn = null;

		//this.find('.easyvalidator').each(function() 
		//base_ele.find('input').each(function() 
		base_ele.find('input, textarea, checkbox, select').each(function() 			 
		{
			var e1 = $(this);

			var tag_name = e1[0].tagName.toLowerCase(); 

			//perform only if easy validator required exist
			//var data_type = e1.attr('ev-type') ? e1.attr('ev-type') : e1.attr('type');
			var required_check = e1.attr('required');


			//if(data_type && required_check)
			if( required_check )
			{
				//var ev_type = data_type.trim();
				var ev_msg = e1.attr('ev-msg'); 

				//--->validate input tags > start
				if(tag_name =="input")
				{
					var data_type = e1.attr('ev-type') ? e1.attr('ev-type') : e1.attr('type');
					if(data_type == "text" || data_type == "password"  )
					{
						if(is_empty(e1.val()) )
						{
							toReturn = e1.val();					 
							create_alert_msg(e1,ev_msg);
							return false;	
						}
					}
					else if(data_type == "number" || data_type == "tel")
					{ 
						if(is_empty(e1.val()) )
						{
							toReturn = e1.val();					 
							create_alert_msg(e1,ev_msg ? ev_msg : 'only numeric value allowed' );
							return false;
						}
						else if(is_number(e1.val()))
						{
							toReturn = e1.val();						 
							create_alert_msg(e1,ev_msg ? ev_msg :  'only numeric value allowed' );
							return false;
						}					
					}
					else if(data_type == "email" && is_email(e1.val() ) )
					{
						toReturn = e1.val();					 
						create_alert_msg(e1,ev_msg ? ev_msg :  'enter a vaild email'  );
						return false;	
					}
					else if(data_type == "url" && is_url(e1.val() ) )
					{
						toReturn = e1.val();
				 		create_alert_msg(e1,ev_msg ? ev_msg :  'enter a vaild url'  ); 
						return false;	
					}
					else if(data_type == "checkbox" && !e1.prop("checked") )
					{
						toReturn = e1.val();
				 		create_alert_msg(e1,ev_msg  ); 
						return false;	
					}
				}
				//--->validate input tags > end

				//--->validate textarea tags > start
				else if(tag_name =="textarea")
				{
					if(is_empty(e1.val()) )
					{	
						if(is_empty(e1.val()) || e1.val()=="none")
						{
							toReturn = e1.val();					 
							create_alert_msg(e1,ev_msg);
							return false;
						} 
					}
				}
				//--->validate textarea tags > end

				//--->validate select tags > start
				else if(tag_name =="select")
				{
					if(is_empty(e1.val()) )
					{	
						if(is_empty(e1.val()) || e1.val()=="none")
						{
							toReturn = e1.val();					 
							create_alert_msg(e1,ev_msg);
							return false;
						} 
					}
				}
				//--->validate select tags > end
			}
		});

		//finished validating
		if(toReturn == null)
		{
			//--->create an object with value > start
			var ret_obj = {};
			base_ele.find('input, textarea, checkbox, select').each(function() 			 
			{
				var e2 = $(this);
				var tag_name = e2[0].tagName.toLowerCase(); 
				var data_type = e2.attr('ev-type') ? e2.attr('ev-type') : e2.attr('type');
				var obj_name= e2.attr('ev-obj-name');

				if(obj_name)
				{
					//--->input tags > end
					if(tag_name =="input")
					{
						var data_type = e2.attr('ev-type') ? e2.attr('ev-type') : e2.attr('type');
						if(data_type == "checkbox" )
						{
							ret_obj[obj_name] =  e2.prop("checked") ? "yes" : "no";
						}
						else
						{
							ret_obj[obj_name] = e2.val();
						}						
					}				
					//--->input tags > end				

					//--->textarea tags > start
					else if(tag_name =="textarea")
					{
						ret_obj[obj_name] = e2.val();
						 
					}
					//--->textarea tags > end

					//--->select tags > start
					else if(tag_name =="select")
					{
						ret_obj[obj_name] = e2.val(); 
					}
					//--->select tags > end
				}
			});
			//--->create an object with value > end

			clear_alerts (base_ele);
			return ret_obj; 
		}
	}
	//--->easyvalidator plugin > start

	//--->private functions > start

	function clear_alerts (ele)
	{
		ele.find('input, select, textarea, checkbox').removeClass('ev-alert');
		ele.find('.alert-msg').remove();
	}
	function create_alert_msg (ele, msg)
	{
		var alert_msg = msg ? msg : 'required field';
		var str = ''
		+'<span class="alert-msg ev-alert-msg" >'
			+'<br>'
			+alert_msg
		+'</span>';
		ele.after(str);				
		ele.addClass('ev-alert');				 
		ele.focus();
	}

	function is_no_spaces (value) 
	{
		var regexp  = /^\S+$/i;	 
		return !regexp.test(value);
	}

	function is_empty(value)
	{
		var regexp  = /\S+/;
		return !regexp.test(value);
	}
	
	function is_email (value) 
	{
		var regexp = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		return !regexp.test(value);
	}
	
	function is_url (value) 
	{
		var regexp = /^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i			
		return !regexp.test(value);
	}
	

	function is_number(value)
	{
		var regexp = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
		return !regexp.test(value);
	}

	//--->private functions > end

})(jQuery, window, document);

//--->easy validator > end