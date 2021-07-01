function getInputDateTime(dateToConvert = Date.now()) {
  // Takes a given date and converts it to a format recognized by the
  // HTML datetime-local input element
  const currentDateTime = new Date(dateToConvert);
  let currentMonth = currentDateTime.getMonth() + 1;
  let currentDate = currentDateTime.getDate();
  if (currentMonth < 10) currentMonth = "0" + currentMonth;
  if (currentDate < 10) currentDate = "0" + currentDate;
  let currentHour = currentDateTime.getHours();
  let currentMinutes = currentDateTime.getMinutes();
  if (currentHour < 10) currentHour = "0" + currentHour;
  if (currentMinutes < 10) currentMinutes = "0" + currentMinutes;
  const today = `${currentDateTime.getFullYear()}-${currentMonth}-${currentDate}T${currentHour}:${currentMinutes}`;
  return today;
}

export default getInputDateTime;