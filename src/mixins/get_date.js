
const getDate = () => {
    const date = new Date()
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const day = date.toLocaleString("default", { day: "2-digit" });
    const dateFormat = year + "-" + month + "-" + day;
    return dateFormat

}

export {getDate}