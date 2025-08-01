import React from 'react'
import Header from './Component/Header'
import Home from './Component/Home/Home'
import WeatherAndPrices from './Component/WeatherAndPrices' 
import Marketplace from './Component/Marketplace'
import NewsSection from './Component/NewsSection'
import Footer from './Component/Footer'
import { Outlet } from 'react-router-dom'
import Market from './Component/Markets/Market'
function Roots() {
  return (
   <>
   <div className=''>
   <Header/>
   {/* <Market/> */}
   <Outlet/>
   {/* <Home/>
   <WeatherAndPrices/>
   <Marketplace/>
   <NewsSection/> */}
   <Footer/>
   </div>
   </>
  )
}

export default Roots