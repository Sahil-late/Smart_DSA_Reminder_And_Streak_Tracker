import codes from '../../../models/Codes'
import dbConnect from '@/app/lib/mongoDb'

export async function POST(request) {
    try {
        await dbConnect()
        let body = await request.json()
        console.log(body);
        
        let { User, Provider , Question, Language } = body
        let exists = await codes.find({ User, Provider, Question, Language })
        if (exists.length !== 0) return Response.json({ msg: 'allready exists can you want to update it' })
        let myCodes = new codes(body)
        await myCodes.save()
        return Response.json({ msg: 'saved successfuly' })

    }
    catch (err) {
        console.log(err);
    }
}