import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resources } from "../../resources";
import { types } from "../../Admin/ExcelUploads/types";
import Company from '../../../assets/company.png'
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";






import { ArrowLeft, MapPin, Clock, Users, Phone, Globe, Star, Calendar, Monitor, Briefcase, DollarSign, GraduationCap, IndianRupee } from "lucide-react";
import EnquiryModal from "./EnquiryModel";



const successMessage = (message) => {
  toast.success(message, {
    position: 'top-center',
    autoClose: 3000
  })
}


const errorMessage = (message) => {
  toast.error(message, {
    position: 'top-center',
    autoClose: 1000
  })
}

export default function InstituteOverview() {
    // Sample data based on your API response
    const {id,name} = useParams();
    const [data, setData] = useState({});

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [showModal,setShowModal] = useState(false)


    



    console.log(id,name)

    const getData = () => {
        setLoading(true)
        axios.get(`${resources.APPLICATION_URL}unique-record?type=${types.COACHING}&id=${id}`).then(response => {
            console.log(response)
            setData(response.data)
        }).catch(error => {
            console.log(error)
        }).finally(() => setLoading(false))
    }

    useEffect(() => {
        getData()
    },[id])


    // Format phone number
    const formatPhoneNumber = (phone) => {
        if (!phone) return "Not Available";
        const numStr = phone.toString();
        if (numStr.includes('E')) {
            return parseFloat(phone).toString();
        }
        return numStr;
    };

    // Format price
    const formatPrice = (price) => {
        if (!price) return "Not Available";
        const numPrice = parseFloat(price);
        return `₹${numPrice.toLocaleString()}`;
    };

    // Parse tags
    const parseTags = (tags) => {
        if (!tags) return [];
        return tags.split('#').filter(tag => tag.trim()).map(tag => tag.trim());
    };

    // Generate star rating
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star size={6} key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<Star size={6} key="half" className="w-5 h-5 fill-yellow-400/50 text-yellow-400" />);
        }

        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<Star size={6} key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
        }

        return stars;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <>
        <ToastContainer/>
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div  onClick={() => navigate('/institute')} className="flex items-center space-x-4">
                            <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                <span className="font-medium">Coaching Centers</span>
                            </button>
                        </div>
                        {/* <div className="flex-1 max-w-md mx-8">
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Search" 
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <div className="absolute left-3 top-2.5">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Hero Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 sm:px-8 py-8 text-white">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold mb-2">{data.instituteName}</h1>
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="flex items-center space-x-1">
                                        {renderStars(data.rating)}
                                        <span className="ml-2 text-sm font-semibold">{data.rating}</span>
                                        <span className="text-blue-100">({data.numberOfReviews} reviews)</span>
                                    </div>
                                </div>
                                <div className="flex items-center text-blue-100">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    <span>{data.address}, {data.location}</span>
                                </div>
                            </div>
                            {/* <div className="mt-6 lg:mt-0">
                                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">
                                    Contact Now
                                </button>
                            </div> */}
                        </div>
                    </div>

                    {/* Course Information */}
                    <div className="p-6 sm:p-8">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Course Information</h2>
                            <div className="bg-blue-50 rounded-lg p-6 mb-6">
                                <div className="flex items-center mb-2">
                                    <GraduationCap className="w-6 h-6 text-blue-600 mr-3" />
                                    <h3 className="text-xl font-semibold text-blue-900">{data.courseName}</h3>
                                </div>
                                <p className="text-blue-700">Comprehensive training program designed for career growth</p>
                            </div>
                        </div>

                        {/* Key Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="flex items-center mb-3">
                                    <Clock className="w-6 h-6 text-green-600 mr-3" />
                                    <h4 className="font-semibold text-gray-900">Duration</h4>
                                </div>
                                <p className="text-lg text-gray-700">{data.courseDuration}</p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="flex items-center mb-3">
                                    <Calendar className="w-6 h-6 text-purple-600 mr-3" />
                                    <h4 className="font-semibold text-gray-900">Batch Schedule</h4>
                                </div>
                                <p className="text-lg text-gray-700">{data.courseBatch}</p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="flex items-center mb-3">
                                    <IndianRupee className="w-6 h-6 text-orange-600 " />
                                    <h4 className="font-semibold text-gray-900"> Estimated Course Fee</h4>
                                </div>
                                <p className="text-lg text-gray-700 font-semibold ml-3">{formatPrice(data.estimatedCoursePrice)}</p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="flex items-center mb-3">
                                    <Phone className="w-6 h-6 text-blue-600 mr-3" />
                                    <h4 className="font-semibold text-gray-900">Contact</h4>
                                </div>
                                <p className="text-lg text-gray-700">{formatPhoneNumber(data.mobileNumber)}</p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="flex items-center mb-3">
                                    <Monitor className="w-6 h-6 text-red-600 mr-3" />
                                    <h4 className="font-semibold text-gray-900">Computer Lab</h4>
                                </div>
                                <p className="text-lg text-gray-700">{data.computerLab === "1.0" ? "Available" : "Not Available"}</p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="flex items-center mb-3">
                                    <Briefcase className="w-6 h-6 text-indigo-600 mr-3" />
                                    <h4 className="font-semibold text-gray-900">Job Assistance</h4>
                                </div>
                                <p className="text-lg text-gray-700">{data.jobAssistance === "1.0" ? "Available" : "Not Available"}</p>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                            <div className="prose max-w-none">
                                <p className="text-gray-700 leading-relaxed ">{data.instituteDescription}</p>
                            </div>
                        </div>

                        {/* Tags */}
                        {data.tags && (
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Course Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {parseTags(data.tags).map((tag, index) => (
                                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                            <button onClick={() => setShowModal(true)} className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                Request Callback
                            </button>
                            {data.websiteUrl && (
                                <a 
                                    href={data.websiteUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center flex items-center justify-center"
                                >
                                    <Globe className="w-5 h-5 mr-2" />
                                    Visit Website
                                </a>
                            )}
                            {data.mapLocation && (
                                <a 
                                    href={data.mapLocation} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-green-100 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-200 transition-colors text-center flex items-center justify-center"
                                >
                                    <MapPin className="w-5 h-5 mr-2" />
                                    Get Directions
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <EnquiryModal showModel={showModal}  id={id} setShowModel={setShowModal} successMessage={successMessage} errorMessage={errorMessage}/>
            )}
        </div>

        </>
    );
}