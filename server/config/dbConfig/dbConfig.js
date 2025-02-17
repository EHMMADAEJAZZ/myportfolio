import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

const url = process.env.ATLAS_URL.replace('<db_password>',process.env.ATLAS_PASSWORD);
// Connect to MongoDB
const dbConfig = async()=>{
    try {
        const db = await mongoose.connect(url,{
           
            dbName:'myportfolio'
        })
        console.log(`Connected to MongoDB: HOST!! ${db.connection.host}`)

        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message)
        process.exit(1)
        
    }
}

export default dbConfig;