const express = require('express')
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require("./routes/userRoutes")(app)

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})