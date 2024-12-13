'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

const layout = ({children}) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      axios.get('/api/users/logout')
      router.push('/login')
    } catch (error) {
      console.log("Error while logging out", error)
    }
  }
  return (
    <div>
        <div className='h-14   bg-slate-600'>
          <button className='text-slate-100 p-2 bg-red-400 rounded-md mt-1' onClick={handleLogout}>logout</button>
        </div>
        <div>{children}</div>
    </div>
  )
}

export default layout