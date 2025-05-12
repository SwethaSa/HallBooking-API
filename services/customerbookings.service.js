import { client } from "../index.js";

export async function getCustomerBookings() {
  return await client
    .db("hall")
    .collection("bookings")
    .aggregate([
      {
        $lookup: {
          from: "rooms",
          localField: "roomId",
          foreignField: "roomId",
          as: "room_data",
        },
      },
      {
        $unwind: "$room_data",
      },
      {
        $project: {
          roomName: "$room_data.roomName",
          customerName: "$customerName",
          date: "$date",
          startTime: "$startTime",
          endTime: "$endTime",
        },
      },
    ])
    .toArray();
}
