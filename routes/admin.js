const express = require("express");
const { authenticateAdmin } = require("../Controllers/authController");
const db = require("../config/db");

const router = express.Router();

// Admin route to add multiple trains
router.post("/trains", authenticateAdmin, async (req, res) => {
  const trains = req.body.trains; // Expecting an array of train records

  if (!Array.isArray(trains) || trains.length === 0) {
    return res.status(400).send("Please provide an array of train records.");
  }

  // Array to store values for the query
  const values = [];
  const queryParts = trains.map((train, index) => {
    // Offset for each row's placeholders
    const offset = index * 4;
    values.push(
      train.source,
      train.destination,
      train.totalSeats,
      train.totalSeats
    );
    return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4})`;
  });

  // Join all query parts into a single query string
  const query = `
    INSERT INTO trains (source, destination, total_seats, available_seats)
    VALUES ${queryParts.join(", ")}
    RETURNING id, source, destination, total_seats, available_seats;
  `;

  console.log("Generated Query:", query);
  console.log("Values Array:", values);

  try {
    const result = await db.query(query, values);
    res.status(201).json({
      message: "Trains added successfully",
      trains: result.rows,
    });
  } catch (err) {
    console.error("Error adding trains:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
