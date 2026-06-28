'use client'
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const Profile = () => {
    const { data: session } = useSession()
    console.log(session);
    
    return (
        <>
            <div className="cont h-dvh w-dvw bg-black text-amber-100 relative">
                <div className="profile_pic h-[20vh] bg-[#4e4646] flex flex-col justify-between  items-center px-2 ">
                    {session?.user?.image && <img className='h-30 w-30 rounded-full ' src={`${session?.user?.image}`} alt='' />}
                    <div className="name uppercase">{session?.user?.name}</div>
                </div>
                <Link href='/home'>
                    <button className='absolute bottom-4 left-4'>Back Home</button>
                </Link>

            </div>
        </>
    )
}

export default Profile