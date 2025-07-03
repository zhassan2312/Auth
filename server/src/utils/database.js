import mongoose from "mongoose"

const connectToDatabase=async() =>{
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      
    });
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

connectToDatabase();