import dailyCompletedQuestion from "@/app/models/dailyCompletedQuestion"
export const POST = async (request) => {
    let data = await request.json()
    let question = data.data.question
    
    await dailyCompletedQuestion.updateOne({ $and: [{ Email: data.user }, { Provider: data.provider }, { 'Questions.date': new Date(data.date) }] }, { $addToSet: { "Questions.$.solved": data.data }, $inc: { xp: data.data.xp } })    
    return Response.json({ msg: `Question ${question} Completed Successfully` })
}