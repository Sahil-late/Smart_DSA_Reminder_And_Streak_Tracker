import react from 'react'
import dbConnect from '../../lib/mongoDb'
import Problems from '../../models/problemsList'

export async function GET() {
    try {
        dbConnect()
        let Questions = await Problems.find({})
        return Response.json(Questions)
    } catch (err) {
        console.log(err);
        return Response.json({ msg: 'Something went wrong' }, { status: 500 })
    }
}