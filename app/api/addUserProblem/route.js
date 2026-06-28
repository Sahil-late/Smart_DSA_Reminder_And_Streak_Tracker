import react from 'react'
import dbConnect from '../../lib/mongoDb'
import Problems from '../../models/problemsList'
import userProblemsList from '../../models/userProblemsList'
import newQuestions from '../../utils/addNewQuestion'
export async function POST(request) {
    try {
        dbConnect()
        let {Email} = await request.json()
        let Questions = await Problems.find({})
        let Uproblems = await userProblemsList.find({Email})
        let userProblems =  (await Uproblems[0].Problems).map((Q)=> Q.question)
        let addQuestions = newQuestions(userProblems,Questions)
        return Response.json(addQuestions)
    } catch (err) {
        console.log(err);
        return Response.json({ msg: 'Something went wrong' }, { status: 500 })
    }
}