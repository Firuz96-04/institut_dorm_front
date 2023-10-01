
const getDate = (obj=null) => {
    let date = ''

    date = !obj ? new Date() : new Date(obj)

    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const day = date.toLocaleString("default", { day: "2-digit" });
    const dateFormat = year + "-" + month + "-" + day;
    return dateFormat

}

const getTime = () => {
    const date = new Date();
    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0');
    const timeFormat = hour +':'+minute
    return timeFormat
}


const getFull = (object) => {
    const date = new Date(object)
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const day = date.toLocaleString("default", { day: "2-digit" });
    const dateFormat = year + "-" +month+ "-" +day+ ' '+getTime()
    return dateFormat
}

export {getDate, getTime, getFull}