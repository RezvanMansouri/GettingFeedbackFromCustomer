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
    AddFeedback();
}

function btnUpdate_click() {
    UpdateFeedback();
}

function btnSaveDefault_click() {
    SaveToLocalStorage();
}


function initDB(){
    try{
        DB.createDatabase();
        if (db) {
            console.info("Creating Tables ...");
            DB.createTables();
        }
        else{
            console.error("Error: Cannot create tables: Database does not exists");
        }
    }catch(e){
        console.error("Error (Fatal): Error in initDB. Can not proceed");
    }
}


function btnClearDatabase_click() {
    ClearDatabase();
}

function rmViewFeedbackPage_show() {
    getReviews();
}

function rmModifyFeedbackPage_show() {
    showCurrentReview();
}

function btnDelete_click() {
deleteFeedback();
}

function rmAddFeedbackPage_show() {

    showEmailinAddPage();
    showSelectOptionsAdd();
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
    $("#btnUpdate").on("click", btnUpdate_click);
    $("#btnDelete").on("click", btnDelete_click);

    $("#btnSaveDefault").on("click", btnSaveDefault_click);

    $("#btnClearDatabase").on("click",btnClearDatabase_click);

    $("#rmViewFeedbackPage").on("pageshow", rmViewFeedbackPage_show);
    $("#rmModifyFeedbackPage").on("pageshow", rmModifyFeedbackPage_show);
    $("#rmAddFeedbackPage").on("pageshow", rmAddFeedbackPage_show);
}

$(document).ready(function ()   {
    init();
    initDB();
});