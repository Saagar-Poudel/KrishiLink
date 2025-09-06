import { useState } from "react";
import { ProfileHeader } from "./Profileheader";
import FarmerDashboard from "./Farmerprofile";
import { BuyerDashboard } from "./BuyerDashboard";
import { User, Users } from "lucide-react";
// import farmHero from "@/assets/farm-hero.jpg";

export default function Profile() {
  const [userType, setUserType] = useState('farmer');

  // Mock user data
  const userData = {
    farmer: {
      name: "Sagar Poudel",
      username: "sagar_farmer",
      email: "sagar@krishilink.com",
      phone: "+977 98765 43210",
      location: "Bharatpur, Chitwan",
      farmName: "Sunshine Organic Farms",
      rating: 4.8,
      reviewCount: 156
    },
    buyer: {
      name: "Prakash Sapkota",
      username: "prakash_buyer",
      email: "prakash@krishilink.com", 
      phone: "+977 87654 32109",
      location: "Gaidakot, Sustapurba",
      businessName: "Fresh Market Solutions"
    }
  };

  const currentUser = userData[userType];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(https://www.shutterstock.com/image-photo/lush-rice-paddy-field-neat-600nw-2499404003.jpg)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-800/80 to-green-600/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <h1 className="text-4xl font-bold">Krishi Link Profile</h1>
            <p className="text-xl opacity-90">Connecting farmers and buyers across India</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-16 relative z-10">
        {/* Role Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-2 shadow border flex gap-2">
            <button
              onClick={() => setUserType('farmer')}
              className={`flex items-center gap-2 px-4 py-2 rounded ${
                userType === 'farmer' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <User className="w-4 h-4" /> Farmer View
            </button>
            <button
              onClick={() => setUserType('buyer')}
              className={`flex items-center gap-2 px-4 py-2 rounded ${
                userType === 'buyer' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Users className="w-4 h-4" /> Buyer View
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Profile Header */}
          <ProfileHeader
            userType={userType}
            name={currentUser.name}
            username={currentUser.username}
            email={currentUser.email}
            phone={currentUser.phone}
            location={currentUser.location}
            farmName={userType === 'farmer' ? currentUser.farmName : undefined}
            businessName={userType === 'buyer' ? currentUser.businessName : undefined}
            rating={userType === 'farmer' ? currentUser.rating : undefined}
            reviewCount={userType === 'farmer' ? currentUser.reviewCount : undefined}
          />

          {/* Role-based Dashboard */}
          {userType === 'farmer' ? <FarmerDashboard /> : <BuyerDashboard />}
        </div>
      </div>
    </div>
  );
}
