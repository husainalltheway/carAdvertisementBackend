import loginSchema from "../schemaFiles/loginUserSchema.js";
import { ApiError } from "../../src/utils/ApiErrors.js";

export const userLogin = {
  "/users/login": {
    post: {
      tags: ["USER"],
      summary: "User Login",
      description: "API to get user logged in each time",
      requestBody: {
        description: "Request format",
        content: {
          "application/json": {
            schema: {
              ...loginSchema,
            },
          },
        },
      },
      responses: {
        200: {
          description:
            "The response body in JSON format as requested in format parameter.",
          content: {
            "application/json": {
              example: {
                statusCode: 200,
                data: {
                  user: {
                    _id: "dfjgvnfnsvnsfnbn",
                    clientName: "your name",
                    clientUserNAme: "your username",
                    email: "example@example.com",
                    phoneNumber: 7894561230,
                    location: "your city",
                    password:
                      "you password",
                    addHistory: [],
                    createdAt: "2024-05-07T10:37:06.721Z",
                    updatedAt: "2024-05-17T05:26:16.125Z",
                    __v: 0,
                  },
                  accessToken:
                    "kdv;klklvrknvkrtnbrntnrnjnvjrntgngjnnjkngjrengjkng nrjgnjreng ",
                  refreshToken:
                    "v4sliPvzjssEipR4xuKKxZgL64bC4k",
                },
                message: "User logged in successfully",
                success: true,
              },
            },
          },
        },
        ApiError
      },
    },
  },
};
