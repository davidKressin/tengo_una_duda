import React from 'react'
import { Navbar } from '../components/Navbar'

export const AppLayout = ({children}) => {
  return (
    <div className='bg-color1'>
        <Navbar/>
        {children}
    </div>
  )
}
