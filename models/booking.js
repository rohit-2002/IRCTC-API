const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Booking = sequelize.define("Booking", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  trainId: { type: DataTypes.INTEGER, allowNull: false },
  seatsBooked: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Booking;
