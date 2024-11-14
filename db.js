const mongoose = require('mongoose');

var mongoURL = "mongodb://localhost:27017/stay-here";

// mongoose.connect(mongoURL, {useUnifiedTopology : true, useNewUrlParser: true});
// var connection = mongoose.connection;

// connection.on('error', ()=>{
//     console.log('Mongo Db Connection failed')
// })
// connection.on('connected', ()=>{
//     console.log('Mongo Db Connection Successful')
// })

// module.exports = mongoose;

const connectDb = async() => {
    try{
        const connect = await mongoose.connect(mongoURL)
        console.log("Database Connected: ", connect.connection.host, connect.connection.name)
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDb