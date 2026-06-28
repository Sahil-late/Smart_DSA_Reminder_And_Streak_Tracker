import codes from '../../../models/Codes'
import dbConnect from '@/app/lib/mongoDb'

export async function POST(request) {
    try {
        await dbConnect()
        let {User,Provider} = await request.json()
        console.log(User,Provider);
        let exists = await codes.find({$and:[{ User },{Provider}]},{User:0})
        console.log(exists);
                
        return Response.json({ mycodes: exists })
    }
    catch (err) {
        console.log(err);
    }
}