import axios from "axios";
import { Star, Users, TrendingUp, Clock, MapPin, Building, ExternalLink } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { resources } from "../../resources";
import { types } from "../../Admin/ExcelUploads/types";
import { useEffect, useState } from "react";
import Company from '../../../assets/company.png'
import Footer from "../Footer";

export default function CareerOverview() {
    const { id, name } = useParams();
    const [data, setData] = useState({});
    const [activeReviewTab, setActiveReviewTab] = useState('glassdoor');

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

    const formatEmployeeCount = (count) => {
        const num = parseFloat(count);
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K+';
        return num.toString();
    };

    const formatReviewCount = (count) => {
        const num = parseFloat(count);
        if (num >= 1000) {
            return Math.floor(num / 1000) + 'K';
        }
        return Math.round(num).toString();
    };

    const renderStars = (rating) => {
        if (!rating) {
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
        <>
            {/* Add custom CSS for blinking animation */}
            <style jsx>{`
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0.7; }
                }
                .blink-animation {
                    animation: blink 1.5s infinite;
                }
            `}</style>

            <div className="max-w-4xl mx-auto bg-gray-50 rounded-xl p-4 md:p-6 shadow-lg mb-20">
                <h1 onClick={() => navigate(-1)} className="cursor-pointer text-blue-600 hover:text-blue-800 mb-4 md:mb-6">← Back</h1>

                <div className="flex flex md:flex-row items-start gap-4 md:gap-6 mb-6 md:mb-8">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <img className="w-16 h-16" src={Company} />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 break-words">{data.companyName}</h1>
                        <p className="text-base sm:text-lg text-gray-600 mb-2 break-words">{data.industry}</p>
                    </div>
                </div>

                <hr className="border-gray-300 mb-6 md:mb-8" />

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
                            <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2 md:mb-3">Hiring Growth (last 6 months)</h3>
                            <div className="flex items-center">
                                <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full">
                                    <TrendingUp className="w-4 h-4 mr-1" />
                                    {Math.round(data.hiringGrowth * 100)}% &emsp;
                                    <span className="font-medium text-sm md:text-base">{data.hiringStatus}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-6 md:space-y-8">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Community Reviews</h2>

                            {/* Review Platform Toggle Buttons */}
                            <div className="flex gap-2 mb-4 md:mb-6">
                                <button
                                    onClick={() => setActiveReviewTab('glassdoor')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm md:text-base ${activeReviewTab === 'glassdoor'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    Glassdoor
                                </button>
                                <button
                                    onClick={() => setActiveReviewTab('ambitionbox')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm md:text-base ${activeReviewTab === 'ambitionbox'
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
                            </div>
                        </div>
                        <div className="max-w-4xl mx-auto p-4 hidden md:block">
                            <a
                                href={data.careerPageUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-lg transition-all duration-300 font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                <ExternalLink className="w-5 h-5 mr-2" />
                                Visit Career Page
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-400 my-3" />

                <div className="">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Analyse <i>{data.companyName}</i> Before You Join</h2>
                    <div
                        className="text-gray-600 leading-relaxed text-sm md:text-base custom-html"
                        dangerouslySetInnerHTML={{ __html: data.companyOverview }}
                    />
                </div>
            </div>

            {/* Fixed Bottom Button - Always Visible with Blinking Animation */}
            {/* {data?.careerPageUrl && (
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
                    <div className="max-w-4xl mx-auto p-4">
                        <a 
                            href={data.careerPageUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="blink-animation flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-lg transition-all duration-300 font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <ExternalLink className="w-5 h-5 mr-2" />
                            Visit Career Page
                        </a>
                    </div>
                </div>
            )} */}

            {/* Fixed Bottom Button - Mobile: Always Visible, Desktop: Hidden on scroll to footer */}
            {/* {data?.careerPageUrl && (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg ">
        <div className="max-w-4xl mx-auto p-4">
            <a 
                href={data.careerPageUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className=" flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-lg transition-all duration-300 font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
                <ExternalLink className="w-5 h-5 mr-2" />
                Visit Career Page
            </a>
        </div>
    </div>
)} */}

            {/* Desktop Button - Regular button at bottom of content */}
            <div className="mb-12">
                    <Footer/>
            </div>
            {data?.careerPageUrl && (
                <div className=" md:hidden mt-8  mb-4 ">
                    <a
                        href={data.careerPageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" fixed bottom-0 flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-lg transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Visit Career Page
                    </a>
                </div>
            )}

           
        </>
    );
}