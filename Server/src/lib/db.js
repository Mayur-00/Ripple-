import mongoose from "mongoose";

export const connectDb = async () =>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB Connected!")
    } catch (error) {
        console.log(`DB Connection error: ${error}`);
        

        
    };
};
