import mongoose from 'mongoose';
const connectDB = async ()=> {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb is connected successfully');
        return connect;
    } catch(err){
        console.error('MongoDB connection error:', err);
        throw err;
    }
}

export default connectDB;