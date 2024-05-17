import { apisArray } from "./optionComponents/apis.js"
import Apipaths from "./optionComponents/paths.js"
import { servers } from "./optionComponents/server.js"
import { openapi, info } from "./optionComponents/swaggerInfo.js"


export const options = {
    definition: {
        openapi,
        info,
        servers,
        paths: Apipaths,
    },
    apis: apisArray
}