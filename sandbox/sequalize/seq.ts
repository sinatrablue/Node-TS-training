import { Model } from "sequelize/types";

const { Sequelize, DataTypes } = require("sequelize");

// Option 1: Passing a connection URI
const sequelize = new Sequelize("mariadb://root:simonot@172.17.0.1:3306/njs");

class User extends Model {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
}

User.init({
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
}, {}
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const User = sequelize.define(
      "User",
      {
        // Model attributes are defined here
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          // allowNull defaults to true
        },
      },
      {
        // Other model options go here
      }
    );
    await sequelize.sync({ force: false });

    const jane = await User.create({ firstName: "Jane", lastName: "Doe" });
    console.log("Jane's auto-generated ID:", jane.id);

    await sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
