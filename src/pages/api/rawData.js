import axios from "axios"
import { BASE_URL } from "../../../config"

export const getRawData = async (url) => {

    return await axios.get(`${BASE_URL}raw`).then(({ data }) => data).catch(err => err)

}