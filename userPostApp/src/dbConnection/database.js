const mongoose = require('mongoose');


exports.connectDB = () => {
    let db = process.env.DBURL;
    mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(() => console.log("connected.")).catch((err) => console.log(err));
}
