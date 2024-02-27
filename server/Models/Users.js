const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    age: Number,
    email: String,
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
