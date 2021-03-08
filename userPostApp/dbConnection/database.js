const mongoose = require('mongoose');

let db = process.env.DBURL;
console.log(db);
const connectDB = () => {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(() => console.log("connected.")).catch((err) => console.log(err));
}

module.exports = {
    connectDB: connectDB
}