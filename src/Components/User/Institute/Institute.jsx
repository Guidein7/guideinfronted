
import React, { useState, useEffect } from 'react';
import { ChevronDown, MapPin, Clock, GraduationCap, Search, Tag, ChevronRight, Star, ExternalLink, Phone, Globe, DollarSign, Building2, IndianRupee } from 'lucide-react';
import { IoCallOutline } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { CgDetailsMore } from "react-icons/cg";

import { resources } from '../../resources';
import { types } from '../../Admin/ExcelUploads/types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const successMessage = (message) => {
  toast.success(message, {
    position: 'top-center',
    autoClose: 1000
  })
}


const errorMessage = (message) => {
  toast.error(message, {
    position: 'top-center',
    autoClose: 1000
  })
}


// Single Select Filter Dropdown Component
const SingleSelectDropdown = ({ label, options, selected, onChange, icon: Icon, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    onChange(value === selected ? '' : value); // Toggle selection
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 text-gray-500" />}
          <span className={`${selected ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
            {selected || placeholder || `Select ${label}`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {selected && (
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full font-medium">
              Selected
            </span>
          )}
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2">
            {options.map(option => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${selected === option
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'hover:bg-gray-50 text-gray-700'
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced Institute Card Component
const InstituteCard = ({ course, setShowModel,setId }) => {

  const navigate = useNavigate()
  // Map API response to expected format
  const mappedCourse = {
    courseName: course.courseName,
    instituteName: course.instituteName,
    location: course.location,
    address: course.address,
    mobile: course.mobileNumber ? `+91 ${course.mobileNumber}` : 'N/A',
    duration: course.courseDuration,
    mode: course.modeOfClass === '1.0' ? 'Online' :
      course.modeOfClass === '2.0' ? 'Offline' :
        course.modeOfClass === '3.0' ? 'Hybrid' : 'Unknown',
    batch: course.courseBatch,
    computerLab: course.computerLab === '1.0' ? 'Available' : 'Not Available',
    price: `₹${parseFloat(course.estimatedCoursePrice).toLocaleString('en-IN')}`,
    rating: course.rating,
    reviews: parseInt(course.numberOfReviews) || 0,
    website: course.websiteUrl,
    jobAssistance: course.jobAssistance === '1.0' ? 'Yes' : 'No',
    description: course.instituteDescription,
    mapLocation: course.mapLocation,
    tags: course.tags ? course.tags.split(' ').map(tag => tag.replace('#', '')) : []
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-200 transform hover:-translate-y-1">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Institute logo */}
        <div className="w-full lg:w-24 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
          <GraduationCap className="w-10 h-10 text-white" />
        </div>

        {/* Institute info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{mappedCourse.courseName}</h3>
              <p className="text-lg text-blue-600 font-semibold mb-3 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                {mappedCourse.instituteName}
              </p>
            </div>
            <a
              href={mappedCourse.mapLocation}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 sm:mt-0 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center gap-2 self-start"
            >
              <MapPin className="w-4 h-4" />
              View Map
            </a>
          </div>

          {/* Course details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="font-medium">{mappedCourse.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="font-medium">{mappedCourse.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-2 rounded-lg text-sm font-semibold ${mappedCourse.mode === 'Online' ? 'bg-green-100 text-green-800' :
                mappedCourse.mode === 'Offline' ? 'bg-orange-100 text-orange-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                {mappedCourse.mode}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-900">{mappedCourse.rating}</span>
              <span className="text-gray-500">({mappedCourse.reviews} reviews)</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">{mappedCourse.description}</p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href={`tel:${mappedCourse.mobile}`}
              className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <IoCallOutline className="w-5 h-5" />
              <span>{mappedCourse.mobile}</span>
            </a>

            <button
              onClick={() => { setId(course.id); setShowModel(true) }}
              className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <LuMessageCircleMore className="w-5 h-5" />
              <span>Send Enquiry</span>
            </button>

            <button
              onClick={() => navigate(`/institute/${course.id}/${mappedCourse.instituteName}`)}
              className="flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold transition-all duration-200 border border-gray-200 hover:border-gray-300"
            >
              <CgDetailsMore className="w-5 h-5" />
              <span>View Details</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Modal Component
const EnquiryModal = ({ showModel, setShowModel, setId, id }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: ''
  });


  const handleSubmit = () => {
    for (let key in formData) {
      if (!formData[key] || formData[key].trim() === '') {
        errorMessage("Please fill all the fields");
        return;
      }
    }
console.log("------------------->",id)
    const sendingData = { ...formData, instituteId: id }
    axios.post(`${resources.APPLICATION_URL}student-data`, sendingData).then(response => {
      successMessage("Request Submitted Successfully");
      setId(null)
      setShowModel(false);
    }).catch(error => {
      errorMessage("Error Submitting Requset")
    })
    console.log('Form submitted:', formData);

  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!showModel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative animate-in fade-in duration-300">
        <button
          onClick={() => setShowModel(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Enquiry</h2>
          <p className="text-gray-600">Get in touch with the institute</p>
        </div>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter your mobile number"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Submit Enquiry
            </button>
            <button
              onClick={() => {setId(null);setShowModel(false)}}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold transition-all duration-200 border border-gray-200 hover:border-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Institute Component
const Institute = () => {





  // State management
  const [searchCompany, setSearchCompany] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedMode, setSelectedMode] = useState('');
  const [showModel, setShowModel] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState(null)
  const [dropdownData, setDropdownData] = useState({
    location: [],
    price: [],
    courseDuration: [],
    modeOfClass: []
  });
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  // API Functions
  const getData = () => {
    setLoading(true);
    const params = new URLSearchParams({
      type: types.COACHING,
      page: currentPage.toString(),
      size: "5"
    });

    // Add filters to params if they exist
    if (selectedLocation && selectedLocation.trim() !== "") {
      params.append("location", selectedLocation);
    }

    if (selectedPrice && selectedPrice.trim() !== "") {
      // Extract numeric value from formatted price (₹313,000 -> 313000)
      const numericPrice = selectedPrice.replace(/[₹,]/g, '');
      params.append("price", numericPrice);
    }

    if (selectedDuration && selectedDuration.trim() !== "") {
      params.append("courseDuration", selectedDuration);
    }

    if (selectedMode && selectedMode.trim() !== "") {
      // Convert display name back to API value
      const apiValue = getModeApiValue(selectedMode);
      params.append("modeOfClass", apiValue);
    }

    // Add company search if exists
    // if (searchCompany && searchCompany.trim() !== "") {
    //   params.append("instituteName", searchCompany);
    // }

    axios.get(`${resources.APPLICATION_URL}view/data?${params}`)
      .then(response => {
        if (Array.isArray(response.data.content)) {
          setData(response.data.content);
          setTotalPages(response.data.totalPages || 1);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setData([]);
      })
      .finally(() => setLoading(false));
  };

  const getDropdownData = () => {
    axios.get(`${resources.APPLICATION_URL}drop-down?type=${types.COACHING}`)
      .then(response => {
        setDropdownData(response.data);
      })
      .catch(error => {
        console.error("Error fetching dropdown data:", error);
      });
  };

  useEffect(() => {
    getDropdownData();
  }, []);

  useEffect(() => {
    getData();
  }, [currentPage, selectedPrice, selectedLocation, selectedDuration, selectedMode])

  // Helper Functions
  const getModeDisplayName = (modeValue) => {
    switch (modeValue) {
      case '1.0': return 'Online';
      case '2.0': return 'Offline';
      case '3.0': return 'Hybrid';
      default: return modeValue;
    }
  };

  const getModeApiValue = (displayName) => {
    switch (displayName) {
      case 'Online': return '1.0';
      case 'Offline': return '2.0';
      case 'Hybrid': return '3.0';
      default: return displayName;
    }
  };

  const formatPrice = (price) => {
    return `₹${parseInt(price).toLocaleString('en-IN')}`;
  };

  const clearFilters = () => {
    setSelectedLocation('');
    setSelectedPrice('');
    setSelectedDuration('');
    setSelectedMode('');
    setSearchCompany('');
    setCurrentPage(0);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Prepare dropdown options
  const modeOptions = dropdownData.modeOfClass?.map(mode => getModeDisplayName(mode)) || [];
  const priceOptions = dropdownData.price?.map(price => formatPrice(price)) || [];
  const locationOptions = dropdownData.location || [];
  const durationOptions = dropdownData.courseDuration || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <ToastContainer />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex gap-2 items-center text-blue-600 mb-4">
            <a href="/" className="hover:text-blue-800 transition-colors duration-200">Home</a>
            <ChevronRight size={18} />
            <span className="text-gray-600">Institutes</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Find Your Perfect Course</h1>
          <p className="text-xl text-gray-600">Discover top programming institutes and courses tailored for you</p>
        </div>

        {/* Enhanced Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">Filter Your Search</h2>
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 underline"
            >
              Clear All Filters
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Company Search */}
            {/* <div className="xl:col-span-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by company name"
                  value={searchCompany}
                  onChange={e => setSearchCompany(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                />
              </div>
            </div> */}

            {/* Location Filter */}
            <SingleSelectDropdown
              label="Location"
              options={locationOptions}
              selected={selectedLocation}
              onChange={setSelectedLocation}
              icon={MapPin}
              placeholder="Any Location"
            />

            {/* Price Filter */}
            <SingleSelectDropdown
              label="Price"
              options={priceOptions}
              selected={selectedPrice}
              onChange={setSelectedPrice}
              icon={IndianRupee}
              placeholder="Any Price"
            />

            {/* Duration Filter */}
            <SingleSelectDropdown
              label="Duration"
              options={durationOptions}
              selected={selectedDuration}
              onChange={setSelectedDuration}
              icon={Clock}
              placeholder="Any Duration"
            />

            {/* Mode Filter */}
            <SingleSelectDropdown
              label="Mode"
              options={modeOptions}
              selected={selectedMode}
              onChange={setSelectedMode}
              icon={GraduationCap}
              placeholder="Any Mode"
            />
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-lg text-gray-600">
            Showing <span className="font-semibold text-gray-900">{data.length}</span> courses
            {totalPages > 1 && (
              <span> (Page {currentPage + 1} of {totalPages})</span>
            )}
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-6 text-lg">Loading courses...</p>
          </div>
        )}

        {/* Institute Cards */}
        {!loading && (
          <div className="space-y-6 mb-8">
            {data.length > 0 ? (
              data.map((course, index) => (
                <InstituteCard key={course.id || index} course={course} setShowModel={setShowModel} setId={setId} />
              ))
            ) : (
              <div className="text-center py-20">
                <GraduationCap className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-500 text-lg">Try adjusting your filters to find more courses.</p>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !loading && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${currentPage === i
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Next
            </button>
          </div>
        )}

        {/* Enhanced Modal */}
        <EnquiryModal showModel={showModel} setId={setId} id={id} setShowModel={setShowModel} />
      </div>
    </div>
  );
};

export default Institute;