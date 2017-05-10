$(function() {
    $('#previous').click(function(e) {
        $.ajax({
            type: 'POST',
            url: `page?page=previous`,
        })
        .done(function(results) {
            if (results.success === 1) {
                //.. code
            }
        });
    });
    $('#next').click(function(e) {
        $.ajax({
            type: 'POST',
            url: `page?page=next`,
        })
        .done(function(results) {
            if (results.success === 1) {
                //.. code
            }
        });
    });
});