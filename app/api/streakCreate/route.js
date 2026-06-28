import dbConnect from "@/app/lib/mongoDb"
import dailyCompletedQuestion from "@/app/models/dailyCompletedQuestion"
export async function PATCH(request) {
    await dbConnect()
    let data = await request.json()    
    let visit = await dailyCompletedQuestion.find({$and:[{ Email: data.user}, {Provider: data.provider }]})
    if (visit.length == 0) {
        let Entry = new dailyCompletedQuestion({
            Email: data.user,
            Provider: data.provider,
            Questions: [{
                date: data.date,
            }],
        })
        await Entry.save()
    }
    let exists = await dailyCompletedQuestion.find({ $and: [{ Email: data.user }, { Provider: data.provider }, { 'Questions.date': data.date }] }, { "Questions.$": 1 })
    
    if (!exists[0]) {
        await dailyCompletedQuestion.updateOne({ $and: [{ Email: data.user }, { Provider: data.provider }] }, {
            $push: {
                Questions: {
                    date: data.date,
                    solved: [],
                },
            },
        })
        return Response.json({ msg: `Streak +1` })
    }
    return Response.json({ msg: `todays streak alleady updated` })
}