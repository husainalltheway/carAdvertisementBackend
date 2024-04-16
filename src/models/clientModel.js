import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose, {Schema} from "mongoose";
import { CLIENT_DETAILS, ADVERTISEMENT_DETAILS } from "../constants/databaseConstants/databaseConstants.js";
import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET, REFERESH_TOKEN_EXPIRY, REFERESH_TOKEN_SECRET } from "../constants/databaseConstants/tokenConstants.js";

const clientSchema = new Schema(
    {
        clientName: {
            type: String,
            required: true,
        },
        clientUserNAme: {
            type: String,
            required: true,
            unique: true,
            lowerCase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: [true, 'Password is required !!']
        },
        refreshToken: {
            type: String
        },
        addHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: ADVERTISEMENT_DETAILS
            }
        ]
    },
    {
        timestamps: true
    }
)

clientSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

clientSchema.methods.isPasswordCorrect = async function  (password) {
    return await bcrypt.compare(password, this.password)
}

clientSchema.methods.generateAccessToken = async function () {
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            clientName: this.clientName,
            clientUserNAme: this.clientUserNAme
        },
        ACCESS_TOKEN_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRY
        }
    )
}

clientSchema.methods.generateRefereshToken = async function () {
    jwt.sign(
        {
            _id: this._id,
        },
        REFERESH_TOKEN_SECRET,
        {
            expiresIn: REFERESH_TOKEN_EXPIRY
        }
    )
}
export const Client = mongoose.model(CLIENT_DETAILS, clientSchema)