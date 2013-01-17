$(function () {

    $("#tabs").tabs({
        load: function () {
        }
    }),

    $("#btnNext").bind('click', function () {
        $("#tabs").tabs('select', $("#tabs").tabs("option", "selected") + 1);
    });

    $("#btnPrv").bind('click', function () {
        $("#tabs").tabs('select', $("#tabs").tabs("option", "selected") - 1);
    });

    $("#btnLoad").bind('click', createSummary);

    $('#btnAddInterest').click(addInterest);

    //$("#basicInfo").load("../Pages/basicInfo.htm");

    $('input:radio').bind('click', loadCustomTab);

    namespace.Util.MyValidatorClass.bindValidator();
});

var addInterest = function () {
    var text = $('#txtInterest').val();
    if (text != '')
        $('#interestList').append('<li>' + text + '</li>');
    $('#txtInterest').val('').focus();
}

var isProLoad = false, isStdLoad = false;

var loadCustomTab = function () {
    var a = $('#rdStd').is(':checked');
    //alert(a);
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

var createSummary = function () {
    $('#summary').empty().append('<table>');
    var elements = $('input:text');
    for (var i = 0; i < elements.length; i++) {
        var a = elements[i];
        $('#summary').append('<tr><td>' + a.name + '</td><td> ' + a.value + '</td></tr>');
    }
    $('#summary').append('</table>');
    alert(namespace.Util.MyValidatorClass.totalWeight);
}

