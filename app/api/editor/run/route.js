import React from 'react'

export const POST = async (request) => {
    try {
        let { code, lang_id } = await request.json()
        let res = await fetch("https://ce.judge0.com/submissions?wait=true", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                source_code: code,
                language_id: lang_id,
            }),
        })
        let output = await res.json()
        return Response.json({output}, { status: 201 })
    } catch (err) {
        return Response.json({ err }, { status: 500 })
    }
}


