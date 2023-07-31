import axios from "axios"
import { BASE_URL } from "../../../config"

export const getByResourceName = async (resName) => {
    return await axios.get(`${BASE_URL}resources/${resName}`).then(({ data }) =>
        data).catch(err => err)

}