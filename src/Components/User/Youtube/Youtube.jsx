import React, { useState, useEffect } from 'react';
import { ChevronDown, Play, Eye, Clock, Youtube, Search, Filter, Tag, ChevronRight } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { types } from '../../Admin/ExcelUploads/types';
import { resources } from '../../resources';

const FilterDropdown = ({ label, options, selected, onChange, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 sm:px-4 sm:py-3 text-left bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 flex items-center justify-between hover:bg-gray-50 text-sm sm:text-base"
      >
        <div className="flex items-center gap-2 min-w-0">
          {Icon && <Icon className="w-4 h-4 text-gray-500 flex-shrink-0" />}
          <span className="text-gray-700 truncate">
            {selected || `Select ${label}`}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <button
            onClick={() => handleOptionSelect('')}
            className={`w-full px-4 py-2 text-left hover:bg-gray-50 cursor-pointer text-sm ${
              !selected ? 'bg-red-50 text-red-600' : 'text-gray-700'
            }`}
          >
            All {label}s
          </button>
          {options.map(option => (
            <button
              key={option}
              onClick={() => handleOptionSelect(option)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 cursor-pointer text-sm ${
                selected === option ? 'bg-red-50 text-red-600' : 'text-gray-700'
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
      <div className="flex  items-start gap-4">
        {/* Video thumbnail placeholder */}
        <div className="h-12 w-12 md:w-20 md:h-32  bg-[#FF0000] rounded-lg flex items-center justify-center flex-shrink-0">
          <Play className="w-8 h-8 text-white" />
        </div>

        {/* Video info */}
        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
            <div className="min-w-0 flex-1">
              <h3 
                onClick={() => navigate(`/youtube-overview`, { state: video })} 
                className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 cursor-pointer hover:text-red-600"
              >
                {video.videoTitle}
              </h3>
              <p className="text-sm text-red-600 font-medium mb-2">{video.topic}</p>
            </div>
            <a
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className=" hidden md:block px-3 py-2 sm:px-4 bg-[#FF0000] text-white rounded-lg text-sm font-medium hover:bg-red-700 flex-shrink-0 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Youtube className="w-4 h-4" />
              Watch Video
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-3 text-sm text-gray-600">
            <a href={video?.channelName} target='_blank' className="flex items-center gap-1 hover:text-red-600">
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

          <p className="text-sm text-gray-600 mb-3">
            {video.shortDescription.length > 150
              ? `${video.shortDescription.substring(0, 150)}...`
              : video.shortDescription}
          </p>

          {video.shortDescription.length > 150 && (
            <Link
              to={`/youtube/${video.id}/${video?.videoTitle}`}
              className="text-blue-500 hover:underline text-sm mb-3 inline-block"
            >
              See More
            </Link>
          )}

          {/* Tags */}
          {video.tags && (
            <div className="flex items-center">
              <div>
              <Tag className="w-3 h-3 text-gray-400 mt-1 flex-shrink-0" />
              </div>
              <div className="flex justify-center">
                {video.tags.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
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
              className=" mt-2 md:hidden px-3 py-2 sm:px-4 bg-[#FF0000] text-white rounded-lg text-sm font-medium hover:bg-red-700 flex-shrink-0 flex items-center gap-2 w-full sm:w-auto justify-center"
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

  // Get current filters from URL
  const topic = searchParams.get("topic") || "";
  const page = parseInt(searchParams.get("page")) || 0;
  const duration = searchParams.get("duration") || "";

  // State for data and dropdown options
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState({
    topics: [],
    durations: []
  });

  // Fetch dropdown options
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
        console.log(error);
      });
  };

  // Fetch video data
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

    axios.get(`${resources.APPLICATION_URL}view/data?${params}`)
      .then(response => {
        if (Array.isArray(response.data.content)) {
          setData(response.data.content);
          setTotalPages(response.data.totalPages || 1);
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Update filters in URL
  const updateFilter = (filterType, value) => {
    const updatedParams = new URLSearchParams(searchParams);

    if (value && value.trim() !== "") {
      updatedParams.set(filterType, value);
    } else {
      updatedParams.delete(filterType);
    }

    // Reset to first page when filters change
    updatedParams.set("page", "0");

    setSearchParams(updatedParams);
  };

  // Update page
  const updatePage = (newPage) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("page", newPage.toString());
    setSearchParams(updatedParams);
  };

  // Load dropdown options on mount
  useEffect(() => {
    getDropdown();
  }, []);

  // Fetch data when filters or page change
  useEffect(() => {
    getData();
  }, [topic, page, duration]);

  const currentPageDisplay = page + 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className='flex gap-1 items-center text-blue-500 mb-2'>
            <Link to='/' className='hover:underline'>Home</Link>
            <ChevronRight size={18} />
            <Link to='/career' className='hover:underline'>Youtube</Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">YouTube Videos</h1>
          <p className="text-gray-600">Discover programming tutorials and courses</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FilterDropdown
              label="Topic"
              options={dropdownOptions.topics}
              selected={topic}
              onChange={(value) => updateFilter('topic', value)}
              icon={Tag}
            />

            <FilterDropdown
              label="Duration"
              options={dropdownOptions.durations}
              selected={duration}
              onChange={(value) => updateFilter('duration', value)}
              icon={Clock}
            />
          </div>
        </div>

        {/* <div className="mb-4 sm:mb-6">
          <p className="text-gray-600 text-sm sm:text-base">
            {loading ? 'Loading...' : `Showing ${data.length} videos (Page ${currentPageDisplay} of ${totalPages})`}
          </p>
        </div> */}

        
        <div className="space-y-4 mb-6 sm:mb-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading videos...</p>
            </div>
          ) : data.length > 0 ? (
            data.map((video) => (
              <VideoCard key={video.id} video={video} />
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
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
              <button
                onClick={() => updatePage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="px-3 py-2 sm:px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {/* Show limited page numbers on mobile */}
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
                      className={`px-3 py-2 sm:px-4 rounded-lg text-sm font-medium ${
                        page === pageNum
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
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Youtub;