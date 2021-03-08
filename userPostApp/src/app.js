require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express')
const dbConnection = require('./dbConnection/database');

const app = express()

const PORT = process.env.PORT || 8080;

dbConnection.connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('uploads'));

require("./routes/userRoutes")(app);
require("./routes/postRoutes")(app);
require("./routes/newsRoutes")(app);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})