import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Play, Eye, Clock, Youtube, Search, Filter, Tag, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { types } from '../../Admin/ExcelUploads/types';
import { resources } from '../../resources';
import youtube from '../../../assets/youtube.png'
import Footer from '../Footer';
import { InfeedAd } from '../InfeedAd';
import { InterviewAdsense } from './InterviewAdSense';

const FilterDropdown = ({ label, options, selected, onChange, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  const handleClearSelection = () => {
    onChange('');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-2 py-2 sm:px-4 sm:py-3 text-left bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 flex items-center justify-between hover:bg-gray-50 transition-colors ${selected ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
      >
        <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
          {Icon && <Icon className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 ${selected ? 'text-red-600' : 'text-gray-500'}`} />}
          <span className={`text-xs sm:text-sm font-medium truncate ${selected ? 'text-red-700' : 'text-gray-700'}`}>
            {selected || `Select ${label}`}
          </span>
        </div>
        <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''} ${selected ? 'text-red-600' : 'text-gray-500'
          }`} />
      </button>

      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 sm:max-h-60 overflow-y-auto">
          {selected && (
            <button
              onClick={handleClearSelection}
              className="w-full px-3 py-2 text-left hover:bg-gray-50 border-b border-gray-100 text-xs sm:text-sm text-gray-500 italic"
            >
              Clear selection
            </button>
          )}
          {options.map(option => (
            <button
              key={option}
              onClick={() => handleOptionSelect(option)}
              className={`w-full px-3 py-2 text-left hover:bg-gray-50 text-xs sm:text-sm transition-colors ${selected === option ? 'bg-red-50 text-red-700' : 'text-gray-700'
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <img className="h-10 w-10 md:w-16 md:h-16" src={youtube} />
        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
            <div className="min-w-0 flex-1">
              <h3
                className="text font-semibold text-gray-900 mb-1 line-clamp-2 cursor-pointer hover:text-red-600"
              >
                {video.videoTitle}
              </h3>
              <p className="text-sm text-red-600 font-medium mb-2">{video.topic}</p>
            </div>
            <a
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex px-3 py-2 sm:px-4 bg-[#FF0000] text-white rounded-lg text-sm font-medium hover:bg-red-700 flex-shrink-0 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Youtube className="w-4 h-4" />
              Watch Video
            </a>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-3 text-sm text-gray-600">
            <a href={video?.channelName} target="_blank" className="flex items-center gap-1 text-blue-500 underline">
              <Youtube className="w-4 h-4" />
              <span className="truncate">{video.channelName?.split('@')?.at(-1)}</span>
            </a>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{video.totalViews} views</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{video.duration}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 ">
            {video.shortDescription.length > 50
              ? `${video.shortDescription.substring(0, 70)}...`
              : video.shortDescription}
          </p>
          {video.shortDescription.length > 150 && (
            <Link
              to={`/interview-Q&A/${video.id}/${encodeURIComponent(video?.videoTitle)}`}
              className="text-blue-500 hover:underline text-sm mb-3 inline-block"
            >
              See More
            </Link>
          )}
          {video.tags && (
            <div className="flex gap-2 items-center">
              <div>
                <Tag className="w-3 h-3 text-gray-400 mt-1 flex-shrink-0" />
              </div>
              <div className="flex justify-center gap-2">
                {video.tags.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className="px-1 py-1 bg-green-200 text-gray-700 rounded-full text-xs"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 md:hidden px-3 py-2 sm:px-4 bg-[#FF0000] text-white rounded-lg text-sm font-medium hover:bg-red-700 flex-shrink-0 flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Youtube className="w-4 h-4" />
            Watch Video
          </a>
        </div>
      </div>
    </div>
  );
};

const Youtub = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);

  const topic = searchParams.get("topic") || "";
  const duration = searchParams.get("duration") || "";
  const searchQuery = searchParams.get("searchQuery") || "";
  const page = parseInt(searchParams.get("page")) || 0;

  const [data, setData] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState({
    topics: [],
    durations: []
  });
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const getDropdown = () => {
    axios.get(`${resources.APPLICATION_URL}drop-down?type=${types.YOUTUBE}`)
      .then(response => {
        const dropdownData = response.data;
        setDropdownOptions({
          topics: dropdownData.topic || [],
          durations: dropdownData.duration || []
        });
      })
      .catch(error => {
        console.log('Dropdown error:', error);
      });
  };

  const getData = () => {
    setLoading(true);
    const params = new URLSearchParams({
      type: types.YOUTUBE,
      page: page.toString(),
      size: "6"
    });

    if (topic && topic.trim() !== "") {
      params.append("topic", topic);
    }
    if (duration && duration.trim() !== "") {
      params.append("duration", duration);
    }
    if (searchQuery && searchQuery.trim() !== "") {
      params.append("vedioTitle", searchQuery);
    }

    axios.get(`${resources.APPLICATION_URL}view/data?${params}`)
      .then(response => {
        if (Array.isArray(response.data.content)) {
          setData(response.data.content);
          setTotalPages(response.data.totalPages || 1);
        }
      })
      .catch(error => {
        console.log('Data fetch error:', error);
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateFilters = (newFilters) => {
    const updatedParams = {
      topic,
      duration,
      searchQuery,
      page: "0",
      ...newFilters
    };

    Object.keys(updatedParams).forEach(key => {
      if (!updatedParams[key] || updatedParams[key] === "") {
        delete updatedParams[key];
      }
    });

    setSearchParams(updatedParams);
  };

  const updatePage = (newPage) => {
    const currentParams = {
      ...(topic && { topic }),
      ...(duration && { duration }),
      ...(searchQuery && { searchQuery }),
      page: newPage.toString()
    };
    setSearchParams(currentParams);
  };

  const handleTopicChange = (selected) => {
    updateFilters({ topic: selected });
  };

  const handleDurationChange = (selected) => {
    updateFilters({ duration: selected });
  };

  const clearAllFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters = topic || duration || searchQuery;

  useEffect(() => {
    getDropdown();
  }, []);

  useEffect(() => {
    getData();
  }, [topic, duration, searchQuery, page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed z-10 bg-white p-2 w-full">
        <div className="">
          <div className="flex gap-1 items-center text-blue-500 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight size={18} />
            <Link to="/interview-Q&A" className="hover:underline">Interview Q&A</Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Interview Q&A</h1>
          <p className="text-gray-600 text-sm sm:text-base">Learn Faster with Curated Interview Q&A Videos Across Tech & Business</p>
        </div>

        <div className="md:hidden my-2 flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3 py-2 rounded-md flex items-center justify-center gap-2 transition-colors ${hasActiveFilters
              ? 'bg-red-100 text-red-700 border border-red-300'
              : 'bg-white text-black border border-gray-300'
              }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          <div className="">
            <input
              type="text"
              placeholder="Search by video title"
              value={searchQuery}
              onChange={e => updateFilters({ searchQuery: e.target.value })}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
            />
          </div>
        </div>

        <div className={`bg-white rounded-lg md:mt-2 p-4 md:p-0 md:w-[50%] mx-auto ${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FilterDropdown
              label="Topic"
              options={dropdownOptions.topics}
              selected={topic}
              onChange={handleTopicChange}
              icon={Tag}
            />
            <FilterDropdown
              label="Duration"
              options={dropdownOptions.durations}
              selected={duration}
              onChange={handleDurationChange}
              icon={Clock}
            />
            <div className="hidden md:block">
              <input
                type="text"
                placeholder="Search by video title"
                value={searchQuery}
                onChange={e => updateFilters({ searchQuery: e.target.value })}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
              />
            </div>

            <div className="hidden md:block">
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-52  p-4  ">
        <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading videos...</p>
            </div>
          ) : data.length > 0 ? (
            data.map((video, index) => (
              <div key={index}>
                <VideoCard key={video.id} video={video} />
                {index === 0 && <InterviewAdsense key={`adsense-${page}`} />}

              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Youtube className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No videos found matching your filters.</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search criteria.</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={() => updatePage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="px-3 py-2 sm:px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft />
              </button>
              <div className="flex gap-1 sm:gap-2">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i;
                  } else if (page < 3) {
                    pageNum = i;
                  } else if (page > totalPages - 4) {
                    pageNum = totalPages - 5 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => updatePage(pageNum)}
                      className={`px-3 py-2 sm:px-4 rounded-lg text-sm font-medium ${page === pageNum
                        ? 'bg-red-600 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      {pageNum + 1}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => updatePage(Math.min(totalPages - 1, page + 1))}
                disabled={page === totalPages - 1}
                className="px-3 py-2 sm:px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Youtub;