import mongoose, {Schema} from "mongoose";
import { ADVERTISEMENT_DETAILS, CLIENT_DETAILS } from "../constants/databaseConstants/databaseConstants";
import mongooseAggregatePaginate  from "mongoose-aggregate-paginate-v2"; 

const addSchema = new Schema(
    {
        url: {
            type: String,
            required: true
        },
        clientID: {
            type: Schema.Types.ObjectId,
            ref: CLIENT_DETAILS
        },
        city: [
            {
                type: String,
                required: true
            }
        ],
        state: {
            type: String
        },
        country: {
            type: String,
            required: true
        },
        startMonth: {
            type: String,
            required: true
        },
        endMonth: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

addSchema.plugin(mongooseAggregatePaginate)

export const advertisement = mongoose.model(ADVERTISEMENT_DETAILS, addSchema)