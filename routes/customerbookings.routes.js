// customerbookings.routes.js
import express from "express";
import { getCustomerBookings } from "../services/customerbookings.service.js";
const router = express.Router();

router.get("/", async function (request, response) {
  try {
    const bookings = await getCustomerBookings();
    response.status(200).json({
      statusCode: 200,
      message: "Customer bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    response.status(500).json({
      statusCode: 500,
      message: "Error fetching customer bookings",
      error: error.message,
    });
  }
});

export default router;
