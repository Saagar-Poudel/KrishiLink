import React, { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';

const AuthForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'buyer'  //default role
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password be one letter, number, and special character
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
    return usernameRegex.test(username);
  };
//validation
  const validateForm = () => {
    const newErrors = {};

    if (isLogin) {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      }
    } else {
      if (!formData.username) {
        newErrors.username = 'Username is required';
      } else if (!validateUsername(formData.username)) {
        newErrors.username = 'Username must be at least 3 characters and contain only letters and numbers';
      }

      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (!validatePassword(formData.password)) {
        newErrors.password = 'Password must be at least 6 characters with letters, numbers, and special characters';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      let submitData;

      if (isLogin) {
        submitData = {
          email: formData.email,
          password: formData.password
        };

        console.log('Login data:', submitData);

        const {data} = await axios.post('http://localhost:3000/api/users/login', submitData, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        });
      
        toast.success('Login successful!');
        setFormData({
          email: '',
          password: ''
        });
        login(data.user, data.token); // Update auth context with logged-in user
        navigate('/');
        console.log('Login response:', data);
      } else {
        submitData = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,  // send role
        };

        console.log('Registration data:', submitData);
        const {data} = await axios.post('http://localhost:3000/api/users/register', submitData, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        });
        toast.success('Registration successful!');
        setIsLogin(true);
        setFormData({
          username: '',
          email: '',
          password: '',
           role: formData.role // reset to default role
        });
        console.log('Registration response:', data);
      }

      
      // if (isLogin) {
      //   // Navigate to homepage
      //   navigate('/');
      // } else {  
      //   setIsLogin(true);
        
      //   // Keep email and password for convenience, clear username
      //   setFormData(prev => ({
      //     ...prev,
      //     username: ''
      //   }));
      // }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      email: '',
      password: '',
      role: 'farmer'  // reset to default role
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-600 via-green-400 to-yellow-200">
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden">
        <div className="relative">
          <div className="flex flex-col md:flex-row min-h-[600px]">
            {/* Welcome Section */}
            <div className={`absolute inset-y-0 w-1/2 bg-gradient-to-br from-green-600 to-green-800 text-white p-8 md:p-12 flex flex-col justify-center items-center text-center transition-all duration-700 ease-in-out z-10 ${
              isLogin ? 'left-0 transform translate-x-0' : 'left-1/2 transform translate-x-0'
            }`}>
              <div className="space-y-6">
                <div className="transition-all duration-500 ease-in-out">
                  <h2 className="text-3xl md:text-4xl font-bold transition-all duration-500">
                    {isLogin ? "Hello, Welcome!" : "Welcome Back!"}
                  </h2>
                </div>
                <div className="transition-all duration-500 ease-in-out delay-100">
                  <p className="text-green-100 text-lg">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                  </p>
                </div>
                <div className="transition-all duration-500 ease-in-out delay-200">
                  <button
                    onClick={toggleMode}
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    {isLogin ? "Register" : "Login"}
                  </button>
                </div>
              </div>
            </div>

            {/* Form Section */}
           
              <div className={`absolute inset-y-0 w-1/2 p-8 md:p-12 flex flex-col justify-center transition-all duration-700 ease-in-out ${
              isLogin ? 'right-0 transform translate-x-0' : 'left-0 transform translate-x-0'
            }`}>
              <div className="w-full max-w-sm mx-auto space-y-6">
                <div className="transition-all duration-500 ease-in-out">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
                    {isLogin ? "Login" : "Registration"}
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Username Field (only for registration) */}
                  <div className={`relative transition-all duration-500 ease-in-out ${!isLogin ? 'opacity-100 max-h-20 translate-y-0' : 'opacity-0 max-h-0 -translate-y-2 overflow-hidden'}`}>
                    <input
                      type="text"
                      placeholder="Username"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className={`w-full pl-12 h-12 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${errors.username ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-200" />
                    {errors.username && (
                      <p className="text-red-500 text-xs mt-1 ml-2">{errors.username}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="relative transition-all duration-300 ease-in-out">
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-12 h-12 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-200" />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 ml-2">{errors.email}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="relative transition-all duration-300 ease-in-out">
                    <input
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`w-full pl-12 h-12 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${errors.password ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-200" />
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1 ml-2">{errors.password}</p>
                    )}
                  </div>
                  
{/* Role Field (only for registration) */}
<div className={`relative transition-all duration-500 ease-in-out ${
  !isLogin ? 'opacity-100 max-h-20 translate-y-0' : 'opacity-0 max-h-0 -translate-y-2 overflow-hidden'
}`}>
  <select
    value={formData.role}
    onChange={(e) => handleInputChange('role', e.target.value)}
    className="w-full h-12 pl-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
  >
    <option value="farmer">Farmer</option>
    <option value="buyer">Buyer</option>
  </select>
</div>

                  {/* Forgot Password (only for login) */}
                  <div className={`text-right transition-all duration-500 ease-in-out ${isLogin ? 'opacity-100 max-h-10 translate-y-0' : 'opacity-0 max-h-0 -translate-y-2 overflow-hidden'}`}>
                    <button type="button" className="text-green-600 hover:text-green-800 text-sm font-medium transition-colors duration-200">
                      Forgot Password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <div className="transition-all duration-300 ease-in-out">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Processing...' : (isLogin ? "Login" : "Register")}
                    </button>
                  </div>

                  {/* Social Login Divider */}
                  <div className="relative my-6 transition-all duration-300 ease-in-out">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500 transition-all duration-300">
                        or {isLogin ? "login" : "register"} with social platforms
                      </span>
                    </div>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="flex justify-center space-x-4 transition-all duration-300 ease-in-out">
                    <button type="button" className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md">
                      <span className="text-red-500 font-bold text-lg">G</span>
                    </button>
                    <button type="button" className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md">
                      <span className="text-blue-600 font-bold text-lg">f</span>
                    </button>
                    <button type="button" className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md">
                      <span className="text-gray-800 font-bold text-lg">X</span>
                    </button>
                    <button type="button" className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md">
                      <span className="text-blue-700 font-bold text-lg">in</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;