import React from 'react';
import Hero from './Hero';
import ReviewSection from './Review';
import WeatherAndPrices from '../WeatherAndPrices';
import NewsSection from '../NewsSection';
import Marketplace from './Marketplace';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <WeatherAndPrices/>
      <Marketplace/> 
      <NewsSection/>
      <ReviewSection/>
     
    </div>
  );
};

export default Home;