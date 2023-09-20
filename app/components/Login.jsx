import Link from "next/link";

export default function Login({ setShowLogin }) {
    async function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value
        }

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            const data = await res.json()
            alert(data.message);
            setShowLogin(false);
            console.log(data);
        } catch (e) {
            alert('Error');
            console.log(e);
        }
    }
    return (
        <div>
            <h1 className="text-center font-bold text-3xl mb-10 underline">Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <input name="email" type="email" placeholder="Email" className="block my-2 p-4 outline-zinc-200 rounded-md shadow-xl" />
                    <input name="password" required type="password" placeholder="Password" className="block my-2 p-4 outline-zinc-200 rounded-md shadow-xl" />
                </div>
                <div className="grid grid-flow-col gap-3">
                    <button className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-xl" type="submit">Login</button>
                    <button className="bg-rose-700 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-md shadow-xl " onClick={() => setShowLogin(false)}>Close</button>
                </div>
                <br />
                <Link href="/register">
                    <button className="bg-orange-700 w-[100%] hover:bg-orange-600 text-white font-bold py-2 px-10 rounded-md shadow-xl">Sign Up</button>
                </Link>
            </form>
        </div>

    )
}
