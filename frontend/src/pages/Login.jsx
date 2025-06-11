//Creating a login page for the application with tailwind CSS and React
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const { setAuth } = useAuth();
    // const navigate = useNavigate();
    
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //     const response = await login({ email, password });
    //     if (response.success) {
    //         setAuth(response.data);
    //         toast.success('Login successful!');
    //         navigate('/dashboard'); // Redirect to the dashboard or home page
    //     } else {
    //         toast.error(response.message || 'Login failed. Please try again.');
    //     }
    //     } catch (error) {
    //     toast.error('An error occurred. Please try again later.');
    //     }
    // };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input
                
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
            <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
            <input
                
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
            <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
            >
            Login
            </button>
        </form>
        </div>
    );
}
export default Login;