import react from 'react'
import dbConnect from '../../lib/mongoDb'
import Problem from '../../models/problemsList'
import userProblemsList from '../../models/userProblemsList'
import newQuestions from '../../utils/addNewQuestion'
export async function POST(request) {
    try {
        dbConnect()
        let {Email,provider} = await request.json()
        let Uproblems = await userProblemsList.find({$and:[{Provider:provider,Email}]})
        let Questions = await Problem.find({}) 
        
        //await Problem.updateMany({},{$set:{status:"incomplete"}})       
        if(Uproblems.length!=0){
           return Response.json({problems:Uproblems[0].Problems,provider})
        }
        await userProblemsList.insertOne({Email,Provider:provider,Problems:Questions})
        return Response.json({problems:Questions,provider})
    } catch (err) {
        return Response.json({ msg: 'Something went wrong' }, { status: 500 })
    }
}