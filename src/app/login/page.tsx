'use client'
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function LoginPage(){
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await axios.post(
            '/api/users/login',
            { email:user.email, password: user.password}
        );
        if (response.status === 200) {
            console.log(response, '\n', response)
            router.push(`/profile/${response.data._id}`)
        }
    }
    return (
        <form onSubmit={handleSubmit} className="flex  h-screen justify-center items-center ">
            <div className="w-64">
                <h1 className="text-2xl w-full text-center">Login</h1>
                
                
                <div className="flex flex-col mt-2">
                    <label htmlFor="name">Email</label>
                    <input
                        className="rounded p-1 text-black"
                        type="text"
                        value={user.email}
                        onChange={(e) => setUser({...user,email:e.target.value})}

                    />
                </div>
                <div className="flex flex-col mt-2">
                    <label htmlFor="name">Password</label>
                    <input
                        className="rounded p-1 text-black"
                        type="password"
                        onChange={(e) => setUser({...user,password:e.target.value})}

                    />
                </div>
                <button className="w-full bg-slate-700 hover:bg-slate-800 mt-4 rounded py-1">Login</button>
                <div className=" mt-2">Alredy have an account <Link className="text-blue-600" href='/signup'>Signup</Link></div>

            </div>
        </form>
    )
}
