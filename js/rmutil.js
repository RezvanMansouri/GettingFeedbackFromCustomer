
function doValidation_frmAddFeedback() {
    var form = $("#frmAddFeedback");
    form.validate({
        rules: {
            txtbNameAdd: {
                required: true,
                rangelength : [2,20]
            },
            txtEmailAdd: {
                required: true,
                emailcheck : true
            },
            reviewDateAdd: {
                required: true
            },

        },
        message:{

    }


    });
    return false;
}