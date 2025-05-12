// rooms.service.js
import { client } from "../index.js";

export async function getRooms() {
  try {
    return await client.db("hall").collection("rooms").find({}).toArray();
  } catch (error) {
    throw new Error("Error fetching rooms: " + error.message);
  }
}

export async function createRooms(data) {
  try {
    return await client.db("hall").collection("rooms").insertOne(data);
  } catch (error) {
    throw new Error("Error creating room: " + error.message);
  }
}
