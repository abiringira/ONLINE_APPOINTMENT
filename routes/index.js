const index = require("../controllers");

module.exports = app => {
  app.use((req, res, next) => {
    console.log(">>>>>>>>>" + JSON.stringify(req.body));
    next();
  });

  app.get("/", index.getHomePage);

  app.get("/users", index.getUsers);
  app.post("/users", index.createUser);

  //   app.use("/contact", contact);
};
