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
                var validatableElements = $(this).find("input:not([data-jqvalid-skip]), select:not([data-jqvalid-skip]), textarea:not([data-jqvalid-skip])");
                    
                validatableElements =  validatableElements.filter(
                        "input[type=email], input[type=url], input[type=tel], \
                        input[type=number], input[required], input[type=text][data-jqvalid-regex], \
                        input[max],input[maxlength], input[min], input[minlength], \
                        input[type=checkbox][data-maxitems], input[type=checkbox][data-minitems], \
                        select[required], select[data-minitems], select[data-maxitems], textarea[required], \
                        texarea[maxlength], textarea[minlength]");
                validatableElements.each(function(){
                    $(this).bind("keyup click change focus", function (evt){
                        var jQvSettings = $.fn.jQValid.defaults;
                        if(pluginOptions == "bootstrap3") /* TODO: Use .apply() , create init function(?), they are belong to init process so determine method or option by if ( typeof pluginOptions === "object" ) */
                        {
                            jQvSettings = $.extend({}, $.fn.jQValid.defaults ,$.fn.jQValid.bootstrap3);
                        }
                        var validationresult = $.fn.jQValid.methods.validateElement.apply(this, []);
                        if(validationresult)
                        {
                            $(this).attr("data-jqvalid-validity","valid");
                            $(this).removeClass($.fn.jQValid.guiFrameworks[jQvSettings.guiFramework].invalidClass);
                            $(this).addClass($.fn.jQValid.guiFrameworks[jQvSettings.guiFramework].validClass);
                        }
                        else
                        {
                            $(this).attr("data-jqvalid-validity","invalid");
                            $(this).removeClass($.fn.jQValid.guiFrameworks[jQvSettings.guiFramework].validClass);
                            $(this).addClass($.fn.jQValid.guiFrameworks[jQvSettings.guiFramework].invalidClass);
                        }

                        $(this).parents("form:not([novalidate])").first().trigger("jQValid.validationChange");
                    });
                });
            });
        });
    };
    
    $.fn.jQValid.methods = {
        isValid: function() {
            var validatableElements = $(this).find("input:not([data-jqvalid-skip]), select:not([data-jqvalid-skip]), textarea:not([data-jqvalid-skip])");
                    
            validatableElements =  validatableElements.filter("input[type=email], input[type=url], input[type=tel], \
                                                        input[type=number], input[required], input[type=text][data-jqvalid-regex], \
                                                        input[max],input[maxlength], input[min], input[minlength], \
                                                        input[type=checkbox][data-maxitems], input[type=checkbox][data-minitems], \
                                                        select[required], select[data-minitems], select[data-maxitems], textarea[required], \
                                                        texarea[maxlength], textarea[minlength]"); // Make this array
            //Check validation with validateELement function here
            var validationResult = true;
            validatableElements.each(function(){
                //Check every element with validateElement
                if(! $.fn.jQValid.methods.validateElement().apply(this, []))
                {
                    validationResult = false;
                }
            });
            return validationResult;
                      
        },
        validateNow: function(){
            var result = $.fn.jQValid.methods.isValid.apply(this,[]);
            /* TODO: here */
            {
                $(this).attr("data-jqvalid-validity","invalid");
                $(this).removeClass($.fn.jQValid.guiFrameworks[jQvSettings.guiFramework].validClass);
                $(this).addClass($.fn.jQValid.guiFrameworks[jQvSettings.guiFramework].invalidClass);
            }
        },
        validateElement: function() {
            var element = $(this);
            var patterns = $.fn.jQValid.validationPatterns;
            var methods = $.fn.jQValid.methods;
            var result = true;
            // TODO: Do the validation work here
            if(element.is("input"))
            {
                switch(element.attr("type").toLowerCase())
                {
                    case "email":
                        result = methods.validationByPattern(element, patterns.email);
                }
            }
            else if(element.is("textarea"))
            {
                
            }
            else if(element.is("select"))
            {
                
            }
            // TODO: Think about bootstrap.. Classes added to form groups, maybe a element of interest field can be added to guiFramework
            return result;
        },
        validationByPattern: function(element, pattern)
        {
            if( pattern.type == "regex" )
            {
                return this.regexValidation(element, pattern.regex);
            }
            else if(pattern.type == "alias")
            {
                return this.validationByPattern(element, pattern.dest);
            }
        },
        // TODO: Generate different funtions
        regexValidation: function(element, regex)
        {
            var checker = new RegExp(regex);
            return checker.test(element.val());
        },
        
        mincharsValidation: function(element, number)
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
        },
        number: {
            type: "regex",
            regex: "^[0-9]+$"
        },
        tel: {
            type: "regex",
            regex: "^[0-9() *#+-]+$"
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
      guiFramework: "default"
    };
    
    $.fn.jQValid.bootstrap3 = {
      htmlScan: true,
      guiFramework: "bootstrap3"
    };

    
} (jQuery));