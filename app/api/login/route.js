import react from 'react'
import dbConnect from '../../lib/mongoDb'
import Sign from '../../models/SignIn'
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken'
import { cookies } from 'next/headers'


export async function POST(request) {
    dbConnect()
    const cookieStore = await cookies();
    const { email, password } = await request.json()
    let exists = await Sign.findOne({ email })
    if (!exists) return Response.json({ msg: 'Please sign In First' })
    let { email: em, password: pass } = exists
    let passCheck = await bcrypt.compare(password, pass)
    if (!passCheck) return Response.json({ msg: 'Incorrect Password' })
    const payload = { email:em, password:pass };
    const JWT_TOKEN = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
    cookieStore.set("token", JWT_TOKEN, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7
    });
    return Response.json({ msg: 'Login Successfuly' })
}