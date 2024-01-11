import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectString = `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster0.h9haszt.mongodb.net/?retryWrites=true&w=majority`

export const connectDB = async () => {
    await mongoose.connect(connectString)
    console.log('DB is Ready!')
} 