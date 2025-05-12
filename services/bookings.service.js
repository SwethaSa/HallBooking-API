import { client } from '../index.js';



export async function allBookings() {
    return await client.db("hall").collection("bookings").aggregate([
        {
            $lookup: {
                from: "rooms",
                localField: "roomId",
                foreignField: "roomId",
                as: "room_data"
            }
        },
        {
            $unwind: "$room_data"
        },
        {
            $project: {
                roomName: "$room_data.roomName",
                customerName: "$customerName",
                date: "$date",
                startTime: "$startTime",
                endTime: "$endTime",
                bookedStatus: {
                    $cond: [
                        {
                            $and: [
                                {
                                    $gte: ["$startTime", new Date()]
                                },
                                {
                                    $lte: ["$endTime", new Date()]
                                }
                            ]
                        },
                        "Booked",
                        "Available"
                    ]
                }
            }
        }
    ]).toArray();
}
