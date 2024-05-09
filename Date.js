const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getMonth(index) {
    return months[index];
}

function getDayOfWeek(index) {
    return daysOfWeek[index];
}

export function getDate(dateString) {
    let dateObj = new Date(dateString);
    //Fri, 03 May, 2024
    let day = getDayOfWeek(dateObj.getDay());
    let date = dateObj.getDate();

    date = date < 10 ? '0' + date : date

    let month = getMonth(dateObj.getMonth());
    let year = dateObj.getFullYear();

    return `${day}, ${date} ${month}, ${year}`
}