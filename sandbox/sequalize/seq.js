const { Sequelize } = require("sequelize");

// Option 1: Passing a connection URI
const sequelize = new Sequelize("mariadb://root:simonot@172.17.0.1:3306/njs"); // Example for postgres

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
