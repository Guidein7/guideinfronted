
import React, { useState, useEffect } from 'react';
import { ChevronDown, MapPin, Clock, GraduationCap, Search, Tag, ChevronRight, Star, ExternalLink, Phone, Globe, DollarSign, Building2, IndianRupee, ChevronLeft } from 'lucide-react';
import { IoCallOutline } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { CgDetailsMore } from "react-icons/cg";
import { Link } from 'react-router-dom';

import { resources } from '../../resources';
import { types } from '../../Admin/ExcelUploads/types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import maps from '../../../assets/maps.webp';



const EnquiryModal = ({ showModel, setShowModel, setId, id,successMessage,errorMessage }) => {


   

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobileNumber: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateName = (name) => {
    if (!name || name.trim() === '') {
      return 'Name is required';
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters long';
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      return 'Name should only contain letters and spaces';
    }
    return '';
  };

  const validateEmail = (email) => {
    if (!email || email.trim() === '') {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validateMobileNumber = (mobile) => {
    if (!mobile || mobile.trim() === '') {
      return 'Mobile number is required';
    }
    if (!/^\d+$/.test(mobile)) {
      return 'Mobile number should contain only digits';
    }
    if (mobile.length !== 10) {
      return 'Mobile number must be exactly 10 digits';
    }
    return '';
  };

  // Real-time validation on field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For mobile number, only allow digits and limit to 10 characters
    if (name === 'mobileNumber') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData({
        ...formData,
        [name]: numericValue
      });
      
      // Clear error when user starts typing valid input
      if (errors[name] && numericValue.length > 0) {
        setErrors({
          ...errors,
          [name]: ''
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
      
      // Clear error when user starts typing
      if (errors[name] && value.trim() !== '') {
        setErrors({
          ...errors,
          [name]: ''
        });
      }
    }
  };

  // Validate individual field on blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = '';

    switch (name) {
      case 'name':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'mobileNumber':
        error = validateMobileNumber(value);
        break;
      default:
        break;
    }

    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleSubmit = async () => {
    // Validate all fields
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const mobileError = validateMobileNumber(formData.mobileNumber);

    const newErrors = {
      name: nameError,
      email: emailError,
      mobileNumber: mobileError
    };

    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    
    if (hasErrors) {
    //   errorMessage("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log("------------------->", id);
      const sendingData = { ...formData, instituteId: id };
      
      const response = await axios.post(`${resources.APPLICATION_URL}student-data`, sendingData);
      
      successMessage("Your request submitted succefully. Institute will reach out to you shortly");
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        mobileNumber: ''
      });
      setErrors({
        name: '',
        email: '',
        mobileNumber: ''
      });
      
      setId(null);
      setShowModel(false);
      
    } catch (error) {
      console.error('Submission error:', error);
      errorMessage("Error Submitting Request");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Reset form and errors when closing
    setFormData({
      name: '',
      email: '',
      mobileNumber: ''
    });
    setErrors({
      name: '',
      email: '',
      mobileNumber: ''
    });
    setId(null);
    setShowModel(false);
  };

  if (!showModel) return null;

  return (

   
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-bg p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative animate-in fade-in duration-300 z-10">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
          disabled={isSubmitting}
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Callback</h2>
          <p className="text-gray-600">Get in touch with the institute</p>
        </div>

        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.name 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="Enter your name"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠</span>
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.email 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="Enter your email"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠</span>
                {errors.email}
              </p>
            )}
          </div>

          {/* Mobile Number Field */}
          <div>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.mobileNumber 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="Enter your mobile number (10 digits)"
              maxLength="10"
              disabled={isSubmitting}
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠</span>
                {errors.mobileNumber}
              </p>
            )}
            {formData.mobileNumber && !errors.mobileNumber && (
              <p className="text-green-600 text-sm mt-1 flex items-center">
                <span className="mr-1">✓</span>
                {formData.mobileNumber.length}/10 digits
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit'
              )}
            </button>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold transition-all duration-200 border border-gray-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default EnquiryModal