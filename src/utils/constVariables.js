export const filterOptions = [
  { value: "all", label: "All" },
  { value: "sold-stock", label: "Stock-sold" },
  { value: "bought-stock", label: "Stock-bought" },
  { value: "deposite-cash", label: "Cash-deposite" },
  { value: "withdraw-cash", label: "Cash-withdraw" },
];

export const currentDateAndTimestamp = new Date()
  .toISOString()
  .slice(0, 23)
  .replace("T", " ");

const localHost = "localhost:8080";
const aws_backend = "13.60.37.74:8080";
export const SERVER_IP_ADDRESS = aws_backend;

//13.60.37.74:8080
