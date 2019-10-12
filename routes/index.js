const index = require('../controllers/index');
const appointment = require('../controllers/appointment');
const center = require('../controllers/center');

module.exports = app => {
  app.get('/', index.getHomePage);
  app.get('/page/users', index.getPageUsers);
  app.get('/page/users', index.getUsers);
  app.post('/page/users', index.createPageUser);
  app.delete('/page/users/:id', index.deletePageUser);
  app.patch('/page/users/:id', index.editPageUser);
  app.get('/page/session', index.authenticatePageUser);
  app.post('/page/appointment', appointment.createPageAppointment);
  app.get('/page/appointment', appointment.getPageAppointment);
  app.post('/page/center', center.createPageCenter);
  app.get('/page/center', center.getPageCenter);
  app.patch('/page/center/:id', center.editPageCenter);
  app.delete('/page/center/:id', center.deletePageCenter);

  // USERS API
  app.get('/users', index.getUsers);
  app.post('/users', index.createUser);
  app.delete('/users/:id', index.deleteUser);
  app.patch('/users/:id', index.editUser);
  app.post('/session', index.authenticateUser);

  //APPOINTMENT API
  app.post('/appointment', appointment.createAppointment);
  app.get('/appointment', appointment.getAppointment);

  //CENTER API
  app.post('/center', center.createCenter);
  app.get('/center', center.getCenter);
  app.patch('/center/:id', center.editCenter);
  app.delete('/center/:id', center.deleteCenter);
};
