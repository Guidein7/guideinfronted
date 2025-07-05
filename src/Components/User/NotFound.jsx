import React from 'react';
import { Home, ArrowLeft, Search, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

  const navigate =  useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 text-8xl md:text-9xl lg:text-[12rem] font-bold text-blue-100 -z-10 transform translate-x-2 translate-y-2">
            404
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
            Oops! Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have vanished into the digital void. 
            Don't worry though, we'll help you find your way back home.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-12">
          <div className="inline-block p-8 bg-white rounded-full shadow-lg">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button onClick={() => navigate('/')} className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
            <Home className="w-5 h-5 group-hover:animate-bounce" />
            Go Home
          </button>
          
          <button onClick={() => navigate(-1)} className="group bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-blue-300 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
            <ArrowLeft className="w-5 h-5 group-hover:animate-pulse" />
            Go Back
          </button>
        </div>

       

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Error Code: 404 | Page Not Found
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;