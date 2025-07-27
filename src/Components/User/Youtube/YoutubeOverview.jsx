import { Play, Clock, Eye, Users, Tag, ExternalLink, BookOpen, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { resources } from "../../resources";
import axios from "axios";
import { types } from "../../Admin/ExcelUploads/types";
import { useParams } from "react-router-dom";
import Footer from "../Footer";

export default function YoutubeOverView() {
    const {id,name} = useParams()
    const [courseData, setCourseData] = useState({
       
    });
    const [loading, setLoading] = useState(false);

    const getVideoId = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
        return match ? match[1] : null;
    };
 const getData = () => {
        setLoading(true);
        axios.get(`${resources.APPLICATION_URL}unique-record?type=${types.YOUTUBE}&id=${id}`)
            .then(response => {
                setCourseData(response.data);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => setLoading(false));
    };

   

    useEffect(() => {
        getData();
    }, []);

    const handleBack = () => {
        window.history.back();
    };

    const videoId = getVideoId(courseData.youtubeUrl);
    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

    const formatViews = (views) => {
        if (!views) return '';
        if (views.includes('M') || views.includes('K')) return views + ' views';
        return views + ' views';
    };

    const tagList = courseData?.tags ? courseData.tags.split(', ') : [];

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-4 text-center text-sm sm:text-base">Loading video details...</p>
                </div>
            </div>
        );
    }

    if (!courseData || Object.keys(courseData).length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Video Not Found</h2>
                    <p className="text-gray-600 mb-6 text-sm sm:text-base">The requested video could not be found.</p>
                    <button
                        onClick={handleBack}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium text-sm sm:text-base"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-7xl mx-auto p-4 sm:p-6">
                {/* Back Button */}
                <button 
                    onClick={handleBack}
                    className="mb-4 sm:mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm sm:text-base"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>

                {/* Header */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6 sm:mb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 sm:p-6 lg:p-8 text-white">
                        <div className="flex  sm:items-center gap-3 mb-4">
                            <div className="bg-white/20 flex justify-center items-center w-10 h-10 p-3 rounded-full w-fit">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div className="min-w-0 flex-1">
                                {courseData.videoTitle && (
                                    <h1 className="text-lg  lg:text-2xl font-bold break-words">
                                        {courseData.videoTitle}
                                    </h1>
                                )}
                                <p className="text-blue-100 text-sm sm:text-base lg:text-lg mt-1">
                                    by {courseData.channelName?.split('@')?.at(-1)}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-blue-100 text-sm sm:text-base">
                            {courseData.duration && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="font-medium">{courseData.duration}</span>
                                </div>
                            )}
                            {courseData.totalViews && (
                                <div className="flex items-center gap-2">
                                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="font-medium">{formatViews(courseData.totalViews)}</span>
                                </div>
                            )}
                           
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Left Column - Video & Description */}
                    <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                        {/* Video Player */}
                        {thumbnailUrl && courseData.youtubeUrl && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className="relative aspect-video bg-black">
                                    <img
                                        src={thumbnailUrl}
                                        alt={courseData.videoTitle || 'Video thumbnail'}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button
                                            onClick={() => window.open(courseData.youtubeUrl, '_blank')}
                                            className="bg-red-600 hover:bg-red-700 text-white p-4 sm:p-6 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300"
                                        >
                                            <Play className="w-8 h-8 sm:w-12 sm:h-12 ml-1 sm:ml-2" fill="currentColor" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Course Description */}
                        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 sm:mb-6">What You'll Learn from This Video</h2>
                            {courseData.shortDescription && (
                                <p className="text-gray-700  leading-relaxed mb-6 lg:mb-8">
                                    {courseData.shortDescription}
                                </p>
                            )}

                            {/* Tags */}
                            {tagList.length > 0 && (
                                <div className="mb-6 lg:mb-8">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Course Tags</h3>
                                    <div className="flex flex-wrap gap-2 sm:gap-3">
                                        {tagList.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-100 text-blue-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-medium flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                                            >
                                                <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                {courseData.youtubeUrl && (
                                    <button
                                        onClick={() => window.open(courseData.youtubeUrl, '_blank')}
                                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 sm:gap-3 shadow-lg transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                                    >
                                        <Play className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" />
                                        Watch on YouTube
                                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </button>
                                )}
                                {courseData.channelName && (
                                    <button
                                        onClick={() => window.open(courseData.channelName, '_blank')}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 text-sm sm:text-base"
                                    >
                                        <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                                        Visit Channel
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Course Info */}
                    <div className="space-y-4 sm:space-y-6">
                        {/* Course Stats */}
                        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                            <h3 className="  font-bold text-gray-900 mb-4 sm:mb-6">Video Details</h3>
                            <div className="space-y-3 sm:space-y-4">
                                {courseData.topic && (
                                    <div className="flex items-center justify-between text-sm sm:text-base">
                                        <span className="text-gray-600">Topic</span>
                                        <span className="font-semibold text-orange-600 bg-orange-100 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                                            {courseData.topic}
                                        </span>
                                    </div>
                                )}
                                {courseData.duration && (
                                    <div className="flex items-center justify-between text-sm sm:text-base">
                                        <span className="text-gray-600">Duration</span>
                                        <span className="font-semibold text-gray-900">{courseData.duration}</span>
                                    </div>
                                )}
                                {courseData.totalViews && (
                                    <div className="flex items-center justify-between text-sm sm:text-base">
                                        <span className="text-gray-600">Views</span>
                                        <span className="font-semibold text-gray-900">{formatViews(courseData.totalViews)}</span>
                                    </div>
                                )}
                               
                            </div>
                        </div>

                        {/* Quick Start */}
                        {courseData.youtubeUrl && (
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg p-4 sm:p-6 text-white">
                                <h3 className=" font-bold mb-3 sm:mb-4">Ready to Start?</h3>
                                <p className="mb-3 sm:mb-4 text-green-100 text-sm sm:text-base">
                                    Begin your {courseData.topic || 'learning'} journey with this comprehensive free course!
                                </p>
                                <div className=" w-full mx-auto flex justify-center">
                                <button
                                    onClick={() => window.open(courseData.youtubeUrl, '_blank')}
                                    className=" mx-auto bg-white text-green-600 py-2.5 sm:py-3 px-4 rounded-xl font-semibold hover:bg-green-50 transition-colors text-sm sm:text-base"
                                >
                                    Start Learning Now
                                </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}