import react from 'react'
import dbConnect from '../../lib/mongoDb'
import Sign from '../../models/SignIn'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function POST(request) {
    try {
        dbConnect()
        const { autoLog } = await request.json()
        let cookie = await cookies()
        const tokenCookie = cookie.get("token");
        const accesstokenCookie = cookie.get("AccessToken");
        if (!tokenCookie?.value && !accesstokenCookie?.value) {
            return Response.json({ msg: "Authorization Required" }, { status: 401 });
        }
        if (!accesstokenCookie) {
            let { email, password } = jwt.verify(tokenCookie.value, process.env.JWT_SECRET)
            let payload = { email, password }
            const Access_JWT_TOKEN = jwt.sign(payload, process.env.ACCESS_JWT_SECRET, {
                expiresIn: "3h"
            });
            cookie.set("AccessToken", Access_JWT_TOKEN, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 3
            });
            let exists = await Sign.findOne({ email })
            if (!exists) return Response.json({ msg: 'Authorization Required' })
            return Response.json({ msg: 'Login Successfuly' }, { status: 200 })
        }

        let { email } = jwt.verify(accesstokenCookie.value, process.env.ACCESS_JWT_SECRET)
        let exists = await Sign.findOne({ email })
        if (!exists) return Response.json({ msg: 'Authorization Required' })
        return Response.json({ msg: 'Login Successfuly' })
    } catch (er) {
        return Response.json({ msg: 'server error' }, { status: 500 })
    }
}