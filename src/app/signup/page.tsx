'use client'
import Link from "next/link"
import { useState, useEffect } from "react"
import axios  from "axios";
import { useRouter } from "next/navigation";

export default function SignupPage(){
    const [user, setUser] = useState({
        username:"",
        email: "",
        password: ""
    })
    const router = useRouter();
    
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const signup = async (e) => {
        e.preventDefault();
        console.log("hello from signup")
       try {
        const response = await axios.post(
            "/api/users/signup",
            user
        );
        console.log("signup response",response);
        router.push('/login')
       } catch (error) {
        console.log(error)
       }
}
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
       setButtonDisabled(false)
     } else {
      setButtonDisabled(false)
    } 
  
  }, [user])

    return (
        <div  className="flex  h-screen justify-center items-center ">
            <form  className="w-64">
                <h1 className="text-2xl w-full text-center">Signup</h1>
                <div className="flex flex-col mt-2">
                    <label htmlFor="name">Username</label>
                    <input
                        className="rounded p-1 text-black focus:outline-none focus:outline-blue-500"
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({...user,username:e.target.value})}

                    />
                </div>
                <div className="flex flex-col mt-2">
                    <label htmlFor="name">Email</label>
                    <input
                        className="rounded p-1 text-black focus:outline-none focus:outline-blue-500"
                        type="text"
                        value={user.email}
                        onChange={(e) => setUser({...user,email:e.target.value})}

                    />
                </div>

                <div className="flex flex-col mt-2">
                    <label htmlFor="name">Password</label>
                    <input
                        className="rounded p-1 text-black focus:outline-none focus:outline-blue-500"
                        type="password"
                        onChange={(e) => setUser({...user,password:e.target.value})}

                    />
                </div>
                <button onClick={signup} className="w-full bg-slate-700 hover:bg-slate-800 mt-4 rounded py-1">Signup</button>
                <div className=" mt-2">Alredy have an account <Link className="text-blue-600" href='/login'>Login</Link></div>

            </form>
        </div>
    )
}
