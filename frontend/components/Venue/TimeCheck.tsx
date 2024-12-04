/**
 * Determines if the venue is currently open 
 * @param startTimeStr when venue opens (in the form "11:00 AM")
 * @param endTimeStr when venue closes (in the form "12:00 AM")
 * @returns boolean
 */
function isCurrentTimeInRange(startTimeStr, endTimeStr) {
  const now = new Date();
  const targetDay = now.getDay();  
 

  function parseTimeToDate(timeStr, targetDay) {
    const timeParts = timeStr.trim().match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
   
    if (!timeParts) {
      console.error("Invalid time format:", timeStr);
      return new Date("invalid");
    }

    const [ , hoursStr, minutesStr, modifier] = timeParts;
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    const date = new Date();
    date.setDate(date.getDate() - date.getDay() + targetDay); 
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  const startTime = parseTimeToDate(startTimeStr, targetDay);
  const endTime = parseTimeToDate(endTimeStr, targetDay);

  if (startTime.getTime() === new Date("invalid").getTime() || endTime.getTime() === new Date("invalid").getTime()) {
    return false;
  }

  if (endTime < startTime) {
    endTime.setDate(endTime.getDate() + 1);
  }

  if (now < startTime) {
    return now <= endTime;
  }

  return now >= startTime && now <= endTime;
}

export default isCurrentTimeInRange;
