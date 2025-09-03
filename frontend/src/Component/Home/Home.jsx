import React from 'react';
import Landing from './Landing';
import ReviewSection from './Review';
import WeatherAndPrices from '../Weatherandprice/WeatherAndPrices';
import NewsSection from '../NewsSection';
import Marketplace from './Marketplace';

const Home = () => {
  return (
    <div className="min-h-screen">
      
      <Landing />
      <WeatherAndPrices />
      <Marketplace />
      <NewsSection />
      <ReviewSection />
    </div>
  );
};

export default Home;