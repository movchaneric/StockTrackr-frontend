const colors = {
  blue: [
    "#7EC8E3",
    "#6CA6CD",
    "#9AC0CD",
    "#87CEEB",
    "#70B8D8",
    "#4682B4",
    "#5F9EA0",
    "#6495ED",
    "#00BFFF",
    "#1E90FF",
  ],
  red: [
    "#FF99A3",
    "#FF7F7F",
    "#FF5C5C",
    "#FF6A6A",
    "#FF8888",
    "#FF4500",
    "#DC143C",
    "#CD5C5C",
    "#B22222",
    "#FA8072",
  ],
  orange: [
    "#FFC993",
    "#FFD580",
    "#FFB347",
    "#FFA54F",
    "#FF8C42",
    "#FFA500",
    "#FF8C00",
    "#FF7F50",
    "#FF6347",
    "#FF4500",
  ],
  green: [
    "#77DD77",
    "#76EE00",
    "#66CDAA",
    "#7CCD7C",
    "#9ACD32",
    "#32CD32",
    "#00FF7F",
    "#3CB371",
    "#2E8B57",
    "#228B22",
  ],
  purple: [
    "#CDA4DE",
    "#C8A2C8",
    "#D1A3B5",
    "#C49EBD",
    "#C18DBB",
    "#8A2BE2",
    "#9370DB",
    "#BA55D3",
    "#DA70D6",
    "#EE82EE",
  ],
  yellow: [
    "#FFFACD",
    "#FAFAD2",
    "#FFE4B5",
    "#FFD700",
    "#F0E68C",
    "#FFFF00",
    "#FFD700",
    "#FFE135",
    "#F4C430",
    "#FFDF00",
  ],
  pink: [
    "#FFB6C1",
    "#FF69B4",
    "#FF1493",
    "#FFC0CB",
    "#DB7093",
    "#FF6347",
    "#FF82AB",
    "#FF3E96",
    "#EE3A8C",
    "#FF6EB4",
  ],
  brown: [
    "#D2B48C",
    "#F4A460",
    "#DEB887",
    "#D2691E",
    "#8B4513",
    "#A0522D",
    "#CD853F",
    "#BC8F8F",
    "#F5F5DC",
    "#FFE4C4",
  ],
  grey: [
    "#B0C4DE",
    "#778899",
    "#708090",
    "#A9A9A9",
    "#C0C0C0",
    "#D3D3D3",
    "#DCDCDC",
    "#E0E0E0",
    "#F5F5F5",
    "#F8F8FF",
  ],
};
export function colorGenerator() {
  // Get the keys of the colors object (color names)
  const colorNames = Object.keys(colors);

  // Randomly select a color name
  const randomColorName =
    colorNames[Math.floor(Math.random() * colorNames.length)];

  // Get the array of shades for the selected color name
  const shades = colors[randomColorName];

  // Randomly select a shade from the array
  const randomShade = shades[Math.floor(Math.random() * shades.length)];

  return randomShade;
}

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

// Ticker color generator

const tickerColorMap = {};

export const getColorForTicker = (ticker) => {
  if (!tickerColorMap[ticker]) {
    const color = colorGenerator();
    tickerColorMap[ticker] = color;
  }
  return tickerColorMap[ticker];
};

// use this format to pass to db because we need to have seconds, milliseconds as well
export function formatDateTimeLocalToDB(inputDateTime) {
  const date = new Date(inputDateTime);

  // Get date parts
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  // Get time parts
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Generate random seconds (0-59) and milliseconds (0-999)
  const randomSecond = String(Math.floor(Math.random() * 60)).padStart(2, "0");
  const randomMillisecond = String(Math.floor(Math.random() * 1000)).padStart(
    3,
    "0"
  );

  // Format the date and time to match the desired format
  return `${year}-${month}-${day} ${hours}:${minutes}:${randomSecond}.${randomMillisecond}`;
}

export function formatDateTimeLocal(inputDateTime) {
  const date = new Date(inputDateTime);

  // Get date parts
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  // Get time parts
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Format the date and time to match the 'datetime-local' HTML input type
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// Check date format YYYY-MM-DD or YYYY-MM-DD  HH:mm:ss.SSS
function getRandomTime() {
  // Generate a random hour between 8 AM (8) and 3 PM (15)
  const randomHour = Math.floor(Math.random() * 8) + 8;

  const randomMinute = Math.floor(Math.random() * 59) + 1;
  const randomSecond = Math.floor(Math.random() * 59) + 1;

  const randomMillisecond = Math.floor(Math.random() * 1000);

  // Format the time as HH:mm:ss.SSS
  const formattedTime = `${String(randomHour).padStart(2, "0")}:${String(randomMinute).padStart(2, "0")}:${String(randomSecond).padStart(2, "0")}.${String(randomMillisecond).padStart(3, "0")}`;

  return formattedTime;
}

export function formatDateString(dateString) {
  // Regular expression to match the format YYYY-MM-DD
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  // Check if the input string matches the YYYY-MM-DD format
  if (dateRegex.test(dateString)) {
    // Get a random time
    const randomTime = getRandomTime();
    return `${dateString} ${randomTime}`;
  }

  // If the string does not match the YYYY-MM-DD format, return it as is
  return dateString;
}

export function getCurrentDateAndTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(now.getDate()).padStart(2, "0");

  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");

  const millisecond = String(now.getMilliseconds()).padStart(3, "0");

  // Format the date and time as YYYY-MM-DD HH:mm:ss.SSS
  const formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond}`;

  return formattedDateTime;
}

export function getYesterdayFormattedDate() {
  const date = new Date();

  // Subtract one day from the current date
  date.setDate(date.getDate() - 1);

  // Get the parts of the date and time
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Format the date as YYYY-MM-DDTHH:mm
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function getNextDayAndTime() {
  const now = new Date();

  // Increment the date by 1 to get the next day
  now.setDate(now.getDate() + 30);

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(now.getDate()).padStart(2, "0");

  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");

  const millisecond = String(now.getMilliseconds()).padStart(3, "0");

  // Format the date and time as YYYY-MM-DD HH:mm:ss.SSS
  const formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond}`;

  return formattedDateTime;
}

export function formatDateForDisplay(inputDateTime) {
  const date = new Date(inputDateTime);

  // Get date parts
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  // Get time parts
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Format the date and time to match the desired format
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatDateToYYYYMMDD(dateString) {
  const dateParts = dateString.split(" "); // Split the string by spaces

  const day = dateParts[2]; // "10"
  const month = dateParts[1]; // "Sep"
  const year = dateParts[5]; // "2024"

  // Map month abbreviations to their corresponding number values
  const monthMap = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  // Convert the month abbreviation to its numeric form
  const monthNumber = monthMap[month];

  // Return the formatted date string in yyyy-mm-dd format
  return `${year}-${monthNumber}-${day}`;
}

export const getCurrentStockMarketDate = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // Sunday is 0, Saturday is 6

  // If today is Saturday (6), go back 1 day to Friday (5)
  if (dayOfWeek === 6) {
    today.setDate(today.getDate() - 1);
  }
  // If today is Sunday (0), go back 2 days to Friday (5)
  else if (dayOfWeek === 0) {
    today.setDate(today.getDate() - 2);
  }

  // Format date as YYYY-MM-DD
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Graph page date check
export function formatISOToDate(inputDateTime) {
  const date = new Date(inputDateTime);

  // Extract the year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  // Return in YYYY-MM-DD format
  return `${year}-${month}-${day}`;
}
