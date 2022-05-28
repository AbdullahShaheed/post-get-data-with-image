const mysql = require("mysql2");

const config = {
  host: "localhost",
  user: "root",
  password: "Dell_1975",
  database: "my_store",
  waitForConnections: true,
  connectionLimit: 4,
  queueLimit: 0,
};

module.exports = function createPool() {
  try {
    const pool = mysql.createPool(config);
    console.log("Connected to database..");

    const poolPromise = pool.promise();
    global.db = poolPromise;
  } catch (err) {
    console.log("Failed to connect to database..");
  }
};
