require('dotenv').config()

const express = require('express');
const compression = require('compression')
const mongoose = require("mongoose");
const cors = require("cors")
const blogRoutes = require('./routes/blogs')
const userRoutes = require('./routes/user')

// express app
const app = express();
app.use(
    cors({
        origin: ["http://localhost:3000", "https://shara.onrender.com"],
        credentials: true,
    })
);

app.use(compression());
app.use(express.json());

// //connect database
mongoose.connect(process.env.MDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connect to database successfully and listening on port', process.env.PORT);
        })
    })
    .catch((err) => console.log(err));

// // blogs routes
app.use("/blogs", blogRoutes)

// // users routes
app.use("/user", userRoutes)



