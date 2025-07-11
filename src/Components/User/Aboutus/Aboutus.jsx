import React from 'react';
import { Target, Compass, CheckCircle, Users, Mail, Star, BookOpen, Building, Youtube, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate()
  const offerings = [
    {
      links:'/career',
      icon: <Building className="w-6 h-6" />,
      title: "Company Careers",
      description: "Access career pages of hundreds of companies to explore job opportunities, hiring trends, and application links."
    },
    {
            links:'/youtube',

      icon: <Youtube className="w-6 h-6" />,
      title: "YouTube Learning Hub",
      description: "Handpicked, high-quality YouTube videos for upskilling across AI, ML, coding, data, product management, business analysis, and more."
    },
    {
            links:'/institute',

      icon: <BookOpen className="w-6 h-6" />,
      title: "Coaching Center Directory",
      description: "Discover verified coaching centers across India. Read about them and request a call-back without leaving your seat."
    },
    {
            links:'/certificate',

      icon: <Award className="w-6 h-6" />,
      title: "Free Certification Courses",
      description: "Find curated, authentic certification programs offered for free by leading platforms and institutions."
    }
  ];

  const features = [
    "No logins or subscriptions required — full access, always",
    "Clean and user-friendly interface",
    "Curated, reliable data with regular updates",
    "Made for students, job seekers, and professionals alike"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <h1 className='text-center text-xl md:text-3xl font-semibold mb-2'>About Us</h1>
      <div className="relative overflow-hidden  bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
              GuideIn
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Your one-stop destination for everything you need on your career journey
            </p>
            <div className="text-lg md:text-xl max-w-5xl mx-auto leading-relaxed opacity-90">
              We understand how time-consuming and overwhelming it can be to search for the right resources, 
              whether it's job opportunities, learning materials, or coaching institutes. That's why we created 
              GuideIn — a platform designed to make your search easier, faster, and smarter.
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            To empower individuals by bringing together all essential career resources in one place — 
            so you can make informed decisions without spending hours searching.
          </p>
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="bg-gradient-to-r from-gray-50 to-indigo-50 py-20">
        <div  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mb-6">
              <Compass className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What We Offer</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {offerings.map((item, index) => (
              <div  onClick={() => navigate(item.links)} key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why GuideIn Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why GuideIn?</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-100">
              <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mt-1">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <p className="text-gray-800 font-medium">{feature}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Who We Are Section */}
      <div className=" bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16  bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Who We Are</h2>
            <div className="max-w-4xl mx-auto space-y-6 text-lg md:text-xl leading-relaxed">
              <p className="opacity-90">
                We are a passionate team of product developers, designers, and educators based in India. 
                Our collective goal is to make career resources more accessible and organized for everyone.
              </p>
              <p className="opacity-90">
                We believe in transparency, simplicity, and user-first thinking — and we're constantly 
                working to improve your experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Get in Touch</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Have feedback, questions, or partnership ideas?
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 max-w-md mx-auto border border-blue-100">
            <p className="text-lg text-gray-800 mb-4">Write to us at:</p>
            <a 
              href="mailto:support@guidein.org" 
              className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              support@guidein.org
            </a>
          </div>
          <p className="text-lg text-gray-600 mt-8 max-w-2xl mx-auto">
            Follow us for updates and tips — because your growth matters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;