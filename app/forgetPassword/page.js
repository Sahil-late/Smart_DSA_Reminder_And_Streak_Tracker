'use client'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import showAlert from '../utils/showalert'
import Link from 'next/link'
import { Suspense } from 'react'


function ForgetPassPage() {
  let params = useSearchParams()
  const [url, setUrl] = useState(params.get('email') || '')
  const [visiable, setVisiable] = useState(false)
  const [visiable2, setVisiable2] = useState(false)
  const username = useRef()

  function Disable() {
    if (!url) return
    username.current.readOnly = true
  }

  useEffect(() => {
    Disable()
  }, [])

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      let formData = new FormData(e.target)
      let email = formData.get('email');
      console.log(email);
      
      let password = formData.get('password');
      let cp = formData.get('cp');
      if(password !== cp) return alert('Please Insert Same Password')
      let res = await axios.post('/api/forgetPassword',{email,password})
      showAlert({msg:`${res.data.msg}`})
      
    }catch(err){
      showAlert({msg:`${err.response.data.msg}`})
    }
  }

  return (
    <>
      <div className="cont h-dvh w-dvw bg-gray-950 flex justify-center items-center text-amber-50">
        <form className='w-[80%] flex flex-col justify-center items-center gap-4' onSubmit={handleSubmit}>
          <div className="sec1 w-full border border-amber-50 p-2 py-4 flex flex-col rounded">
            <label htmlFor="email">User Email</label>
            <div className="email w-full flex gap-2.5">
              <input ref={username} onChange={(e) => setUrl(e.target.value)} value={url} className='border-[rgba(222,179,179,0.82)] border rounded px-2 read-Only:bg-[rgba(188,175,175,0.4)] read-only:cursor-not-allowed read-only:outline-0 flex-1' id='email' type="text" name='email' />
              <button type='button' className={`border w-7 h-7 flex justify-center items-center rounded-full bg-[rgb(106,96,96)]`}>
                <Image className='invert' src='/search.png' width={15} height={15} alt=''/>
              </button>
            </div>
            <label htmlFor="password">Password</label>
            <div className="pass1 relative">
              <input className='border-[rgba(222,179,179,0.82)] border rounded px-2 w-full bg-[rgba(169,126,126,0.8)]' type={visiable ? 'text' : 'password'} name="password" id="password" pattern="^(?=.*[A-Z])(?=.*[0-9]).{8,}$"
                title="Must be 8+ chars, include 1 uppercase & 1 number" required maxLength='12'/>
              <button type='button' className='absolute right-2 top-1' onClick={() => setVisiable(!visiable)}>
                {visiable ? <img src="/Eye/hide.png" alt="hide" width={20} height={20} /> : <img src="/Eye/show.png" alt="show" width={20} height={20} />}
              </button>
            </div>
            <label htmlFor="cp">Confirm Password</label>
            <div className="pass2 relative">
            <input className='border-[rgba(213,159,159,0.82)] border rounded px-2 w-full bg-[rgba(154,107,107,0.8)]' type={visiable2 ? 'text' : 'password'} name="cp" id="cp" pattern="^(?=.*[A-Z])(?=.*[0-9]).{8,}$"
              title="Must be 8+ chars, include 1 uppercase & 1 number" required maxLength='12'/>
              <button type='button' className='absolute right-2 top-1' onClick={() => setVisiable2(!visiable2)}>
                {visiable2 ? <img src="/Eye/hide.png" alt="hide" width={20} height={20} /> : <img src="/Eye/show.png" alt="show" width={20} height={20} />}
              </button>
              </div>
          </div>
          <button type='submit' className='border w-fit px-2 rounded-xl'>Change Password</button>
        </form>
        <Link href='/'>
        <button className='absolute top-4 left-4 border w-fit px-2 rounded-xl bg-amber-200 text-amber-900'>Login Page</button>
        </Link>
      </div>
      <ToastContainer/>
    </>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgetPassPage />
    </Suspense>
  );
}