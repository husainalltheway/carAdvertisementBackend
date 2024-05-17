import { userLogin } from '../apiPaths/loginUser.js'
import { registerAPI } from '../apiPaths/registerUserAPI.js'

const Apipaths = {
    ...registerAPI,
    ...userLogin
}

export default Apipaths