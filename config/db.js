const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  }
);

// Sync models with database
sequelize
  .sync({ force: false }) // `force: false` ensures existing tables aren't dropped
  .then(() => console.log("Database synchronized successfully"))
  .catch((err) => console.error("Error synchronizing database:", err));

module.exports = sequelize;
