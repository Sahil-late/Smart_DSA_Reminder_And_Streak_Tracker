import dbConnect from "@/app/lib/mongoDb";
import userProblemsList from "@/app/models/userProblemsList";
import problemsList from "@/app/models/problemsList";
export async function PATCH(request) {
    let data = await request.json()
    console.log(data);

    let defaultIt = await problemsList.find({})
    let exists = await userProblemsList.find({ $and: [{ Email: data.user }, { Provider: data.provider }] })
    let update = exists[0].Problems.map(
        (Q) => {
            if (Q.id == data.id) {
                Q.status = 'Completed'
                return Q
            }
            return Q
        })

    await userProblemsList.updateOne({ $and: [{ Email: data.user }, { Provider: data.provider }] }, { $set: { Problems: update } })
    return Response.json('hi')
}