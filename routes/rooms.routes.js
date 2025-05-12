// rooms.routes.js
import express from "express";
import { createRooms, getRooms } from "../services/rooms.service.js";
const router = express.Router();

router.post("/", async function (request, response) {
  try {
    const data = request.body;
    const rooms = await createRooms(data);
    response.status(201).json({
      statusCode: 201,
      message: "Room created successfully",
      data: rooms,
    });
  } catch (error) {
    response.status(500).json({
      statusCode: 500,
      message: "Error creating room",
      error: error.message,
    });
  }
});

router.get("/", async function (request, response) {
  try {
    const rooms = await getRooms();
    response.status(200).json({
      statusCode: 200,
      message: "Rooms fetched successfully",
      data: rooms,
    });
  } catch (error) {
    response.status(500).json({
      statusCode: 500,
      message: "Error fetching rooms",
      error: error.message,
    });
  }
});

export default router;
