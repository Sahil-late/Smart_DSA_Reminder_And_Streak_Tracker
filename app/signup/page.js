'use client'
import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'


const Login = () => {
    const router = useRouter()
    const [visiable, setVisiable] = useState(null)
    const [visiable2, setVisiable2] = useState(null)
    const [form, setForm] = useState({ email: '', password: '', confirm_password: '' })

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
           if(!form.email || !form.password || !form.confirm_password){
            return alert('Please fill all the fields')
           }
           if(form.password !== form.confirm_password) return alert('Password not match')
            let res = await axios.post('/api/signIn', form)
            alert(res.data?.msg)
            if(res.data?.msg == 'Sign-In Successfuly'){
                alert('redirecting in 3s')
                setTimeout(()=>{
                    return router.push('/animation')
                },2700)
            }
        }
        catch(e){
            console.log(e);
        }
    }


    return (
        <div className="login h-screen w-screen bg-gray-800 flex items-center justify-center">
            <div className="login-container bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-600">Sign Up</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                        <input onChange={handleChange} type="email" name='email' id="email" value={form.email} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:ring-offset-2 focus:border-blue-500 text-black placeholder-gray-500" placeholder="Enter your email" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="passField relative">
                            <input onChange={handleChange} type={visiable ? "text" : "password"} id="password" name='password' value={form.password} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-500" placeholder="Enter your password" pattern="^(?=.*[A-Z])(?=.*[0-9]).{8,}$"
                                title="Must be 8+ chars, include 1 uppercase & 1 number" required maxLength='12' />
                            <button onClick={() => setVisiable(!visiable)} type='button' className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                {visiable ? <img src="/Eye/hide.png" alt="hide" width={20} height={20} /> : <img src="/Eye/show.png" alt="show" width={20} height={20} />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <div className="passField relative">
                            <input onChange={handleChange} type={visiable2 ? "text" : "password"} id="confirm_password" name="confirm_password" value={form.confirm_password} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-500" placeholder="Enter your password" pattern="^(?=.*[A-Z])(?=.*[0-9]).{8,}$"
                                title="Must be 8+ chars, include 1 uppercase & 1 number" required maxLength='12' />
                            <button onClick={() => setVisiable2(!visiable2)} type='button' className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                {visiable2 ? <img src="/Eye/hide.png" alt="hide" width={20} height={20} /> : <img src="/Eye/show.png" alt="show" width={20} height={20} />}
                            </button>
                        </div>
                    </div>
                    <button type='submit' className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Sign Up</button>

                    <p className='text-red-500 text-center'>You have an account ? <Link href="/" className='underline text-amber-400 decoration-2 decoration-amber-800'>Log-In</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login