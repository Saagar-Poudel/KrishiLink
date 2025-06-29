import React from 'react'
import Header from './Component/Header'
import Footer from './Component/Footer'
import { Outlet } from 'react-router-dom'
function Roots() {
  return (
   <>
   <div className=''>
   <Header/>
   <Outlet/>
   <Footer/>
   </div>
   </>
  )
}

export default Roots