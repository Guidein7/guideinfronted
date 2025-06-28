import axios from "axios";
import { Star, Users, TrendingUp, Clock, MapPin, Building } from "lucide-react";
import {  useNavigate, useParams } from "react-router-dom";
import { resources } from "../../resources";
import { types } from "../../Admin/ExcelUploads/types";
import { useEffect, useState } from "react";


export default function CareerOverview() {


    const { id, name } = useParams();
    const [data, setData] = useState({});
    const [activeReviewTab, setActiveReviewTab] = useState('glassdoor'); // New state for tab management

    const getData = () => {
        axios.get(`${resources.APPLICATION_URL}unique-record?type=${types.CAREER}&id=${id}`).then(response => {
            console.log(response)
            setData(response.data);
        }).catch(error => {
            console.log(error)
        })
    }



    const navigate = useNavigate();
    console.log(data)


    useEffect(() => {
        getData();
    }, [id])

    // Format numbers for display
    const formatEmployeeCount = (count) => {
        const num = parseFloat(count);
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K+';
        return num.toString();
    };

    const formatReviewCount = (count) => {
        const num = parseFloat(count);
        return Math.floor(num / 1000) + 'K';
    };

    
    const renderStars = (rating) => {
        if(!rating) {
            return
        }
        const numRating = parseFloat(rating);
        const fullStars = Math.floor(numRating);
        const hasHalfStar = numRating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="flex items-center gap-1">
                {[...Array(fullStars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                {hasHalfStar && (
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />
                )}
                {[...Array(emptyStars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gray-300" />
                ))}
                <span className="ml-2 text-lg font-semibold text-gray-700">{rating}</span>
            </div>
        );
    };

    const ratingDistribution = [
        { stars: 5, percentage: 45 },
        { stars: 4, percentage: 30 },
        { stars: 3, percentage: 15 },
        { stars: 2, percentage: 7 },
        { stars: 1, percentage: 3 }
    ];

    // Get current review data based on active tab
    const getCurrentReviewData = () => {
        if (activeReviewTab === 'glassdoor') {
            return {
                rating: data.ratingGlassdoor,
                reviewCount: data.numberOfReviewsGS,
                platform: 'Glassdoor'
            };
        } else {
            return {
                rating: data.ratingAmbitionbox,
                reviewCount: data.numberOfReviewsAB,
                platform: 'AmbitionBox'
            };
        }
    };

    const currentReview = getCurrentReviewData();

    return (
        <div className="max-w-4xl mx-auto bg-gray-50 rounded-xl p-4 md:p-6 shadow-lg">
            <h1 onClick={() => navigate(-1)} className="cursor-pointer text-blue-600 hover:text-blue-800 mb-4 md:mb-6">← Back</h1>
          
            <div className="flex flex md:flex-row items-start gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-lg flex items-center justify-center border flex-shrink-0">
                    {/* <span className="text-gray-500 text-sm sm:text-lg font-medium">LOGO</span> */}
                    <Building/>
                </div>

                <div className="flex-1 min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 break-words">{data.companyName}</h1>
                    <p className="text-base sm:text-lg text-gray-600 mb-2 break-words">{data.industry}</p>
                    {/* <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>Bangalore, India</span>
                    </div> */}
                </div>
            </div>

            <hr className=" md:hidden border-gray-300 mb-6 md:mb-8" />

             <div className=" md:hidden mb-3">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">About</h2>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">{data.companyOverview}</p>
                    </div>

<hr className="border-gray-300 mb-6 md:mb-8" />
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

           
                <div className="space-y-4 md:space-y-6">
                    <div>
                        <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2 md:mb-3">Total Employees</h3>
                        <div className="flex items-center text-gray-700">
                            <Users className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                            <span className="text-lg md:text-xl font-semibold">{formatEmployeeCount(data.totalEmployees)}</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2 md:mb-3">Median Tenure</h3>
                        <div className="flex items-center text-gray-700">
                            <Clock className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                            <span className="text-lg md:text-xl font-semibold">{data.medianTenure}</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2 md:mb-3">Hiring Growth</h3>
                        <div className="flex items-center">
                            <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                {data.hiringGrowth*100}% &emsp; 
                                <span className="font-medium text-sm md:text-base">{data.hiringStatus}</span>
                            </div>
                        </div>
                    </div>

                    <a href={data?.careerPageUrl} target="_blank" className="block w-full bg-blue-600 border border-gray-300 text-white py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center ">
                        Visit Career Page
                    </a>
                </div>

                {/* Right Column - About & Reviews */}
                <div className="lg:col-span-2 space-y-6 md:space-y-8">
                    <div className="hidden md:block">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">About</h2>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">{data.companyOverview}</p>
                    </div>

                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Community Reviews</h2>

                        {/* Review Platform Toggle Buttons */}
                        <div className="flex  gap-2 mb-4 md:mb-6">
                            <button
                                onClick={() => setActiveReviewTab('glassdoor')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm md:text-base ${
                                    activeReviewTab === 'glassdoor'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                Glassdoor
                            </button>
                            <button
                                onClick={() => setActiveReviewTab('ambitionbox')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm md:text-base ${
                                    activeReviewTab === 'ambitionbox'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                AmbitionBox
                            </button>
                        </div>

                        <div className="mb-4 md:mb-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                                <div className="flex items-center">
                                    <span className="text-base md:text-lg font-medium text-gray-700 mr-4">Overall rating</span>
                                    {renderStars(currentReview.rating)}
                                </div>
                                <div className="text-xs md:text-sm text-gray-500">
                                    {formatReviewCount(currentReview.reviewCount)} reviews on {currentReview.platform}
                                </div>
                            </div>

                           
                            <div className="space-y-2">
                                {ratingDistribution.map((item) => (
                                    <div key={item.stars} className="flex items-center gap-2 md:gap-3">
                                        <span className="text-xs md:text-sm text-gray-600 w-6 md:w-8">{item.stars}★</span>
                                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-gray-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${item.percentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs md:text-sm text-gray-500 w-8 md:w-10 text-right">{item.percentage}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}