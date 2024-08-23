const sql = require("./db.js");

// Constructor for School
const School = function (school) {
  this.name = school.name;
  this.address = school.address;
  this.latitude = school.latitude;
  this.longitude = school.longitude;
};

// Add School API: Inserts a new school into the database
School.create = (newSchool, result) => {
  // Validate input data
  if (!newSchool.name || !newSchool.address || typeof newSchool.latitude !== 'number' || typeof newSchool.longitude !== 'number') {
    result({ kind: "validation_error", message: "Invalid input data" }, null);
    return;
  }

  // Insert new school into the schools table
  sql.query("INSERT INTO schools SET ?", newSchool, (err, res) => {
    if (err) {
      console.log("Error occurred while inserting school: ", err);
      result(err, null);
      return;
    }

    console.log("Created school: ", { id: res.insertId, ...newSchool });
    result(null, { id: res.insertId, ...newSchool });
  });
};

// List Schools API: Retrieves all schools sorted by proximity to the user's location
School.getAllSortedByProximity = (userLatitude, userLongitude, result) => {
  // Validate input coordinates
  if (typeof userLatitude !== 'number' || typeof userLongitude !== 'number') {
    result({ kind: "validation_error", message: "Invalid coordinates" }, null);
    return;
  }

  const query = `
    SELECT id, name, address, latitude, longitude,
    ( 6371 * acos( cos( radians(?) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(?) ) + sin( radians(?) ) * sin( radians( latitude ) ) ) ) AS distance 
    FROM schools 
    ORDER BY distance ASC`;

  sql.query(query, [userLatitude, userLongitude, userLatitude], (err, res) => {
    if (err) {
      console.log("Error occurred while retrieving schools: ", err);
      result(null, err);
      return;
    }

    console.log("Schools sorted by proximity: ", res);
    result(null, res);
  });
};

module.exports = School;

