'use client'

import axios from "axios";
import { useEffect, useState } from "react"

const ProfilePage = (params) => {
    const [user, setUser] = useState(null);

    const getData = async()=> {
      try {
        console.log(params.params.id)
        const response = await axios.post("/api/users/userDetails", 
          {
            userId: params.params.id
        },
      );
        console.log(response.data);
        setUser(response.data.email)
      } catch (error) {
        console.log(error)
      } finally{
        console.log(user)
      }
    }
  return (
    <div className="flex h-screen justify-center items-center flex-col">
        <p>Profile no:{params.params.id}</p>
        <div>{user? `${user}`:"no data"}</div>
        <button onClick={getData} className="p-2 rounded bg-yellow-700">get data</button>
    </div>
  )
}

export default ProfilePage