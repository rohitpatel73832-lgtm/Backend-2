// import mongoose from "mongoose"
// import { DB_NAME } from "../constants.js";





// const connectDB= async() =>{
//     try{
//        const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}
//        }`)
//        console.log(`\n mongoDB connected !! DB HOST:${connectionInstance.connection.host}`)

//     } catch(error){
//         console.log("MONGODB connection error", error);
//         process.exit(1)
//     }
// }

// export default connectDB;

import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const finalUri = `${process.env.MONGODB_URI}/${DB_NAME}`;

    //console.log("FINAL URI -->", finalUri);  // ✅ print URI properly

    const connectionInstance = await mongoose.connect(finalUri);  // ✅ connect properly

    console.log(`\nMongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MONGODB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;