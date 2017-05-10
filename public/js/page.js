$(function() {
    $('#previous').click(function(e) {
        $.ajax({
            type: 'GET',
            url: `?page=previous`,
        });
        // .done(function(results) {
        //     if (results.success === 1) {
        //         //.. code
        //     }
        // });
    });
    $('#next').click(function(e) {
        $.ajax({
            type: 'GET',
            url: `?page=next`,
        });
        // .done(function(results) {
        //     if (results.success === 1) {
        //         //.. code
        //     }
        // });
    });
});