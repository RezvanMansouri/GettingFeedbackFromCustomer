function ShowRating() {
    if ($("#chkRating").prop("checked")) {
        $("#ratingCase").show();
    } else {
        $("#ratingCase").hide();
        $("#txtModifyFoodQly").val(0);
        $("#txtModifyService").val(0);
        $("#txtModifyValue").val(0);
    }
}

function ShowOverallRating() {
    var foodQly = Number($("#txtFoodQly").val());
    var service = Number($("#txtService").val());
    var value = Number($("#txtValue").val());

    var overallRating = ((foodQly + service + value) * 100) / 15;
    $("#txtOverallRating").val(overallRating.toFixed() + "%");
}

function ShowRatingModify() {
    if ($("#chkModifyRating").prop("checked")) {
        $("#ratingCaseModify").show();
    } else {
        $("#ratingCaseModify").hide();
        $("#txtModifyFoodQly").val(0);
        $("#txtModifyService").val(0);
        $("#txtModifyValue").val(0);
        $("#txtModifyOverallRating").val("");
    }
}

function ShowOverallRatingModify() {
    var foodQly = Number($("#txtModifyFoodQly").val());
    var service = Number($("#txtModifyService").val());
    var value = Number($("#txtModifyValue").val());

    var overallRating = ((foodQly + service + value) * 100) / 15;
    $("#txtModifyOverallRating").val(overallRating.toFixed() + "%");
}

function overallRating(foodQly, service, value) {
     return  ((foodQly + service + value) * 100) / 15;
    }

function AddFeedback() {
    if (doValidate_frmAddFeedback()) {
        console.log("Add Form is valid");

        var businessName = $("#txtNameAdd").val();
        var typeId = $("#cmbTypeAdd").val();
        var reviewerEmail = $("#txtEmailAdd").val();
        var reviewerComments = $("#txaCommentAdd").val();
        var reviewDate = $("#reviewDateAdd").val();
        var hasRating = $("#chkRating").prop("checked");
        var rating1 = $("#txtFoodQly").val();
        var rating2 = $("#txtService").val();
        var rating3 = $("#txtValue").val();

        var options = [businessName, typeId, reviewerEmail, reviewerComments,
            reviewDate, hasRating, rating1, rating2, rating3];

        function callback() {
            console.info("Inserting..");
            alert("NewFeedback Added");
            ResetAddForm();
            rmAddFeedbackPage_show();
        }
        Feedback.insert(options, callback);

        console.info( `${businessName} ${typeId} ${reviewerEmail} ${reviewerComments}
            ${reviewDate} ${hasRating}  ${rating1}  ${rating2}  ${rating3}`);
    } else {
        console.log("Add Form is invalid")
    }
}

function getReviews() {
    var options = [];

    function callback(tx, results) {
        console.info("Selecting All");

        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];

            var businessName = row['businessName'];
            var reviewerEmail = row['reviewerEmail'];
            var reviewerComments = row['reviewerComments'];
            var rating1 = Number(row['rating1']);
            var rating2 =Number(row['rating2']);
            var rating3 = Number(row['rating3']);

            htmlCode += `
            <li>
                <a data-role="button" data-row-id = ${row['id']} href="#" >
                <h1>Business Name: ${businessName}</h1>
                <p>Reviewer Email: ${reviewerEmail}</p>
                <p>Comments: ${reviewerComments}</p>
                <p>Overall Rating: ${overallRating(rating1,rating2,rating3).toFixed() + "%"}</p>
                </a>
            </li>
            `;
        }
        if (results.rows.length === 0) {
            $("#norecord").show();
            htmlCode = "";
        } else {
            $("#norecord").hide();
        }

        var lv = $("#lstViewFeedback");
        lv = lv.html(htmlCode);
        lv.listview("refresh");

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $(location).prop('href', '#rmModifyFeedbackPage');
        }
        $("#lstViewFeedback a").on("click", clickHandler);
    }
    Feedback.selectAll(options, callback);
}


var currentreview = null;

