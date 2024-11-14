const express = require('express');
const app = express();

const connectDb = require("./db")

// const dbConfig = require('./db')
const roomroute = require('./routes/roomroute');

connectDb();

app.use('/api/rooms', roomroute);



const port = process.env.PORT || 5000;
app.listen(port,() => console.log(`Server running on port ${port}`));