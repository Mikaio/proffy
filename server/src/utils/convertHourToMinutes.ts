export default function covertHourToMinutes(time: string) {
    // This function will convert the time in hours like 8:00 (24 hours format) to
    // minutes multiplying the hours with 60 (the number of minutes in one single hour)
    // and adding to the minutes already had

    const [hour, minutes] = time.split(':').map(Number);
    const timeInMinutes = (hour * 60) + minutes;

    return timeInMinutes
}