function showCurrentReview() {
    var id = localStorage.getItem("id");
    var options = [id];

    function callback(tx, results) {
        console.info("Selecting One");
        currentreview = results.rows[0];
        var row = results.rows[0];
        var businessName = row['businessName'];
        var reviewerEmail = row['reviewerEmail'];
        var reviewerComments = row['reviewerComments'];
        var typeId = row['typeId'];
        var reviewDate = row['reviewDate'];
        var hasRating = row['hasRating'];
        var rating1 = row['rating1'];
        var rating2 = row['rating2'];
        var rating3 = row['rating3'];

        $("#txtNameModify").val(businessName);
        showSelectOptionsModify(typeId);
        $("#txtEmailModify").val(reviewerEmail);
        $("#txtCommentModify").val(reviewerComments);
        $("#reviewDateModify").val(reviewDate);
        if (hasRating === 'true') {
            $("#chkModifyRating").prop("checked", true).checkboxradio("refresh");
                $("#ratingCaseModify").show();
                $("#txtModifyFoodQly").val(rating1);
                $("#txtModifyService").val(rating2);
                $("#txtModifyValue").val(rating3);
                $("#txtModifyOverallRating").val(overallRating(rating1,rating2,rating3).toFixed() + "%");
       } else {
           $("#chkModifyRating").prop("checked", false).checkboxradio("refresh");
            $("#ratingCaseModify").hide();
            $("#txtModifyFoodQly").val(0);
            $("#txtModifyService").val(0);
            $("#txtModifyValue").val(0);
            $("#txtModifyOverallRating").val("");
        }
    }
    Feedback.select(options, callback);
}

function UpdateFeedback() {
    if (doValidate_frmModifyFeedback()) {
        console.log("Modify Form is valid");
        var id = localStorage.getItem("id");

        var businessName = $("#txtNameModify").val();
        var typeId = $("#cmbTypeModify").val();
        var reviewerEmail = $("#txtEmailModify").val();
        var reviewerComments = $("#txtCommentModify").val();
        var reviewDate = $("#reviewDateModify").val();
        var hasRating = $("#chkModifyRating").prop("checked");
        var rating1 = $("#txtModifyFoodQly").val();
        var rating2 = $("#txtModifyService").val();
        var rating3 = $("#txtModifyValue").val();

        console.info( `${businessName} ${typeId} ${reviewerEmail} ${reviewerComments}
                    ${reviewDate}  ${hasRating} ${rating1} ${rating2} ${rating3}`);

        var options = [businessName, typeId, reviewerEmail, reviewerComments, reviewDate,
            hasRating, rating1, rating2, rating3, id];

        function callback() {
            console.info("Updateing..");
            alert("Feedback updated successfully");

            $(location).prop('href', "#rmViewFeedbackPage");
        }
        Feedback.update(options, callback);
    } else {
        console.log("Modify Form is Invalid");
    }
}

function deleteFeedback() {
    var id = localStorage.getItem("id");
    var options = [id];

    function callback() {
        console.info("Deleteing..");
        alert("Feedback deleted successfully");
        $(location).prop('href', "#rmViewFeedbackPage");
    }
    Feedback.delete(options, callback);
}

function SaveToLocalStorage() {
    var defaultemail = $("#txtDefaultEmail").val();
    localStorage.setItem("ReveiwerEmail", defaultemail);
    alert("Default reviewer email saved");
}

function showEmailinAddPage() {
    var email = localStorage.getItem("ReveiwerEmail");
    $("#txtEmailAdd").val(email);
}

function showSelectOptionsAdd() {
    var options = [];

    function callback(tx, results) {
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            if(row['name'] === 'Others')
                htmlCode = `<option value=${row['id']} selected>${row['name']}</option>`;
            else
            htmlCode += `<option value=${row['id']}>${row['name']}</option>`;
        }
        var lv = $("#cmbTypeAdd").html(htmlCode);
        lv.selectmenu("refresh");
    }
    Feedback.selectAllTYPE(options, callback);
}

function showSelectOptionsModify(typeId) {
    var options = [];

    function callback(tx, results) {
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            if(row['id'] === typeId)
                htmlCode += `<option value=${row['id']} selected>${row['name']}</option>`;
            else
                htmlCode += `<option value=${row['id']}>${row['name']}</option>`;
        }
        var lv = $("#cmbTypeModify").html(htmlCode);
        lv.selectmenu("refresh");
    }
    Feedback.selectAllTYPE(options, callback);
}

function ClearDatabase() {
    var result = confirm("Really want to clear database?");
    if (result) {
        try {
            DB.dropTables();
            alert("Database cleared: All tables dropped");

            location.reload();
        } catch (e) {
            alert(e);
        }
    }
}

function ResetAddForm() {
    $("#txtNameAdd").val("");
    $("#cmbTypeAdd").val("");
    showEmailinAddPage();
    $("#txaCommentAdd").val('');
    $("#reviewDateAdd").val('');
    $("#txtFoodQly").val(0);
    $("#txtService").val(0);
    $("#txtValue").val(0);
    $("#txtOverallRating").val("");
    $("#chkRating").prop("checked", false).checkboxradio("refresh");
    $("#ratingCase").hide();


}
