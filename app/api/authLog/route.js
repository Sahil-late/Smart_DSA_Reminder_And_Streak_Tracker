import react from 'react'
import dbConnect from '../../lib/mongoDb'
import Auth from '../../models/Auth'

export async function POST(request) {
    try {
        

        dbConnect()
        const { email, provider } = await request.json()
        let exist = await Auth.findOne({ email, provider });
        if (!exist) {
            let sign = new Auth({ email, provider });
            await sign.save();
        }
        return Response.json({ msg: 'Login Successfuly' }, { status: 200 })
    } catch (err) {
        return Response.json({ msg: 'Something went wrong' }, { status: 500 })
    }
}