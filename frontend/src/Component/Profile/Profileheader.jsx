import React from "react";
import { Edit, MapPin, Phone, Mail, Star } from "lucide-react";
// import farmerAvatar from "@/assets/farmer-avatar.jpg";
// import buyerAvatar from "@/assets/buyer-avatar.jpg";

export function ProfileHeader({
  userType,
  name,
  username,
  email,
  phone,
  location,
  farmName,
  businessName,
  rating = 4.8,
  reviewCount = 156
}) {
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const defaultAvatar = userType === 'farmer' ? "https://www.shutterstock.com/image-photo/lush-rice-paddy-field-neat-600nw-2499404003.jpg" : "https://www.shutterstock.com/image-photo/lush-rice-paddy-field-neat-600nw-2499404003.jpg";

  return (
    <div className="p-8 bg-gradient-to-r from-green-100 to-green-50 rounded-xl shadow">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Avatar and basic info */}
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-green-300 flex items-center justify-center bg-gray-200">
            {defaultAvatar ? (
              <img src={defaultAvatar} alt={name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-semibold text-white">{getInitials(name)}</span>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  userType === 'farmer' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'
                }`}
              >
                {userType === 'farmer' ? '🌾 Farmer' : '🛒 Buyer'}
              </span>
            </div>

            <p className="text-gray-500 text-lg">@{username}</p>

            {(farmName || businessName) && (
              <p className="text-green-600 font-medium text-lg">{farmName || businessName}</p>
            )}

            {userType === 'farmer' && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">{rating} ({reviewCount} reviews)</span>
              </div>
            )}
          </div>
        </div>

        {/* Edit Profile button */}
        <div className="md:ml-auto">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            <Edit className="w-4 h-4" /> Edit Profile
          </button>
        </div>
      </div>

      {/* Contact info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-300">
        <div className="flex items-center gap-3 text-gray-600">
          <Mail className="w-5 h-5 text-green-500" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <Phone className="w-5 h-5 text-green-500" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <MapPin className="w-5 h-5 text-green-500" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}
