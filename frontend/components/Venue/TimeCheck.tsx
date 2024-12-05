/**
 * Determines if the venue is currently open 
 * @param startTimeStr when venue opens (in the form "11:00 AM")
 * @param endTimeStr when venue closes (in the form "12:00 AM")
 * @returns boolean
 */
function isCurrentTimeInRange(startTimeStr, endTimeStr) {
  if (startTimeStr === undefined || endTimeStr === undefined) {
    return false;
  }

  const now = new Date();
  const targetDay = now.getDay();

  function parseTimeToDate(timeStr, targetDay) {
    const timeParts = timeStr.trim().match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);

    if (!timeParts) {
      if (timeStr.toLowerCase().includes("open")) {
        const date = new Date();
        date.setDate(date.getDate() - date.getDay() + targetDay);
        date.setHours(0, 0, 0, 0); 
        return date;
      } else if (timeStr.toLowerCase().includes("closed")) {
        return null; 
      } else {
        return null; 
      }
    }

    const [, hoursStr, minutesStr, modifier] = timeParts;
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
    date.setHours(hours, minutes, 0, 0);

    if (isNaN(date.getTime())) {
      return null;
    }

    return date;
  }

  const startTime = parseTimeToDate(startTimeStr, targetDay);
  const endTime = parseTimeToDate(endTimeStr, targetDay);

  if (startTime === null || endTime === null) {
    return false;
  }

  if (endTime < startTime) {
    endTime.setDate(endTime.getDate() + 1);
  }

  return now >= startTime && now <= endTime;
}

export default isCurrentTimeInRange;
