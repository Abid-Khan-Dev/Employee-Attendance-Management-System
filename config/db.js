const mongoose = require('mongoose');

module.exports = connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Database connected successfully');
    }
    catch(err){
        console.error('❌ MongoDB connection error:', err.message);
        console.error('Full Error Details:', err);
        process.exit(1);
    }
}