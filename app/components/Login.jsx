export default function Login({ setShowLogin }) {
    async function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value
        }

        try {
            const res = await fetch('https://smartneev-assign.vercel.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            const data = await res.json()
            alert(data.message);
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
                    <input name="username" type="text" placeholder="Username" className="block my-2 p-4 outline-zinc-200 rounded-md shadow-xl" />
                    <input name="password" required type="password" placeholder="Password" className="block my-2 p-4 outline-zinc-200 rounded-md shadow-xl" />
                </div>
                <button className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-xl" type="submit">Login</button>
                <button className="bg-rose-700 float-right hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-xl " onClick={() => setShowLogin(false)}>Close</button>
            </form>
        </div>

    )
}
