'use strict';

const express = require('express');
let app = express();

let env = process.env.NODE_ENV || 'development';
let config = require('./server/config/config')[env];

require('./server/config/express')(config, app);
require('./server/config/database')(config);
require('./server/config/routes')(app);

app.listen(config.port, () => {
    console.log('Server is listening on port: ' + config.port);
});