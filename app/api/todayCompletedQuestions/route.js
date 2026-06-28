import dailyCompletedQuestion from "@/app/models/dailyCompletedQuestion";
export async function POST(request) {
    let {Limit,Email,Provider,date} = await request.json()
    let today = await dailyCompletedQuestion.find({$and:[{Email},{Provider},{'Questions.date':new Date(date)}]},{'Questions.$':1})        
    let limit = today[0]?.Questions[0]?.solved?.length   
    return Response.json({limit},{status:201})
}