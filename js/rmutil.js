
function doValidate_frmAddFeedback() {
    let form = $("#frmAddFeedback");
    form.validate({
        rules: {
            txtNameAdd: {
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
            txtFoodQly: {
               range: [0,5]
            },
            txtService: {
                range: [0,5]
            },
            txtValue: {
                range: [0,5]
            }
        },
        message:{
            txtNameAdd: {
                required: "Name is required",
                rangelength : "Name must be 2-20 char long"
            },
            txtEmailAdd: {
                required: "Email is required",
                emailcheck : "Email must be in a valid format"
            },
            reviewDateAdd: {
                required: true
            },
            txtFoodQly: {
                range: "Rating can not be less than 0 or more than 5",
            },
            txtService: {
                range: "Rating can not be be less than 0 or more than 5",
            },
            txtValue: {
                range: "Rating can not be be less than 0 or more than 5",
            }
        }
    });
    return form.valid();
}


function doValidate_frmModifyFeedback() {
    let form = $("#frmModifyFeedback");
    form.validate({
        rules: {
            txtNameModify: {
                required: true,
                rangelength : [2,20]
            },
            txtEmailModify: {
                required: true,
                emailcheck : true
            },
            reviewDateModify: {
                required: true
            },
            txtModifyFoodQly: {
                range: [0,5]
            },
            txtModifyService: {
                range: [0,5]
            },
            txtModifyValue: {
                range: [0,5]
            }
        },
        message:{
            txtNameModify: {
                required: "Name is required",
                rangelength : "Name must be 2-20 char long"
            },
            txtEmailModify: {
                required: "Email is required",
                emailcheck : "Email must be in a valid format"
            },
            reviewDateModify: {
                required: true
            },
            txtModifyFoodQly: {
                range: "Rating can not be less than 0 or more than 5",
            },
            txtModifyService: {
                range: "Rating can not be be less than 0 or more than 5",
            },
            txtModifyValue: {
                range: "Rating can not be be less than 0 or more than 5",
            }
        }
    })
    return form.valid();
}


jQuery.validator.addMethod("emailcheck",
    function (value,element){
        var regex = /^\S+@\S+\.\S+$/;
        return this.optional(element) || regex.test(value);
    },
    "Must be a valid email");