/*
 * jQValid a jQuery Validation Plugin by Ongun Kanat, <ongun.kanat@gmail.com>
 * 
 * Last Edited: 2014-07-18
 */

(function( $ ) {
        
    $.fn.jQValid = function ( pluginOptions )
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
                        var jQvSettings = $.fn.jQValid.defaults;
                        if(pluginOptions != null) /* TODO: Fix Here */
                        {
                            jQvSettings = $.fn.jQValid.bootstrap3;
                        }
                        $.fn.jQValid.methods.validateElement($(this), jQvSettings);
                    });
                });
                
                /*
                 * TODO: Bind jQValid.ValidationChange and find valid/invalid elements
                 * then trigger jQValid.ValidationSuccess or jQValid.ValidationFail
                 */
            });
        });
    };
    
    $.fn.jQValid.methods = {
        validateElement: function(element, settings) {
            var patterns = $.fn.jQValid.validationPatterns;
            var result;
            // TODO: Do the validation work here
            if(element.is("input"))
            {
                switch(element.attr("type").toLowerCase())
                {
                    case "email":
                        result = this.Validation(element, patterns.email, settings);
                }
            }
            else if(element.is("textarea"))
            {
                
            }
            else if(element.is("select"))
            {
                
            }
            // TODO: Think about bootstrap.. Classes added to form groups, maybe a element of interest field can be added to guiFramework
            if(result)
            {
                element.attr("data-jqvalid-validity","valid");
                element.removeClass(settings.guiFramework.invalidClass);
                element.addClass(settings.guiFramework.validClass);
            }
            else
            {
                element.attr("data-jqvalid-validity","invalid");
                element.removeClass(settings.guiFramework.validClass);
                element.addClass(settings.guiFramework.invalidClass);
            }
            
            element.parents("form:not([novalidate])").first().trigger("jQValid.validationChange");
        },
        Validation: function(element, pattern, settings)
        {
            if( pattern.type == "regex" )
            {
                return this.regexValidation(element, pattern.regex, settings);
            }
            else if(pattern.type == "alias")
            {
                return this.Validation(element, pattern.dest, settings);
            }
        },
        // TODO: Generate different funtions
        regexValidation: function(element, regex, settings)
        {
            var checker = new RegExp(regex);
            return checker.test(element.val());
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
    
    $.fn.jQValid.bootstrap3 = {
      htmlScan: true,
      guiFramework: $.fn.jQValid.guiFrameworks.bootstrap3
    };

    
} (jQuery));