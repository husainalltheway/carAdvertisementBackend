import registerSchema  from "../schemaFiles/registerUserSchema.js";
import { ApiError } from "../../src/utils/ApiErrors.js";

export const registerAPI = {
  "/users/register": {
    post: {
      tags: ["USER"],
      summary: "User Register",
      description: "API to register user for the first time",
      requestBody: {
        description: "Request format",
        content: {
          "application/json": {
            schema: {
              ...registerSchema,
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
                data: {
                  _id: "sflefbfbkdjoajefjf",
                  clientName: "Leo Messi",
                  clientUserNAme: "leomessi",
                  email: "example@gmail.com",
                  phoneNumber: "1234567890",
                  location: "noida",
                  addHistory: [],
                  createdAt: "present date",
                  updatedAt: "present date",
                  __v: 0,
                },
              },
            },
          },
        },
        ApiError
      },
    },
  },
};
