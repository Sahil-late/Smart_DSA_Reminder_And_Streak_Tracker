import react from 'react'
import dbConnect from '../../lib/mongoDb'
import Sign from '../../models/SignIn'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import dotenv from 'dotenv'
dotenv.config()

export async function POST(request) {
    dbConnect()
    const { email, password } = await request.json()
    console.log(email,password);
    
    const cookieStore = await cookies();
    let exists = await Sign.findOne({ email })
    if (!exists) {
        return Response.json({ msg: 'Email Not Exists' })
    }

    const hashPass = await bcrypt.hash(password, 10)

    const payload = { email,password };
    
    const JWT_TOKEN = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
    
    cookieStore.set("token", JWT_TOKEN, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7
    });

    await Sign.updateOne({ email },
        { $set: { password: hashPass } })

    return Response.json({ msg: 'Password Changes Successfully' })
}