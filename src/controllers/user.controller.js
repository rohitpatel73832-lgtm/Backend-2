import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"; 
import{User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";





const registerUser = asyncHandler( async (req,res) =>{
    // res.status(200).json({
    //     message:"ok"
    // })

    //get user details from frontened
    //validation-not empty
    //check if user already exist
    //check for images
    //check for avataar
    //upload them to cloudinary,avataar
    //create user object-create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return response
    


    const {fullname,email,username,password}=req.body
    console.log("email:",email);

    if(
        [fullname,email,username,password].some((field)=>
        field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required")
    }

    const existUser=User.findOne({
        $or:[{username},{email}]
    })
    if(existUser){
        throw new ApiError(409,"User with username,email already exist")
    }
    const avatarLocalPath=req.files?.avatar[0]?.path
    const coverImageLocalPath=req.files?.coverImage[0].path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverImage=await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }
    
    const user=await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser=User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"something went wrong when registration")
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )

})

export {
    registerUser,
};