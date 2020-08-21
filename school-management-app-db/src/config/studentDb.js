const { Sequelize } = require("sequelize");

const studentDb = new Sequelize(process.env.DB_URL);

(async () => {
  try {
    await studentDb.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = studentDb;
