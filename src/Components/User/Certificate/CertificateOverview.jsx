import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { resources } from "../../resources";
import { types } from "../../Admin/ExcelUploads/types";
import { useNavigate } from "react-router-dom";

export default function CertificateOverview() {
    const { id, name } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getData = () => {
        setLoading(true);
        axios.get(`${resources.APPLICATION_URL}unique-record?type=${types.CERTIFICATE}&id=${id}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate('/certificate')}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 shadow-sm"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Certificates
                    </button>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 sm:px-8">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-white/20 rounded-lg p-2">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-white/90 text-sm font-medium uppercase tracking-wider">
                                {data.courseCategory}
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                            {data.courseTitle}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-white/90">
                            <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <span className="text-sm">{data.provider}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm">{data.courseDuration}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="px-6 py-8 sm:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Course Details */}
                            <div className="lg:col-span-2 space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Course Description</h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        {data.shortDescription}
                                    </p>
                                </div>

                                {/* Course Link */}
                                {data.courseLink && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Access Course</h3>
                                        <a
                                            href={data.courseLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            Visit Course
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Course Info Card */}
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Information</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start">
                                            <span className="text-sm font-medium text-gray-500">Provider</span>
                                            <span className="text-sm text-gray-900 text-right">{data.provider}</span>
                                        </div>
                                        <div className="flex justify-between items-start">
                                            <span className="text-sm font-medium text-gray-500">Platform</span>
                                            <span className="text-sm text-gray-900 text-right">{data.platform}</span>
                                        </div>
                                        <div className="flex justify-between items-start">
                                            <span className="text-sm font-medium text-gray-500">Duration</span>
                                            <span className="text-sm text-gray-900 text-right">{data.courseDuration}</span>
                                        </div>
                                        <div className="flex justify-between items-start">
                                            <span className="text-sm font-medium text-gray-500">Category</span>
                                            <span className="text-sm text-gray-900 text-right">{data.courseCategory}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Certificate Badge */}
                                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-sm font-semibold text-green-800 mb-1">Certificate Available</h4>
                                    <p className="text-xs text-green-600">Complete the course to earn your certificate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}