import react from 'react'
import dbConnect from '../../lib/mongoDb'
import Sign from '../../models/SignIn'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import dotenv from 'dotenv'
dotenv.config()

export async function POST(request) {
    const { email, password } = await request.json()
    const cookieStore = await cookies();
    const hashPass = await bcrypt.hash(password,10)
    dbConnect()
    let sign = new Sign({
        email,
        password:hashPass
    })
    let exists = await Sign.findOne({ email })
    if (exists) {
        return Response.json({ msg: 'Email Allready Exists' })
    }
    const payload = { email ,password};
    
    const JWT_TOKEN = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    const Access_JWT_TOKEN = jwt.sign(payload, process.env.ACCESS_JWT_SECRET, {
        expiresIn: "3h"
    });

    cookieStore.set("token", JWT_TOKEN, {
    httpOnly: true,    
    secure: true,      
    sameSite: "strict", 
    maxAge: 60 * 60 * 24 * 7
    });

    cookieStore.set("AccessToken", Access_JWT_TOKEN, {
    httpOnly: true,    
    secure: true,      
    sameSite: "strict", 
    maxAge: 60*60*3
    });

    await sign.save()
    return Response.json({ msg: 'Sign-In Successfuly' })
}