const School = require("../models/school.model.js");

exports.addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
    res.status(400).send({
      message: "Invalid input data! Name, address, latitude, and longitude are required and must be of correct types."
    });
    return;
  }

  const school = new School({
    name,
    address,
    latitude,
    longitude
  });

  School.create(school, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the School."
      });
    } else {
      res.send(data);
    }
  });
};

exports.listSchools = (req, res) => {
  const userLatitude = parseFloat(req.query.latitude);
  const userLongitude = parseFloat(req.query.longitude);

  if (isNaN(userLatitude) || isNaN(userLongitude)) {
    res.status(400).send({
      message: "Invalid latitude or longitude."
    });
    return;
  }

  
  School.getAllSortedByProximity(userLatitude, userLongitude, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving schools."
      });
    } else {
      res.send(data);
    }
  });
};

