/**
 * Load and use Express Framework
 */

const express = require('express');
const app = express();
const config = require('./configs');

require('./configs/db');

require('./configs/app')(app); // configure the app
require('./routes')(app);

app.listen(config.PORT, () => {
  console.log('Server running at port 3000: http://localhost:' + config.PORT);
});
