import React, { useState, useEffect } from 'react';
import { ChevronDown, Users, TrendingUp, Clock, Star, MapPin, Building, ChevronRight } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { resources } from '../../resources';
import { types } from '../../Admin/ExcelUploads/types';


const FilterDropdown = ({ label, options, selected, onChange, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOptionSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  const handleClearSelection = () => {
    onChange('');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 sm:px-4 sm:py-3 text-left bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2 min-w-0">
          {Icon && <Icon className="w-4 h-4 text-gray-500 flex-shrink-0" />}
          <span className="text-gray-700 text-sm sm:text-base font-bold truncate">
            {selected || label}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform font-bold flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {selected && (
            <button
              onClick={handleClearSelection}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 border-b border-gray-100 text-sm text-gray-500 italic"
            >
              Clear selection
            </button>
          )}
          {options.map(option => (
            <button
              key={option}
              onClick={() => handleOptionSelect(option)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 text-sm transition-colors ${selected === option ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
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
          <Building className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
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
              <span className="truncate">{company.hiringGrowth ? '+' + (parseFloat(company.hiringGrowth) * 100).toFixed(1) + '%' : 'N/A'}</span>
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

          {/* Description */}
          <p className="text-sm text-gray-600 mb-1">
            {company.companyOverview.length > 150
              ? `${company.companyOverview.substring(0, 150)}...`
              : company.companyOverview}
          </p>

          {company.companyOverview.length > 150 && (
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

          {/* Location and hiring status */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{company.location || 'Multiple Locations'}</span>
            </div> */}
            {/* <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                company.hiringStatus === 'Hiring Now' || company.hiringStatus === 'Moderately Hiring'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {company.hiringStatus}
              </span>
            
              {company.tags && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs whitespace-nowrap">
                  {company.tags}
                </span>
              )}
            </div> */}
          </div>
        </div>
         
      </div>
    </div>
  );
};

const Career = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const industry = searchParams.get("industry") || "";
  const hiringStatus = searchParams.get("hiringStatus") || "";
  const companyName = searchParams.get("companyName") || "";
  const page = parseInt(searchParams.get("page")) || 0;

  // State for data and dropdown options
  const [data, setData] = useState([]);
  const [dropdownData, setDropdownData] = useState({
    industry: [],
    hiringStatus: [],
    companyName: []
  });
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch dropdown data
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

  // Fetch main data
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

  // Update filters and URL params
  const updateFilters = (newFilters) => {
    const updatedParams = {
      industry,
      hiringStatus,
      companyName,
      page: "0",
      ...newFilters
    };

    // Remove empty values
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

  // Effects
  useEffect(() => {
    getDropdown();
  }, []);

  useEffect(() => {
    getData();
  }, [industry, hiringStatus, companyName, page]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          {/* <div className='flex gap-1 items-center text-blue-500 text-sm sm:text-base mb-2'>
            <Link to='/' className='hover:underline'>Home</Link>
            <ChevronRight size={16} className="sm:w-5 sm:h-5" />
            <Link to='/career' className='hover:underline'>Career</Link>
          </div> */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Company Careers</h1>
          <p className="text-gray-600 text-sm sm:text-base">Discover your next career opportunity</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Companies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

            <div className="relative lg:col-span-1 xl:col-span-2">
              <input
                type="text"
                placeholder="Search by company name"
                value={companyName}
                onChange={e => updateFilters({ companyName: e.target.value })}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        {/* Results count */}
        {/* <div className="mb-4 sm:mb-6">
          <p className="text-gray-600 text-sm sm:text-base">
            {loading ? 'Loading...' : `Showing ${data.length} companies on page ${page + 1} of ${totalPages}`}
          </p>
        </div> */}

        {/* Company Cards */}
        <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
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
        {totalPages > 1 && !loading && (
          <div className="flex flex-wrap justify-center items-center gap-2">
            <button
              onClick={() => updatePage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="flex gap-1 max-w-full overflow-x-auto">
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let pageNum;
                if (totalPages <= 7) {
                  pageNum = i;
                } else if (page < 3) {
                  pageNum = i;
                } else if (page > totalPages - 4) {
                  pageNum = totalPages - 7 + i;
                } else {
                  pageNum = page - 3 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => updatePage(pageNum)}
                    className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition-colors ${page === pageNum
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
              className="px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Career;