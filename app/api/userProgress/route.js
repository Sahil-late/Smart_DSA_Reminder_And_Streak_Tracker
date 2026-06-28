import dailyCompletedQuestion from "@/app/models/dailyCompletedQuestion"
export const POST = async (request) => {
    let data = await request.json()
    let res = await dailyCompletedQuestion.find({ Email: data.user, Provider: data.provider }, { 'Questions.date': 1, 'Questions.solved': 1, _id: 0 })
    console.log(res[0]?.Questions, 'deb');
    if(res[0]?.Questions.length==0 || res[0]?.Questions == undefined) return  Response.json({ data: 0 })
    let weekDate = res[0].Questions.filter((e) => new Date(e.date) >= new Date(data.startOfWeek) && new Date(e.date) <= new Date(data.endOfWeek))

    if (weekDate.length === 0) return Response.json({ data: 0 })
    let week = weekDate.map((e) => {
        if (e.date) {
            return { [new Date(e.date).toDateString().split(" ")[0]]: e.solved.length }
        }
    })

    let daysOfWeek = week.reduce((acc, cur) => {
        acc = { ...acc, ...cur }
        return acc
    }, {})

    return Response.json({ data: daysOfWeek })
}