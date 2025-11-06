const mongoose = require('mongoose');

const connectDB = async () => {

    try{
        const conn = await mongoose.connect(process.env.MONGO_ATLAS_URI);
        console.log(`MongoDB connection successful`);
    }

    catch(error) {
        console.log('MongoDB connection unsuccessful \n Error: ', error);
        process.exit(1);
    }



}

module.exports = connectDB;