/* Javascript for PollBlock. */
function PollBlock(runtime, element) {

    var voteUrl = runtime.handlerUrl(element, 'vote');
    var tallyURL = runtime.handlerUrl(element, 'get_results');

    var submit = $('input[type=submit]', element);

    var resultsTemplate = Handlebars.compile($("#results", element).html());

    function getResults() {
        $.ajax({
            // Semantically, this would be better as GET, but I can use helper
            // functions with POST.
            type: "POST",
            url: tallyURL,
            data: JSON.stringify({}),
            success: function (data) {
                result = resultsTemplate(data);
                console.log("Running...");
                console.log(result);
                element.innerHTML = resultsTemplate(data);
            }
        })
    }

    if (submit.length) {
        var radios = $('input[name=choice]:checked', element);
        submit.click(function (event) {
            var choice = radios.val();
            console.log(choice);
            $.ajax({
                type: "POST",
                url: voteUrl,
                data: JSON.stringify({"choice": choice}),
                success: getResults
            });
        });
        var answers = $('li', element);
        function enableSubmit() {
            submit.removeAttr("disabled");
            answers.unbind("change.EnableSubmit");
        }
        if (! radios.val()) {
            answers.bind("change.EnableSubmit", enableSubmit);
        } else {
            enableSubmit();
        }
    } else {
        getResults();
    }

    $(function ($) {

    });
}