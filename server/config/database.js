'use strict';
let mongoose = require('mongoose');

module.exports = (config) => {
    mongoose.Promise = global.Promise;
    
    mongoose.connect(config.db);
    
    let db = mongoose.connection;
    
    db.once('open', err => {
        if (err) {
            throw err;
        }
        console.log('MongoDB is running!');
    });
    
    db.on('error', err => console.log('Database error: ' + err));
    
};