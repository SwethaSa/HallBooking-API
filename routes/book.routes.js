// book.routes.js
import express from "express";
import { checkRooms, bookRooms } from "../services/book.service.js";
const router = express.Router();

router.post("/", async function (request, response) {
  try {
    const data = request.body;
    const roomBooking = await checkRooms(data);

    if (roomBooking) {
      return response.status(400).json({
        statusCode: 400,
        message: "Room already booked for the same time and date.",
      });
    }

    const bookings = await bookRooms(data);
    response.status(201).json({
      statusCode: 201,
      message: "Room booked successfully",
      data: bookings,
    });
  } catch (error) {
    response.status(500).json({
      statusCode: 500,
      message: "Error booking room",
      error: error.message,
    });
  }
});

export default router;
