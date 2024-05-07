import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { Client } from "../models/clientModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Funtion to generate access and refresh token 
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await Client.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefereshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong wjile generating refresh and access token"
    );
  }
};

// API to register user
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, userName, email, phoneNumber, location, password } = req.body;

  if (
    [name, userName, email, phoneNumber, location, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await Client.findOne({
    $or: [{ email }, { userName }],
  });
  if (existedUser) {
    throw new ApiError(409, "USER ALREADY EXIST");
  }
  const newUser = await Client.create({
    clientName: name.toLowerCase(),
    clientUserNAme: userName.toLowerCase(),
    email: email,
    phoneNumber: phoneNumber,
    location: location.toLowerCase(),
    password: password,
  });
  const createdUser = await Client.findById(newUser._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something well wrong while registring user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "USER CREATED !!"));
});

// API to get User logged in
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new ApiError(400, "email is required");
  }
  const user = await Client.findOne({
    email: email,
  });

  if (!user) {
    throw new ApiError(404, "user does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await Client.findById(user._id).select(
    "-password, -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToke", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

// API to get user logged out
const logoutUser = asyncHandler(async(req, res) => {
  await Client.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined
      }
    }, {
      new: true
    } 
  )

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new ApiResponse(200, {}, "User Logged Out"))

})


export { registerUser, loginUser, logoutUser };
