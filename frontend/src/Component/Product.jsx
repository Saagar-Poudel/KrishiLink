import React, { useState, useEffect } from 'react';

const cities = ['Hetuda', 'Bharatpur', 'Kathmandu', 'Pokhara', 'Biratnagar', 'Lalitpur', 'Birgunj'];

const initialMarketData = {
 Hetuda: [
  { crop: 'Pumpkin ', min: 45.0, max: 50.0, avg: 47.5 },
  { crop: 'Tomato (Indian)', min: 55.0, max: 60.0, avg: 57.5 },
  { crop: 'Sponge Gourd', min: 20.0, max: 30.0, avg: 25.0 },
  { crop: 'Lemon', min: 165.0, max: 170.0, avg: 167.5 },
  { crop: 'Yam', min: 15.0, max: 20.0, avg: 17.5 },
  { crop: 'Potato', min: 30.0, max: 40.0, avg: 35.0 },
  { crop: 'Onion', min: 50.0, max: 60.0, avg: 55.0 },
],
Bharatpur: [
  { crop: 'Potato', min: 30.0, max: 40.0, avg: 35.0 },
  { crop: 'Onion', min: 50.0, max: 60.0, avg: 55.0 },
  { crop: 'Carrot', min: 40.0, max: 50.0, avg: 45.0 },
  { crop: 'Cauliflower', min: 60.0, max: 70.0, avg: 65.0 },
  { crop: 'Cabbage', min: 25.0, max: 35.0, avg: 30.0 },
  { crop: 'Tomato', min: 45.0, max: 55.0, avg: 50.0 },
  { crop: 'Brinjal', min: 50.0, max: 60.0, avg: 55.0 },
],
Kathmandu: [
  { crop: 'Cucumber', min: 35.0, max: 45.0, avg: 40.0 },
  { crop: 'Brinjal', min: 50.0, max: 60.0, avg: 55.0 },
  { crop: 'Peas', min: 80.0, max: 90.0, avg: 85.0 },
  { crop: 'Radish', min: 20.0, max: 30.0, avg: 25.0 },
  { crop: 'Beans', min: 70.0, max: 80.0, avg: 75.0 },
  { crop: 'Garlic', min: 120.0, max: 130.0, avg: 125.0 },
  { crop: 'Ginger', min: 90.0, max: 100.0, avg: 95.0 },
],
Pokhara: [
  { crop: 'Garlic', min: 120.0, max: 130.0, avg: 125.0 },
  { crop: 'Ginger', min: 90.0, max: 100.0, avg: 95.0 },
  { crop: 'Coriander', min: 150.0, max: 160.0, avg: 155.0 },
  { crop: 'Spinach', min: 40.0, max: 50.0, avg: 45.0 },
  { crop: 'Mushroom', min: 200.0, max: 220.0, avg: 210.0 },
  { crop: 'Lemon', min: 165.0, max: 170.0, avg: 167.5 },
  { crop: 'Pumpkin', min: 45.0, max: 50.0, avg: 47.5 },
],
Biratnagar: [
  { crop: 'Rice', min: 40.0, max: 50.0, avg: 45.0 },
  { crop: 'Maize', min: 30.0, max: 40.0, avg: 35.0 },
  { crop: 'Wheat', min: 35.0, max: 45.0, avg: 40.0 },
  { crop: 'Lentil', min: 60.0, max: 70.0, avg: 65.0 },
  { crop: 'Pigeon Pea', min: 80.0, max: 90.0, avg: 85.0 },
  { crop: 'Sesame', min: 100.0, max: 110.0, avg: 105.0 },
  { crop: 'Sunflower', min: 90.0, max: 100.0, avg: 95.0 },
],
Lalitpur: [
  { crop: 'Cauliflower', min: 60.0, max: 70.0, avg: 65.0 },
  { crop: 'Cabbage', min: 25.0, max: 35.0, avg: 30.0 },
  { crop: 'Brinjal', min: 50.0, max: 60.0, avg: 55.0 },
  { crop: 'Tomato', min: 45.0, max: 55.0, avg: 50.0 },
  { crop: 'Tomato (Round)', min: 55.0, max: 60.0, avg: 57.5 },
  { crop: 'Onion', min: 50.0, max: 60.0, avg: 55.0 },
  { crop: 'Garlic', min: 120.0, max: 130.0, avg: 125.0 },
],
Birgunj: [
  { crop: 'Maize', min: 30.0, max: 40.0, avg: 35.0 },
  { crop: 'Wheat', min: 35.0, max: 45.0, avg: 40.0 },
  { crop: 'Lentil', min: 60.0, max: 70.0, avg: 65.0 },
  { crop: 'Pigeon Pea', min: 80.0, max: 90.0, avg: 85.0 },
  { crop: 'Sesame', min: 100.0, max: 110.0, avg: 105.0 },
  { crop: 'Sunflower', min: 90.0, max: 100.0, avg: 95.0 },
  { crop: 'Rice', min: 40.0, max: 50.0, avg: 45.0 },
]

};

const Price = () => {
  const [selectedCity, setSelectedCity] = useState('Hetuda');
  const [showAll, setShowAll] = useState(false);
  const [marketData, setMarketData] = useState(initialMarketData);

  // Fetch market data from API (to be implemented)
  useEffect(() => {
    // Replace with actual API call
    // Example: fetch(`/api/marketPrices?city=${selectedCity}`)
    //   .then(response => response.json())
    //   .then(data => setMarketData(prev => ({ ...prev, [selectedCity]: data })))
    //   .catch(error => console.error('Error fetching market data:', error));
  }, [selectedCity]);

  const visibleData = showAll ? marketData[selectedCity] : marketData[selectedCity].slice(0, 4);

  return (
    
    <div className=" min-h-[700px] bg-white  ">
    <div className=" mb-6 mx-10 bg-gray-100  p-4 shadow-md size-min ">
        <h1 className="text-green-800 text-xl m-4  ">Watch the market Price of yours crops </h1>
      <div className="mb-2 ">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-800">Daily Price </h2>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="border rounded-lg p-2 bg-green-800 text-white text-sm cursor-pointer hover:bg-green-600   "
          >
            {cities.map((city) => (
              <option key={city} value={city}> {city} </option>
            ))}
          </select>
        </div>
        <p className="text-sm text-gray-600 mb-2">Monday, Baishak 29, 2082</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-green-800 text-white">
                <th className="p-5">Crop</th>
                <th className="p-3">KG</th>
                <th className="p-3">Minimum</th>
                <th className="p-3">Maximum</th>
                <th className="p-3">Average</th>
              </tr>
            </thead>
            <tbody>
              {visibleData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-green-50' : 'bg-white'}>
                  <td className="p-3">{item.crop}</td>
                  <td className="p-3">1</td>
                  <td className="p-3">Rs {item.min.toFixed(1)}</td>
                  <td className="p-3">Rs {item.max.toFixed(1)}</td>
                  <td className="p-3">Rs {item.avg.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-blue-600 underline mt-2 text-sm hover:text-green-600 cursor-pointer"
        >
          {showAll ? 'See less market price' : 'See all market price'}
        </button>
      </div>
    </div>
    </div>
  );
};

export default Price;