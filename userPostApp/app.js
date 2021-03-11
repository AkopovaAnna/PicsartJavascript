require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');

const dbConnection = require('./src/dbConnection/database').connectDB;

dbConnection();

const postRoutes = require('./src/routes/postRoutes').postRoute;
const userRoutes = require('./src/routes/userRoutes').userRoute;

const newsRoutes = require('./src/routes/newsRoutes').newsRoute;

const app = express()

const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/users", userRoutes,postRoutes);
app.use("/api/blog", newsRoutes);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})