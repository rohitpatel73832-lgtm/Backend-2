// import {v2 as cloudinary} from "cloudinary";
// import fs from "fs";


// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });



// const uploadOnCloudinary=async(localFilePath)=>{
//   try{
//     if(!localFilePath) return null;
//     const response = await cloudinary.uploader.upload
//     (localFilePath, {
//       resource_type: "auto"
//     })
//     console.log("file is uploaded on cloudinary",
//       response.url);
//      //fs.unlinkSync(localFilePath)
//       return response;
//   }catch(error){
//     fs.unlinkSync(localFilePath)
//     return null
//   }
// }


// export {uploadOnCloudinary};


import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("Uploaded successfully:", response.secure_url);

    // delete temporary file
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    console.error("CLOUDINARY UPLOAD ERROR --->", error);

    // delete file only if exists
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export { uploadOnCloudinary };