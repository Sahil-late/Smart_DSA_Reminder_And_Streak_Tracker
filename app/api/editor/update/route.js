import codes from '../../../models/Codes'
import dbConnect from '@/app/lib/mongoDb'

export async function POST(request) {
    try {
        await dbConnect()
        let body = await request.json()
        console.log(body);
        let { User, Question, Language,Provider } = body
        await codes.updateOne({User,Provider, Question, Language},{$set:body})
        return Response.json({ msg: 'updated successfuly' })
    }
    catch (err) {
        console.log(err);
    }
}