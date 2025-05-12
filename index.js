// app.js
import express from "express";
import roomsRoute from "./routes/rooms.routes.js";
import bookRoute from "./routes/book.routes.js";
import bookingsRoute from "./routes/bookings.routes.js";
import cusbookingsRoute from "./routes/customerbookings.routes.js";

import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);

await client.connect();
console.log("Your MongoDB is connected😍👍");

app.use(express.json());

// Handle error for all routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    statusCode: 500,
    message: "Internal Server Error",
  });
});

app.get("/", function (request, response) {
  response.send(`
    <html>
      <head>
        <style>
          body { background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh; }
          p { font-size: large; font-family: sans-serif; color: lightviolet; display: flex; align-items: center; }
          img { height: 150px; width: 150px; margin-right: 10px; }
          a { color: white; font-size: x-large; }
        </style>
      </head>
      <body>
        <p>
          <img src="https://cdn-icons-png.flaticon.com/512/2645/2645420.png">
          <a href="https://hall-booking-api.vercel.app/rooms" target="_blank">Total rooms</a>
        </p>
        <p>
          <img src="https://cdn-icons-png.flaticon.com/512/1535/1535044.png">
          <a href="https://hall-booking-api.vercel.app/bookings" target="_blank">All Bookings</a>
        </p>
        <p>
          <img src="https://cdn-icons-png.flaticon.com/512/6543/6543839.png">
          <a href="https://hall-booking-api.vercel.app/customer_bookings" target="_blank">Customer with Booked Data</a>
        </p>
      </body>
    </html>
  `);
});

app.use("/rooms", roomsRoute);
app.use("/book", bookRoute);
app.use("/bookings", bookingsRoute);
app.use("/customer-bookings", cusbookingsRoute);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export { client };
