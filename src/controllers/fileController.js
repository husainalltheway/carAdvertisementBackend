import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { advertisement } from "../models/advertisementModel.js"

const uploadAdvertisementFile = asyncHandler(async (req, res, next) => {
  const { userId, city, state, country, startMonth, endMonth } = req.body;
  if (
    [userId, city, country, startMonth, endMonth].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const advertisementFileLocalPath = req.files?.advertisementFile[0]?.path;
  if (!advertisementFileLocalPath) {
    throw new ApiError(400, "addvertisement file is required");
  }
  const advertisementFile = await uploadOnCloudinary(
    advertisementFileLocalPath
  );

  if (!advertisementFile) {
    throw new ApiError(400, "Advertisement file not uploaded");
  }
  let assetUrl = advertisementFile.url;
  let assetIdFromCloud = advertisementFile.asset_id;
  let publicIdFromCloud = advertisementFile.public_id;
  try {
    const insertInDb = await advertisement.create({
      url: assetUrl,
      assetId: assetIdFromCloud,
      publicId: publicIdFromCloud,
      clientID: userId,
      city: city.toLowerCase(),
      state: state.toLowerCase(),
      country: country.toLowerCase(),
      startMonth: startMonth.toLowerCase(),
      endMonth: endMonth.toLowerCase(),
    });
    advertisement
      .findById(insertInDb._id)
      .select("-city -state -country -startMonth -endMonth")
      .then((response) => {
        if (response) {
          return res
            .status(201)
            .json(new ApiResponse(200, response, "FILE UPLOADED !!"));
        } else {
          console.log("error while inserting file in database");
        }
      });
  } catch (error) {
    throw new ApiError(400, "Failed in inserting database");
  }
});

export { uploadAdvertisementFile };
