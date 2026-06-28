import dbConnect from "@/app/lib/mongoDb"
import dailyCompletedQuestion from "@/app/models/dailyCompletedQuestion"
export async function POST(request) {
    await dbConnect()
    let data = await request.json()        
    let users = await dailyCompletedQuestion.find({}).sort({xp:-1})
    let rank = (users.findIndex((u,i)=>u.Email == data.user && u.Provider==data.provider)+1)    
    return Response.json({ rank })
}