'use strict';

const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');
const requiredValidationMessage = '{PATH} is required';

let userSchema = mongoose.Schema({
    username: { type: String, required: requiredValidationMessage, unique: true },
    firstName: { type: String, required: requiredValidationMessage },
    secondName: { type: String, required: requiredValidationMessage },
    salt: String,
    hashedPass: String,
    roles: [String]
});

userSchema.method({
  authenticate: (password) => {
    return ( encryption.generateHashedPassword(this.salt, password) === this.hashedPass );
  }
});

let User = mongoose.model('User', userSchema);

module.exports.seedAdminUser = () => {
    User.find({}).then((users) => {
        if (users.length > 0) return;
        let salt = encryption.generateSalt();
        let hashedPass = encryption.generateHashedPassword(salt, 'Ivaylo');
        User.create({username: 'ivaylo.kenov', firstName: 'Ivaylo',
            lastName: 'Kenov', salt: salt,
            hashedPass: hashedPass, roles: ['Admin']});
    });
};
