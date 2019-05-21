var mongoose = require('mongoose');
const bcrypt = require('bcrypt')
var Schema = mongoose.Schema;

var userSchema = new Schema({
    info: {
        firstname: String,
        lastname: String,
    },
    local: {
        email: {
            type: String
        },
        password: {
            type: String
        },
        isAdmin: {
            type: Boolean,
            default: true
        }

    }
});

userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);