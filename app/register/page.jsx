'use client'

import { useRouter } from 'next/navigation';

export default function Register(){
    const { push } = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const value = Object.fromEntries(data.entries());
        // console.log(value);
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            })
            push('/');
            // const response = await res.json()
            // alert(response.message);
            
        } catch (e) {
            alert('Error');
            console.log(e);
        }

    }
    
    return(
        <div className='mt-48 text-center'>
            <h1 className='text-5xl font-bold'>Register</h1>
            <form className="mt-10 flex flex-col gap-5 justify-center align-middle" onSubmit={handleSubmit}>
                <input className="w-max bg-slate-200 border mx-auto rounded-md outline-slate-300 p-2" placeholder='xyz@example.com' type="email" name="email" id="email" />
                <input className="w-max bg-slate-200 border mx-auto rounded-md outline-slate-300 p-2" placeholder='xyz@123' type="password" name="password" id="password" />
                <button className="w-max mx-auto px-4 py-2 bg-blue-700 rounded-md text-white" type="submit">Register</button>
            </form>
        </div>
    )
}