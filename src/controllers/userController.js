import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { Client } from "../models/clientModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, userName, email, phoneNumber, location, password } = req.body;

  if ([name, userName, email, phoneNumber, location, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = Client.findOne({
    $or: [{ email }, { userName }],
  });
  if (existedUser) {
    console.log('existedUser: ', existedUser);
    throw new ApiError(409, "USER ALREADY EXIST");
  }
  const user = await Client.create({
    clientName: name.toLowerCase(),
    clientUserNAme: userName.toLowerCase(),
    email: email,
    phoneNumber: phoneNumber,
    location: location.toLowerCase(),
    password: password,
  });
  const createdUser = Client.findById(user._id).select(
    "-password -refreshToken"
  )
  if(!createdUser) {
    throw new ApiError(500, "Something well wrong while registring user")
  }
  return res.status(201).json(
    new ApiResponse(200, createdUser,"USER CREATED !!")
  )
});

export { registerUser };
