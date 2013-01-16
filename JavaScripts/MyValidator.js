
var namespace = {};
namespace.Util = {};

namespace.Util.MyValidatorClass = (function () {
    var requiredField_Validation = function (text) {
        var reg = new RegExp('^[\s]*[\s]*$');
        return !reg.test(text);
    }
    var numeric_Validation = function (text) {
        if (!requiredField_Validation(text))
            return false;
        var reg = new RegExp('^\\d*$');
        return reg.test(text);
    }
    var alphaNumeric_Validation = function (text) {
        if (!requiredField_Validation(text))
            return false;
        var reg = new RegExp('^[a-zA-Z0-9_]*$');
        return reg.test(text);
    }
    var email_Validation = function (text) {
        if (!requiredField_Validation(text))
            return false;
        var reg = new RegExp("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
        return reg.test(text);
    }
    var FormValidator_Onclick = function () {
        var elements = document.forms[0].elements;
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (element.type == 'text') {
                namespace.Util.MyValidatorClass.FormValidator(element);
            }
        }
    }

    var Form_Validator = function (Element) {
        switch (Element.getAttribute("validationtype")) {
            case 'required':
                namespace.Util.Design.SetColorOnvalidation(requiredField_Validation(Element.value), Element);
                break;
            case 'numeric':
                namespace.Util.Design.SetColorOnvalidation(numeric_Validation(Element.value), Element);
                break;
            case 'email':
                namespace.Util.Design.SetColorOnvalidation(email_Validation(Element.value), Element);
                break;
            case 'alphanumeric':
                namespace.Util.Design.SetColorOnvalidation(alphaNumeric_Validation(Element.value), Element);
                break;
            case 'gpa':
                namespace.Util.Design.SetColorOnvalidation(GPA_Validation(Element.value), Element);
                break;
        }
    }
    return {
        FormValidator: Form_Validator,
        FormValidatorOnclick: FormValidator_Onclick
    };
})();

namespace.Util.Design = {
    SetColorOnvalidation: function (Result, Element) {
        var className = Result ? "ValidInput" : "InValidInput";
        Element.setAttribute("class", className);
    }
};
