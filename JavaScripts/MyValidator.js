
var namespace = {};
namespace.Util = {};

namespace.Util.MyValidatorClass = (function () {
    var gainedWeight = 0;
    var total_Weight = 0;
    var elementWeight = {
        "required": 10,
        "numeric": 10,
        "email": 10,
        "alphanumeric": 10,
        "gpa": 10
    };

    var getWeight = function (Element) {
        var weightValue;
        var elementType = Element.getAttribute("validationtype");
        if (elementType != null) {
            for (weightValue in elementWeight) {
                if (weightValue == elementType)
                    return elementWeight[weightValue];
            }
        }
        return 0;
    }

    var getTotalWeight = function (Element) {
        total_Weight += getWeight(Element);
    }

    var evaluatePercentage = function (Element, IsValid) {
        var Validated = Element.getAttribute("validated");
        if (Validated == 'false' && IsValid) {
            gainedWeight += getWeight(Element);
            Element.setAttribute("validated", 'true');
        }
        else if (Validated == 'true' && !IsValid) {
            gainedWeight -= getWeight(Element);
            Element.setAttribute("validated", 'false');
        }
    }

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

    var bind_Validator = function () {
        var elements = $('input:text');
        total_Weight = 0;
        for (var i = 0; i < elements.length; i++) {
            (function (index) {
                var element = elements[index];
                element.setAttribute("validated", 'false');
                getTotalWeight(element);
                element.onblur = function () {
                    Form_Validator(element);
                }
            })(i);
        }
        $('#completed').val(total_Weight);
        namespace.Util.Design.PercentageBar();
    }

    var Form_Validator = function (Element) {
        var result = false;
        switch (Element.getAttribute("validationtype")) {
            case 'required':
                result = requiredField_Validation(Element.value);
                namespace.Util.Design.SetColorOnvalidation(result, Element);
                break;
            case 'numeric':
                result = numeric_Validation(Element.value);
                namespace.Util.Design.SetColorOnvalidation(result, Element);
                break;
            case 'email':
                result = email_Validation(Element.value);
                namespace.Util.Design.SetColorOnvalidation(result, Element);
                break;
            case 'alphanumeric':
                result = alphaNumeric_Validation(Element.value);
                namespace.Util.Design.SetColorOnvalidation(result, Element);
                break;
            case 'gpa':
                result = GPA_Validation(Element.value);
                namespace.Util.Design.SetColorOnvalidation(result, Element);
                break;
        }
        evaluatePercentage(Element, result);
        $('#gained').val(gainedWeight);
        namespace.Util.Design.PercentageBar();
    }
    return {
        totalWeight: total_Weight,
        FormValidator: Form_Validator,
        FormValidatorOnclick: FormValidator_Onclick,
        bindValidator: bind_Validator,
        gained_Weight: gainedWeight
    };
})();

namespace.Util.Design = {
    SetColorOnvalidation: function (Result, Element) {
        var className = Result ? "ValidInput" : "InValidInput";
        Element.setAttribute("class", className);
    },

    PercentageBar: function () {
        $('#bar').css('width', CompletionPercentage() + '%');
    }
};



