function ShowRating(){
    if($("#chkRating").prop("checked")){
        $("#ratingCase").show();
    }else {
        $("#ratingCase").hide();
    }
}

function ShowOverallRating(){
    var foodQly = Number($("#txtFoodQly").val());
    var service =Number($("#txtService").val());
    var value = Number($("#txtValue").val());

    var overallRating = ((foodQly+service+value) * 100) /15;
    $("#txtOverallRating").val(overallRating.toFixed() +"%");
}


function ShowRatingModify() {
    if ($("#chkModifyRating").prop("checked")) {
        $("#ratingCaseModify").show();
    } else {
        $("#ratingCaseModify").hide();
    }
}


function ShowOverallRatingModify() {
    var foodQly = Number($("#txtModifyFoodQly").val());
    var service =Number($("#txtModifyService").val());
    var value = Number($("#txtModifyValue").val());
    console.log((foodQly));
    var overallRating = ((foodQly+service+value) * 100) /15;

    $("#txtModifyOverallRating").val(overallRating.toFixed() +"%");
}



function SaveFeedback() {
if(doValidation_frmAddFeedback())
{
    console.log("Add Form is valid");
}else{
    console.log("Add Form is invalid")
}
}