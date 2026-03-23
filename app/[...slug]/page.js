import react from 'react'
import Link from 'next/link';
export default async function Page({ params }) {
    let data = (await params).slug
    let url = data.join('/')
    console.log(data, url);

    return (
        <>
            <div className="error h-dvh w-dvw bg-black text-amber-100">
                <h1>404</h1>
                <h2>Oops! Page not found {url}</h2>
                <p>The page you’re looking for doesn’t exist.</p>
                <Link href='/home'>Go Home</Link>
            </div>
        </>
    )

}