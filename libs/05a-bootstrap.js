//--->Bootstrap Functions - Start

 var bs =function(){};
 
  bs.bs_toast = function (obj) 
  {
    var toast_header = obj.header;
    var toast_body  = obj.content;
    var toast_el  = obj.el;
    var toast_class = obj.class;

    //remove old toast containers
    $(document).find('.toast').remove();

    var s1 = ''
    +'<div class="toast mt-3 '+toast_class+'">' 
        +'<div class="toast-body">'+toast_body+'</div>'
      '</div>';
      toast_el.html(s1);
      toast_el.find('.toast').toast({animation: false, delay: 2000});
    toast_el.find('.toast').toast('show');
  };
  bs.ShowError = function (errorText,ElementObjID) 
  {
		var strDiv = ''; 
		strDiv += '<div class="derr">';		
		strDiv += '<div class="alert alert-danger  form-control" style="padding:5px;font-size:14px"  > <i class="fa fa-exclamation-triangle "></i>  '+ errorText+'</div>';
		strDiv += '</div>';
		
    ElementObjID.after(strDiv);
    ElementObjID.css( "background-color", "yellow");
    ElementObjID.focus();
  };

  bs.ClearError = function ()
  {
    jQuery( ".derr" ).prevAll().css( "background-color", "");   

    //In case if remove (above) doesn't work
    jQuery(".derr").hide();
    jQuery(".derr").remove();
  };

  bs.WaitingMsg = function (Msg)
  {
    var strDIV  = '';
    strDIV  +=  '<div id="MsgBox"   class="derr bg-info alert alert-info derr" style="font-size: 40px;padding:10px;">';
    strDIV  +=  '<i class="fa fa-refresh fa-spin "></i> '+Msg+' ';
    strDIV  +=  '</div>';
    return strDIV;
  };

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
  };

  bs.confirm = function(ObjArrOptions)
  { 
    jQuery.confirm(ObjArrOptions);
  }; 


  bs.CheckingMsg = function (ElementObjID,Msg)
  {
    var AlertDIV= '<div  class="derr alert alert-warning" role="alert"> <i class="fa fa-spinner fa-spin"></i> '+Msg+'</div>';
    ElementObjID.after(AlertDIV); 
  };

  bs.CreateButton = function (ButtonText,ID,Class,Addon)
  {
    var template = '';
    template += '<button type="button" id="'+ID+'" name="'+ID+'"  class="btn '+Class+'" '+ Addon + ' >';
    template += ' '+ButtonText
    template += ' </button>';  
    return template;
  };

  
  //--->Input Field Functions - Start

  bs.CreateInputField = function (Value,ID,Class,Addon)
  {
    var template = '';
    template = '<div class="form-group form-inline">';
    template += '<input type="text"  id="'+ID+'" name="'+ID+'" class="form-control '+Class+'" '+Addon+' value="'+Value+'">';
    template += '</div>';
    return template;
  };

  bs.CreateHiddenInputField = function (Value,ID,Class,Addon)
  {
    var template = '';
    template = '<div class="form-group" style="display:none;">';
    template += '<input type="text"  id="'+ID+'"name="'+ID+'" class="form-control '+Class+'" '+Addon+' value="'+Value+'">';
    template += '</div>';
    return template;
  };
  
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
  };

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
  };
   

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
  };

  //--->Input Field Functions - End
 



  //--->Text Box Functions - Start

  bs.CreateTextBox = function (Value,ID,Class,Addon)
  {
    var template = ' ';
    template += '<div class="form-group form-inline"  >';
    template += '<textarea name="'+ID+'" id="'+ID+'" class="form-control  '+Class+'"  '+Addon+' >'+Value+'</textarea>';
    template += '</div>';  
    return template;    
  };

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
  };

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
  }; 


  bs.Tabs = function (ObjArr)
  { 
    /* 
      Will create a Bootstrap tab screen

      //example tab data array
      var arr = [ 
        {tab_name:'tab 1', tab_content: "this is my tab 1 contain is"},
        {tab_name:'tab 2', tab_content: "this is my tab 2 "},
      ]
    */
    //Get object Arr
    var arr = ObjArr; 

    var id  = Math.random().toString(36).substr(2)

    //--->get tab name - start
    var strTabName = '';
    strTabName +='<ul class="nav nav-tabs" role="tablist">';
    arr.forEach( function(element, index) 
    {
      var tab_id =  (element.tab_name).replace(/[^\w]+/g, '-') +'-id-'+id
      var tab_name = element.tab_name
      if(index <1)
      {
        strTabName +='<li role="presentation" class="active"><a href="#'+tab_id+'"  role="tab" data-toggle="tab">'+tab_name+'</a></li>'
      }
      else
      {
        strTabName +='<li role="presentation"><a href="#'+tab_id+'"  role="tab" data-toggle="tab">'+tab_name+'</a></li>'
      }
       
    });
    strTabName +='</ul>';
    //--->get tab name - end

    //--->get tab content - start
    var strTabContent = '';
    strTabContent +='<div class="tab-content" style="padding:10px;">';
    arr.forEach( function(element, index) 
    {
      var tab_id =  (element.tab_name).replace(/[^\w]+/g, '-') +'-id-'+id
      var tab_content = element.tab_content
      if(index <1)
      {
        strTabContent +='<div role="tabpanel" class="tab-pane active '+tab_id+'" id="'+tab_id+'">'+tab_content+'</div>'
      }
      else
      {
        strTabContent +='<div role="tabpanel" class="tab-pane '+tab_id+'" id="'+tab_id+'">'+tab_content+'</div>'
      }
       
    });
    strTabContent +=' </div>';
    //--->get tab content - end

    var strTabDiv = ''
    +'<div class="panel panel-default"  >'
      + '<div style="padding:10px;">'
        + strTabName
        + strTabContent
      + '</div>'
    + '</div>'
    //console.log(strTabDiv)
    return strTabDiv;
    
  };

  bs.Panel = function (object_data)
  { 
   /* 
      Will create a Bootstrap panel screen

      //example panel object data
      var object_data =
      {
        panel_header:'header', 
        panel_content: "this is my panel 1 content",
        panel_footer: "footer",
        panel_class: "default",
         
      }
    */
    //Get object Arr
    var obj = object_data  

    var panel_class = obj.panel_class ? obj.panel_class : 'default' 

    var strDIV = ''
    strDIV += '<div class="panel panel-'+panel_class+'"  >'

            if(obj.panel_header)
            {
              strDIV +='<div class="panel-heading" >'+ obj.panel_header + '</div>'
            }

            strDIV += '<div style="padding:10px;"></div>'

            strDIV +='<div class="panel-body" >' + obj.panel_content+ '</div>'

            if(obj.panel_footer)
            {
              strDIV +='<div class="panel-footer" >'+ obj.panel_footer + '</div>'
            }
    strDIV +='</div>'

    return strDIV
  };
  
  bs.Modal = function (object_data)
  {
    /* 
      Will create a Bootstrap Modal

      //example panel object data
      var object_data =
      {
        ModalTitle:'ModalTitle', 
        ModalBodyContent: "this is my Modal Body Content ",
      }

    */

    //remove all old modals first
    jQuery(document).find('.modal').remove();

    var modalHTML =''+
    '<div class="modal fade np-modal" id="myModal" role="dialog">'+
      
      //--->Modal - Stat
      '<div class="modal-dialog modal-lg">'+

        '<div class="modal-content">'+
          
          //--->Modal Header - Start
          '<div class="modal-header">'+
            //Close button
            '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
            //Title
            '<h4 class="modal-title">'+object_data.ModalTitle+'</h4>'+

          '</div>'+
          //--->Modal Header - End

          //--->Modal Body - Start
              '<div class="modal-body">'+
                ''+object_data.ModalBodyContent+''+
              '</div>'+
              //--->Modal Body - End

              //--->Modal Footer - Start
              '<div class="modal-footer">'+
                '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
              '</div>'+
              //--->Modal Footer - End


        '</div>'+

      '</div>'+
      //--->Modal - End
    '</div>';
    
    //add new modal to body
    jQuery('body').append(modalHTML);

    jQuery('#myModal').modal('show');
  };

//--->Bootstrap Functions - End