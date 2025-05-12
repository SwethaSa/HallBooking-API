// bookings.routes.js
import express from "express";
import { allBookings } from "../services/bookings.service.js";
const router = express.Router();

router.get("/", async function (request, response) {
  try {
    const bookings = await allBookings();
    response.status(200).json({
      statusCode: 200,
      message: "All bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    response.status(500).json({
      statusCode: 500,
      message: "Error fetching bookings",
      error: error.message,
    });
  }
});

export default router;
