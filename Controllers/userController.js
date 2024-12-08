// userController.js
const Train = require("../models/train");
const Booking = require("../models/booking");

exports.getAvailability = async (req, res) => {
  try {
    const { source, destination } = req.query;
    if (!source || !destination) {
      return res
        .status(400)
        .json({ message: "Source and destination are required" });
    }

    const trains = await Train.findAll({ where: { source, destination } });
    if (trains.length === 0) {
      return res
        .status(404)
        .json({ message: "No trains found for the given route" });
    }

    res.json(trains);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.bookSeat = async (req, res) => {
  try {
    const { trainId, seats } = req.body;

    if (!trainId || !seats) {
      return res
        .status(400)
        .json({ message: "Train ID and number of seats are required" });
    }

    // Validate that seats is a positive integer
    if (isNaN(seats) || seats <= 0) {
      return res.status(400).json({ message: "Invalid number of seats" });
    }

    const train = await Train.findByPk(trainId);
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }

    // Check if there are enough available seats
    if (train.availableSeats < seats) {
      return res.status(400).json({ message: "Insufficient seats" });
    }

    // Update the available seats for the train
    await Train.update(
      { availableSeats: train.availableSeats - seats },
      { where: { id: trainId } }
    );

    // Ensure userId is not null
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Create the booking
    const booking = await Booking.create({
      userId,
      trainId,
      seatsBooked: seats,
    });

    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
