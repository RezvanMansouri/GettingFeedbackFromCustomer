function chkRating_click() {
    ShowRating();
}

function txtOverallRating_change() {
    ShowOverallRating();
}


function chkModifyRating_click() {
    ShowRatingModify();
}

function txtModifyOverallRating_change() {
    ShowOverallRatingModify();
}

function btnSave_click() {
    SaveFeedback();
}

function init() {
    $("#chkRating").on("click",chkRating_click);
    $("#txtService").on("change",txtOverallRating_change);
    $("#txtFoodQly").on("change",txtOverallRating_change);
    $("#txtValue").on("change",txtOverallRating_change);


    $("#chkModifyRating").on("click",chkModifyRating_click);
    $("#txtModifyService").on("change",txtModifyOverallRating_change);
    $("#txtModifyFoodQly").on("change",txtModifyOverallRating_change);
    $("#txtModifyValue").on("change",txtModifyOverallRating_change);

    $("#btnSave").on("click", btnSave_click);
}

$(document).ready(function ()   {
    init();
});