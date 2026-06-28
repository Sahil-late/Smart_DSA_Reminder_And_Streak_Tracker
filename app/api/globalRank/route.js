import dbConnect from "@/app/lib/mongoDb"
import dailyCompletedQuestion from "@/app/models/dailyCompletedQuestion"
export async function GET() {
    try {
        await dbConnect()
        let users = await dailyCompletedQuestion.find({}).sort({ xp: -1 })        
        let ranks = users.map((u) => {
            if (u) return { Email: u.Email, xp: u.xp,_id:u._id }
        })
        return Response.json({ ranks },{status:200})
    } catch(er){
        return Response.json({ msg:er },{status:500})
    }
}