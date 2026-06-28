'use client'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ToastContainer, Bounce } from 'react-toastify';
import showAlert from './utils/showalert'
import { useSession, signIn, signOut } from "next-auth/react"



const Login = () => {
    const { data: session, status } = useSession()
    let router = useRouter()
    const [visiable, setVisiable] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let email = e.target.email.value
            let password = e.target.password.value
            let notify = await axios.post('/api/login', { email, password })
            if (notify.data?.msg === 'Please sign In First') {
                showAlert({ msg: notify.data.msg })
                setTimeout(() => {
                    return router.push('/signup')
                }, 2700)
            }
            else if (notify.data?.msg === 'Login Successfuly') {
                showAlert({ msg: `${notify.data.msg} redircting in 3s` })
                localStorage.setItem('user',JSON.stringify(notify.data?.user))
                console.log(notify.data?.user);
                
                setTimeout(() => {
                    return router.push('/animation')
                }, 2700)
            }
            else if (notify.data?.msg === 'Incorrect Password') {
                showAlert({ msg: 'redirecting to forget password page in 3s' })
                setTimeout(() => {
                    return router.push(`/forgetPassword?email=${email}`)
                }, 2700)
            }
            else {
                showAlert({ msg: notify.data.msg })
            }
        }
        catch (e) {
            console.log(e);
        }

    }


    useEffect(() => {
        if (status === "loading") return;
        const handleLogin = async () => {
            try {
                if (status === "authenticated") {
                    const res = await axios.post('/api/authLog', {
                        email: session.user.email,
                        provider: session.user.provider
                    });

                    if (res?.data?.msg === 'Login Successfuly') {
                        showAlert({ msg: `${session.user.provider} login success, redirecting...` });
                        setTimeout(() => {
                            router.push('/animation');
                        }, 2700);
                    }
                    else {
                        showAlert({ msg: `${res} login fails ...` });
                    }
                    return;
                }

                const res = await axios.post("/api/me", {
                    autoLog: "Auto Login",
                });

                if (res?.data?.msg === 'Login Successfuly') {
                    showAlert({ msg: `Auto login success, redirecting...` });
                    localStorage.setItem('user',JSON.stringify(res.data?.user))
                    setTimeout(() => {
                        router.push('/animation');
                    }, 2700);
                }

            } catch (err) {
                showAlert({ msg: err?.response?.data?.msg || "Not logged in" });
            }
        };

        handleLogin();
    }, [status]);

    return (
        <div className="login h-screen w-screen flex items-center justify-center bg-gray-800">
            <div className="login-container bg-gray-100 p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-600">Login</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                        <input type="email" id="email" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:ring-offset-2 focus:border-blue-500 text-black placeholder-gray-500" placeholder="Enter your email" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="passField relative">
                            <input type={visiable ? "text" : "password"} id="password" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-500" placeholder="Enter your password" pattern="^(?=.*[A-Z])(?=.*[0-9]).{8,}$"
                                title="Must be 8+ chars, include 1 uppercase & 1 number" required maxLength='12' />
                            <button onClick={() => setVisiable(!visiable)} type='button' className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                {visiable ? <Image src="/Eye/hide.png" alt="hide" width={20} height={20} /> : <Image src="/Eye/show.png" alt="show" width={20} height={20} />}
                            </button>
                        </div>
                    </div>
                    <Link href='forgetPassword' className='underline text-red-700 inline-block decoration-2 decoration-amber-300'>forgot password</Link>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Login</button>
                    <div className="buildInMetods text-center">
                        <div className="logos flex items-center justify-center gap-4 mt-4">
                            <button type='button' onClick={() => signIn('google')} className="bg-gray-200 p-1 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                                <Image height={38} width={38} src="https://img.icons8.com/color/48/google-logo.png" alt="google" ></Image>
                            </button>
                            <button type='button' onClick={() => signIn('github')} className="bg-gray-200 p-1 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                                <Image height={38} width={38} src="https://img.icons8.com/sf-regular-filled/48/github.png" alt="github"></Image>
                            </button>

                        </div>
                    </div>
                    <p className='text-red-500'>does not have an account ? <Link href="/signup" className='underline text-amber-400 decoration-2 decoration-amber-800'>Sign-Up</Link></p>
                </form>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </div>
    )
}

export default Login