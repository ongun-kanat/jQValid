/*
 * jQValid a jQuery Validation Plugin by Ongun Kanat, <ongun.kanat@gmail.com>
 * 
 * Last Edited: 2014-06-06
 */

(function( $ ) {
        
    $.fn.jQValid = function ( arguments )
    {
        return this.each(function (){
            var affected_forms;
            if($(this).is("form"))
            {
                affected_forms = $(this);
            }
            else
            {
                affected_forms = $(this).find("form:not([novalidate])");
                if(affected_forms.length < 1)
                    return false;
            }
            
            affected_forms.each(function(){
                $(this).find("input, textarea, select").each(function(){
                    $(this).bind("keyup click change focus", function (evt){
                        $.fn.jQValid.methods.validateElement($(this));
                    });
                });
            });
        });
    };
    
    $.fn.jQValid.methods = {
        validateElement: function(element) {
            var patterns = $.fn.jQValid.validationPatterns;
            // TODO: Do the validation here
            if(element.is("input"))
            {
                switch(element.attr("type").toLowerCase())
                {
                    case "email":
                        this.regexValidation(element, patterns.email);
                        
                }
            }
            else if(element.is("textarea"))
            {
                
            }
            else if(element.is("select"))
            {
                
            }
        },
        // TODO: Generate different funtions
        regexValidation: function(element, regex)
        {
            
        }
    };
    
    // TODO: Make decision of patterns
    $.fn.jQValid.validationPatterns = {
        email : {
            type: "regex",
            regex: "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\\.[A-Za-z]{2,6}$"
        },
        url: {
            type: "regex",
            regex: "^((ftp|http|https):\/\/)?([a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+.*)\.[A-Za-z]{2,6}$"
        }
    };
    
    $.fn.jQValid.guiFrameworks = {
        default:{
            validClass: "jqvalid-ok",
            invalidClass: "jqvalid-err"
        },
        bootstrap3:{
            validClass: "has-success",
            invalidClass: "has-error"
        }
            
    };
    
    $.fn.jQValid.defaults = {
      htmlScan: true,
      guiFramework: $.fn.jQValid.guiFrameworks.default
    };
    
    
} (jQuery));