
//Query Manager

var Feedback ={
    insert: function (options, callback) {
        function txFunction(tx) {
           var sql = "INSERT INTO review(businessName, typeId, reviewerEmail, reviewerComments," +
               " reviewDate, hasRating, rating1, rating2, rating3) VALUES (?,?,?,?,?,?,?,?,?); ";

            tx.executeSql(sql,options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Insert successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE review SET businessName=?, typeId=?, reviewerEmail=?," +
                " reviewerComments=?, reviewDate=?, hasRating=?, rating1=?, rating2=?, rating3=?" +
                "WHERE id=?;";

            tx.executeSql(sql,options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Update successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE from review WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Delete successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM review WHERE id=?;"
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Select successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM review;"
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: SelectAll successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAllTYPE: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM type;"
            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler);
    }

};