import dbConnect from "@/app/lib/mongoDb"
import dailyCompletedQuestion from "@/app/models/dailyCompletedQuestion"
export async function POST(request) {
    await dbConnect()
    let data = await request.json()
    let user = await dailyCompletedQuestion.find({ $and: [{ Email: data.user }, { Provider: data.provider }] }, { xp: 1, _id: 0 })
    return Response.json({ xp:user[0].xp })

}