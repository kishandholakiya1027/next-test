import axios from "axios"
import { BASE_URL } from "../../../config"

export const getApplication = async () => {
    await axios.get(`${BASE_URL}applications`).then(({ data }) => data).catch(err => err)

}
export const getByApplicationName = async (appName) => {
    return await axios.get(`${BASE_URL}applications/${appName}`).then(({ data }) => data).catch(err => err)

}