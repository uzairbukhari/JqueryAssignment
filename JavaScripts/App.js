$(function () {                                                 // windows.onload

    $("#tabs").tabs({
        activate: function () {
            var activeTab = $("#tabs").tabs("option", "active");
            if (activeTab == 2) {
                loadCustomTab();                                //load the dynamic tab only when it will be open.
            }
        }
    }),

    $("#tabs").tabs({ disabled: [1, 2, 3] });                   //disable all the other tabs except the first one 

    $("#btnNext").bind('click', NextClick);                     // bind the Next button 

    $("#btnPrv").bind('click', PrvClick);                       // bind the Previous button

    $('#btnAddInterest').click(addInterest);                    // binding the Add Interest button

    namespace.Util.MyValidatorClass.bindValidator();            // Binding all the input controls to the validator
});

var addInterest = function () {                                 // Add interest dynamically on 2nd tab
    var text = $('#txtInterest').val();
    if (text != '')
        $('#interestList').append('<li>' + text + '</li>');
    $('#txtInterest').val('').focus();
}

var NextClick = function () {                                   // Next Button
    var Percentage = CompletionPercentage();                    // give the currently completed percentage
    var activeTab = $("#tabs").tabs("option", "active");        // give the currently active tab
    var condition = 60;                                         // 60% of the form should be completed

    if (Percentage >= condition) {
        if (activeTab == 2)
            createSummary();
        var nextTab = $("#tabs").tabs("option", "selected") + 1;
        $("#tabs").tabs("enable", nextTab);                     // enable the next tab
        $("#tabs").tabs('select', nextTab);                     // select the next tab
    }
    else alert('You need to fill the form 60%  to proceed');                        
}

var PrvClick = function () {                                    // Previous Button
    $("#tabs").tabs('select', $("#tabs").tabs("option", "selected") - 1);
}

var isProLoad = false, isStdLoad = false;

var loadCustomTab = function () {                               // Dynamically load a page using Jquery AJAX
    var a = $('#rdStd').is(':checked');
    if (a && !isStdLoad) {
        $("#tabs-3").load("../Pages/StudentForm.txt");
        isStdLoad = true;
        isProLoad = false;
    }
    else if (!a && !isProLoad) {
        isProLoad = true;
        isStdLoad = false;
        $("#tabs-3").load("../Pages/ProfessionalForm.txt");
    }
}

var createSummary = function () {                               // Create Summary using all the input controls
    var elements = $('input:text');
    for (var i = 0; i < elements.length; i++) {
        var a = elements[i];
        $('#tbl').append('<tr><td>' + a.name + '</td><td> ' + a.value + '</td></tr>');
    }
}

var CompletionPercentage = function () {                        // Give the completed percentage
    var gain = $('#gained').val();
    var total = $('#completed').val();
    var Percentage = (gain / total) * 100;
    return Percentage;
}

var FormComplete = function () {                                //actiuon to be performed on form completion
    var Percentage = CompletionPercentage();
    if (Percentage > 80)
        window.location.href = "goodbye.htm";
}