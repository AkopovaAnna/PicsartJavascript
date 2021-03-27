const mongoose = require('mongoose');


exports.connectDB = () => {
    mongoose.connect(process.env.DBURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(() => console.log("connected.")).catch((err) => console.log(err));
}
