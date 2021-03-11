const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Post = require('./post');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        private: true
    },
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return  await bcrypt.compare(password, user.password);
};

userSchema.pre('deleteOne',  async function (next) {
    let userId = this._conditions._id;
    await Post.deleteMany({userId: mongoose.Types.ObjectId(userId)});
    next();
});


module.exports = User = mongoose.model("users", userSchema);