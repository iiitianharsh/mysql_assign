module.exports = app => {
  const schools = require("../controllers/school.controller.js");

  const router = require("express").Router();

  router.post("/addSchool", schools.addSchool);
  router.get("/listSchools", schools.listSchools);

  app.use('/api/schools', router);
};
