const index = require("../controllers/index");
const appointment = require("../controllers/appointment");
const center = require("../controllers/center");
module.exports = app => {
  app.get("/", index.getHomePage);

  //Pages
  app.get("/page/users", index.getPageUsers);

  // USERS API
  app.get("/users", index.getUsers);
  app.post("/users", index.createUser);
  app.delete("/users/:id", index.deleteUser);
  app.patch("/users/:id", index.editUser);
  app.post("/session", index.authenticateUser);

  //APPOINTMENT API
  app.post("/appointment", appointment.createAppointment);
  app.get("/appointment", appointment.getAppointment);

  //CENTER API
  app.post("/center", center.createCenter);
  app.get("/center", center.getCenter);
  app.patch("/center/:id", center.editCenter);
  app.delete("/center/:id", center.deleteCenter);
};
