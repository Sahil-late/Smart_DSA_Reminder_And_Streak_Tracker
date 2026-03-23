'use client'
import React from 'react'
import {useRef} from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
  let router = useRouter()
  const upper = useRef()
  const lower = useRef()
  const mouth = useRef()
  const page = useRef()
  const animate = ()=>{
    upper.current.classList.add('lower')
    lower.current.classList.add('upper')
    mouth.current.classList.add('hidden')
    page.current.classList.add('effect')
    setTimeout(()=>{
      router.push('/home')
    },4000)
  }

  return (
    <div ref={page} className='h-dvh flex flex-col justify-between bg-amber-400 overflow-hidden'>
      <div ref={upper} className="mouthUpper h-[70%] bg-gray-700 flex flex-col justify-around ">
        <div className="eyes flex w-full justify-around">
          <div className="leftEye h-25 w-25 border bg-amber-200 rounded-full">
          </div>
          <div className="rightEye h-25 w-25 border bg-amber-200 rounded-full">
          </div>
        </div>
        <div className="nose  w-0 h-0 mx-auto border border-x-50 border-x-transparent border-b-100 border-t-transparent "></div>
      </div>
      <div ref={mouth} className="mouthOpen h-[10%] bg-amber-400 flex justify-center items-center">
        <button onClick={animate} className='text-amber-800'>Let`s Begin</button>
      </div>
      <div ref={lower} className="mouthLower h-[20%] bg-gray-700"></div>
    </div>
  )
}

export default Page