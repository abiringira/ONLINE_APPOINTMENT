const index = require('../controllers');

module.exports = app => {
  app.use((req, res, next) => {
    console.log('>>>>>>>>>' + JSON.stringify(req.body));
    next();
  });

  app.get('/', index.getHomePage);

  // USERS API
  app.get('/users', index.getUsers);
  app.post('/users', index.createUser);
  app.delete('/users/:id', index.deleteUser);
  app.patch('/users/:id', index.editUser);
  app.get('/users/login', index.authenticateUser);

  //APPOINTMENT API
  app.post('/appointment', index.createAppointment);
};
