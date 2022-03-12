


//driver of the database
var db;

function errorHandler(error) {
    console.error("SQL error: " + error.message);
}

//manager of the database
var DB = {
    createDatabase: function (){

        function dbCreateSuccess() {
            console.info("Success: Database create successfully");

        }
        db = openDatabase("RMFeedbackDB","1.0", "DB for Feedback App", 6 * 1024 * 1024,dbCreateSuccess );
    },
    createTables : function () {
        function txFunction(tx) {
            var options= [];

            ////////DROP TYPE
            var sql = "DROP TABLE IF EXISTS type;";
            //without a transaction u can not do any operation in the db
            tx.executeSql(sql);

            ///////CREATE type
            sql = "CREATE TABLE IF NOT EXISTS type(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name VARCHAR(20) NOT NULL);";
            tx.executeSql(sql, options);

            ///////INSERT INTO type
             sql = "INSERT INTO type(name) VALUES ('Others'); ";
            tx.executeSql(sql);
             sql = "INSERT INTO type(name) VALUES ('Canadian'); ";
            tx.executeSql(sql);
             sql = "INSERT INTO type(name) VALUES ('Asian'); ";
            tx.executeSql(sql);
             sql = "INSERT INTO type(name) VALUES ('European'); ";
            tx.executeSql(sql);
             sql = "INSERT INTO type(name) VALUES ('Australian'); ";
            tx.executeSql(sql);

            ///////CREATE table review
            sql = "CREATE TABLE IF NOT EXISTS review(" +
            "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
            "businessName VARCHAR(30) NOT NULL,"+
            "typeId INTEGER NOT NULL," +
            "reviewerEmail VARCHAR(30),"+
            "reviewerComments TEXT,"+
            "reviewDate DATE,"+
            "hasRating VARCHAR(1),"+
            "rating1 INTEGER, " +
            "rating2 INTEGER," +
            "rating3 INTEGER," +
            "FOREIGN KEY(typeId) REFERENCES type(id));";
            function successCallback() {
                console.info("Success: Create table review successful.");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Create tables transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    dropTables : function (){
        function txFunction(tx) {
            var sql = "DROP TABLE IF EXISTS type;";
            var options = [];
            function successCall() {
                console.info("Success: drop table: type successful.");
            }
            tx.executeSql(sql, options, successCall, errorHandler);
             sql = "DROP TABLE IF EXISTS review;";
            options = [];
            function successCallback() {
                console.info("Success: drop table: review successful.");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: drop tables transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },


}