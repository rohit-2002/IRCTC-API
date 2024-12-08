const Train = require("../models/train");

exports.addTrain = async (req, res) => {
  try {
    const train = await Train.create(req.body);
    res.status(201).json(train);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
