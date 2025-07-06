import { ChevronDown, Users, TrendingUp, Clock, Star, MapPin, Building, ChevronRight, ChevronLeft, Filter, X } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { resources } from '../../resources';
import { types } from '../../Admin/ExcelUploads/types';
import Company from '../../../assets/company.png'
import React, { useState, useEffect, useRef } from 'react';


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
        className={`w-full px-2 py-2 sm:px-4 sm:py-3 text-left bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between hover:bg-gray-50 transition-colors ${selected
            ? 'border-blue-300 bg-blue-50'
            : 'border-gray-300'
          }`}
      >
        <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
          {Icon && <Icon className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 ${selected ? 'text-blue-600' : 'text-gray-500'}`} />}
          <span className={`text-xs sm:text-sm font-medium truncate ${selected ? 'text-blue-700' : 'text-gray-700'}`}>
            {selected || label}
          </span>
        </div>
        <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''
          } ${selected ? 'text-blue-600' : 'text-gray-500'}`} />
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
              className={`w-full px-3 py-2 text-left hover:bg-gray-50 text-xs sm:text-sm transition-colors ${selected === option ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
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

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div className="flex  md:flex-row items-start gap-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
          {/* <Building className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" /> */}
          <img className='w-10 h-10' src={Company} />
        </div>
        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-3">
            <div className="min-w-0">
              <h3

                className="text-lg sm:text-xl font-semibold text-gray-900 mb-1   transition-colors"
              >
                {company.companyName}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{company.industry}</p>
            </div>
            <button className="hidden md:block px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-sm font-medium text-white bg-blue-600 flex-shrink-0 transition-colors">
              <a href={company.careerPageUrl} target='_blank' rel="noopener noreferrer">
                Visit Career Page
              </a>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 sm:gap-6 mb-3 text-sm text-gray-600">
            <div className='flex items-center gap-1' title="Total Employees">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{company.totalEmployees ? parseFloat(company.totalEmployees).toLocaleString() + '+' : 'N/A'}</span>
            </div>
            <div className="flex items-center gap-1 " title="Hiring Growth" >
              <TrendingUp className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{company.hiringGrowth ? + (parseFloat(company.hiringGrowth) * 100).toFixed(1) + '%' : 'N/A'}</span>
            </div>
            <div className="flex items-center gap-1" title="Median Tenure">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{company.medianTenure || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-1" title="Ratings">
              <Star className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{company.ratingAmbitionbox}/5 ({company.numberOfReviewsAB ? parseFloat(company.numberOfReviewsAB).toLocaleString() : '0'})</span>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-1">
            {company.companyOverview.length > 150
              ? `${company.companyOverview.substring(0, 150)}...`
              : company.companyOverview}
          </p>

          {company.companyOverview.length > 30 && (
            <Link
              to={`/career/${company.id}/${company?.companyName}`}
              className="text-blue-500 hover:underline text-sm"
            >
              See More
            </Link>
          )}
          <div className='flex justify-end'>
            <button className=" md:hidden px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-sm font-medium text-white bg-blue-600 flex-shrink-0 transition-colors">
              <a href={company.careerPageUrl} target='_blank' rel="noopener noreferrer">
                Visit Career Page
              </a>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
           
          </div>
        </div>

      </div>
    </div>
  );
};

const Career = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);

  const industry = searchParams.get("industry") || "";
  const hiringStatus = searchParams.get("hiringStatus") || "";
  const companyName = searchParams.get("companyName") || "";
  const page = parseInt(searchParams.get("page")) || 0;

  const [data, setData] = useState([]);
  const [dropdownData, setDropdownData] = useState({
    industry: [],
    hiringStatus: [],
    companyName: []
  });
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const getDropdown = () => {
    axios.get(`${resources.APPLICATION_URL}drop-down?type=${types.CAREER}`)
      .then(response => {
        setDropdownData({
          industry: response.data.industry || [],
          hiringStatus: response.data.hiringStatus || [],
          companyName: response.data.companyName || []
        });
      })
      .catch(error => {
        console.log('Dropdown error:', error);
      });
  };

  const getData = () => {
    setLoading(true);
    const params = new URLSearchParams({
      type: types.CAREER,
      page: page.toString(),
      size: "5"
    });

    if (industry && industry.trim() !== "") {
      params.append("industry", industry);
    }
    if (hiringStatus && hiringStatus.trim() !== "") {
      params.append("hiringStatus", hiringStatus);
    }
    if (companyName && companyName.trim() !== "") {
      params.append("companyName", companyName);
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
      industry,
      hiringStatus,
      companyName,
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

  // Update page
  const updatePage = (newPage) => {
    const currentParams = {
      ...(industry && { industry }),
      ...(hiringStatus && { hiringStatus }),
      ...(companyName && { companyName }),
      page: newPage.toString()
    };
    setSearchParams(currentParams);
  };

  // Handle filter changes (now single select)
  const handleIndustryChange = (selected) => {
    updateFilters({ industry: selected });
  };

  const handleHiringStatusChange = (selected) => {
    updateFilters({ hiringStatus: selected });
  };

  const clearAllFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters = industry || hiringStatus || companyName;

  useEffect(() => {
    getDropdown();
  }, []);

  useEffect(() => {
    getData();
  }, [industry, hiringStatus, companyName, page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className='fixed z-10 bg-white p-2  w-full'>
        <div className="">
          <div className="flex gap-1 items-center text-blue-500 mb-2">
                      <Link to="/" className="hover:underline">Home</Link>
                      <ChevronRight size={18} />
                      <Link to="/career" className="hover:underline">Careers</Link>
                    </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Company Careers</h1>
          <p className="text-gray-600 text-sm sm:text-base">Explore Company Career Pages & Current Hiring Trends</p>
        </div>

        <div className="md:hidden my-2 flex gap-3 items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3 py-2 rounded-md flex items-center justify-center gap-2 transition-colors ${hasActiveFilters
                ? 'bg-blue-100 text-blue-700 border border-blue-300'
                : 'bg-white text-black border border-gray-300'
              }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
           <div className="  md:hidden">
              <input
                type="text"
                placeholder="Search by company name"
                value={companyName}
                onChange={e => updateFilters({ companyName: e.target.value })}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              />
            </div>
        </div>

        <div className={`bg-white rounded-lg md:mt-2 p-4 md:p-0 md:w-[50%] mx-auto ${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FilterDropdown
              label="Select Industry"
              options={dropdownData.industry}
              selected={industry}
              onChange={handleIndustryChange}
              icon={Building}
            />
            <FilterDropdown
              label="Select Hiring Status"
              options={dropdownData.hiringStatus}
              selected={hiringStatus}
              onChange={handleHiringStatusChange}
              icon={TrendingUp}
            />
            <div className=" hidden md:block lg:col-span-2">
              <input
                type="text"
                placeholder="Search by company name"
                value={companyName}
                onChange={e => updateFilters({ companyName: e.target.value })}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              />
            </div>
            <div className='hidden md:block'>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-44 lg:pt-40 ">


        <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8  p-4 sm:p-6 lg:p-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500 text-base sm:text-lg">Loading companies...</p>
            </div>
          ) : data.length > 0 ? (
            data.map(company => (
              <CompanyCard key={company.id || company.companyName} company={company} />
            ))
          ) : (
            <div className="text-center py-12">
              <Building className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-base sm:text-lg mb-2">No companies found</p>
              <p className="text-gray-400 text-sm">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
            <div className="flex items-center gap-2 mb-2 ">
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
                        ? 'bg-blue-600 text-white'
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
    </div>
  );
};

export default Career;