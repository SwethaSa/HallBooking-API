
import { client } from '../index.js';


export async function bookRooms(data) {
    return await client.db("hall").collection("bookings").insertOne({
        customerName: data.customerName,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        roomId: data.roomId
    });
}
export async function checkRooms(data) {
    return await client.db("hall").collection("bookings").findOne({
        roomId: data.roomId,
        date: data.date,
        $or: [
            { startTime: { $gte: data.startTime, $lte: data.endTime } },
            { endTime: { $gte: data.startTime, $lte: data.endTime } }
        ]
    });
}
