var connection = require("./connection.js");
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

var orm = {
    

    selectAll: function (table, callback) {
      var queryString = 'SELECT * FROM ' + table + ';';
      connection.query(queryString, function (err, result) {
        if (err) {
          throw err;
        }
  
        callback(result);
      });
    },


  insertOne: function (table, cols, vals, callback) {
    var queryString = 'INSERT INTO ' + table;

    queryString = queryString + ' (';
    queryString = queryString + cols.toString();
    queryString = queryString + ') ';
    queryString = queryString + 'VALUES (';
    queryString = queryString + printQuestionMarks(vals.length);
    queryString = queryString + ') ';

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      callback(result);
    });
  },


  updateOne: function (table, objColVals, condition, callback) {
    var queryString = 'UPDATE ' + table;

    queryString = queryString + ' SET ';
    queryString = queryString + objToSql(objColVals);
    queryString = queryString + ' WHERE ';
    queryString = queryString + condition;

    connection.query(queryString, function (err, result) {
      if (err) throw err;
      callback(result);
    });
  },

  delete: function (table, condition, callback) {
    var queryString = 'DELETE FROM ' + table;
    queryString = queryString + ' WHERE ';
    queryString = queryString + condition;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      callback(result);
    });
  },

  findAlike: function(table, callback) {
    var queryString = 'SELECT * FROM ' + table;
    queryString = queryString + ' WHERE ';
    queryString = queryString + 'definition LIKE "%attractive%"';
    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      callback(result);
    });
  }
};


module.exports = orm;
