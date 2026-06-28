import { cookies } from 'next/headers'

export async function POST() {
    const cookieStore = await cookies();
     cookieStore.delete({
        name: 'token',
        path: '/',
    });

     cookieStore.delete('AccessToken', {
        name: 'AccessToken',
        path: '/',
    });
    return Response.json({ msg: 'Logout Successfully' });
}