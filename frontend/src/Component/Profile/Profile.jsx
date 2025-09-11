import React from "react";
import { useAuth } from "../../contexts/Authcontext";
import FarmerProfile from "./Farmerprofile";
import BuyerProfile from "./BuyerDashboard";

const RoleBasedProfile = () => {
const { user } = useAuth();

console.log("Current user from context:", user);
if (!user) return null;

switch (user.role) {
    case "farmer":
        return <FarmerProfile />;
        case "buyer":
            return <BuyerProfile />;
            default:
                return (
                    <div>Unknown role</div>
                );
}
};

export default RoleBasedProfile;