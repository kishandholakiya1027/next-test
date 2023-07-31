export const sortFunction = (key, key2, a, b) => {
    return key2
        ? a?.[`${key}`]?.[key2]
            .toLowerCase()
            ?.localeCompare(b?.[`${key}`]?.[key2].toLowerCase())
        : a?.[`${key}`]
            .toLowerCase()
            ?.localeCompare(b?.[`${key}`].toLowerCase());
}


export const searchFunction = async (data, value) => {
    let re = new RegExp(value, "i");

    return await Promise.all(data?.filter(
        (item) =>
            item?.Tags?.["app-name"]?.replace(" ", "")?.search(re) >= 0 ||
            item?.MeterCategory?.replace(" ", "")?.search(re) >= 0 ||
            item?.Location?.replace(" ", "")?.search(re) >= 0
    ))
} 