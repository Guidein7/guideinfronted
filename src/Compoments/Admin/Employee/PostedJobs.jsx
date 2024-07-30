import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminNavBar from '../NavBar/AdminNavBar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import config from '../../../config';

// const jobTitles = [
//   "Account Executive", "Back-End Developer", "CAD Designer", "Data Analyst", "Economist",
//   "Facilities Manager", "Game Designer", "Hardware Engineer", "Illustrator", "Java Developer",
//   "Machine Learning Engineer", "Network Administrator", "Operations Analyst", "Portfolio Manager", 
//   "QA Engineer", "Real Estate Agent", "Sales Consultant", "Tax Advisor", "UI/UX Designer", 
//   "Warehouse Manager", "Account Manager", "Banking Analyst", "Call Center Manager", "Data Engineer", 
//   "Editor", "Family Nurse Practitioner", "General Manager", "Health and Safety Manager", 
//   "Industrial Designer", "Journalist", "Maintenance Manager", "Network Engineer", "Operations Manager", 
//   "PR Specialist", "QA Manager", "Recruiter", "Sales Director", "Teacher", "Underwriter", "Web Developer", 
//   "Accountant", "Benefits Coordinator", "Campaign Manager", "Data Scientist", "Electrical Engineer", 
//   "Fashion Designer", "Geneticist", "Healthcare Administrator", "Industrial Engineer", "Junior Accountant", 
//   "Management Consultant", "Neuroscientist", "Principal", "Quality Assurance Analyst", "Research Analyst", 
//   "Sales Manager", "Technical Writer", "User Experience Researcher", "Web Designer", "Administrative Assistant", 
//   "Bioinformatics Specialist", "Carpenter", "Database Administrator", "Electronics Engineer", 
//   "Financial Advisor", "Geologist", "Help Desk Technician", "Information Security Analyst", 
//   "Manufacturing Engineer", "Nurse Practitioner", "Product Manager", "Research Scientist", 
//   "Sales Representative", "Technology Consultant", "UI Developer", "Writer", "Advertising Manager", 
//   "Biomedical Engineer", "Case Manager", "Dentist", "Elementary School Teacher", "Financial Analyst", 
//   "Graphic Designer", "High School Teacher", "Information Systems Manager", "Marketing Coordinator", 
//   "Nursing Assistant", "Production Manager", "Retail Manager", "Scrum Master", "Therapist", 
//   "Aerospace Engineer", "Blockchain Developer", "Cashier", "Design Engineer", "Email Marketing Manager", 
//   "Financial Planner", "Guidance Counselor", "Hospitality Manager", "Instructional Designer", 
//   "Marketing Manager", "Nutritionist", "Product Owner", "Risk Manager", "SEO Specialist", "Training Manager", 
//   "Agile Coach", "Brand Manager", "CEO (Chief Executive Officer)", "Designer", "Embedded Systems Engineer", 
//   "Firefighter", "Hotel Manager", "Insurance Agent", "Marketing Specialist", "Professor", "Social Media Manager", 
//   "Translator", "Analyst", "Business Analyst", "CFO (Chief Financial Officer)", "Development Manager", 
//   "Emergency Medical Technician (EMT)", "Fleet Manager", "HR Manager", "Interior Designer", "Mechanical Engineer", 
//   "Project Coordinator", "Software Developer", "Travel Agent", "Android Developer", "Business Consultant", 
//   "Chemical Engineer", "DevOps Engineer", "Employee Relations Specialist", "Flight Attendant", 
//   "Human Resources Specialist", "Inventory Manager", "Media Planner", "Project Manager", "Software Engineer", 
//   "Treasury Analyst", "Animator", "Business Development Manager", "Chief Marketing Officer (CMO)", "Dietitian", 
//   "Environmental Engineer", "Food Scientist", "Hydrologist", "Investment Banker", "Medical Assistant", 
//   "Property Manager", "Solutions Architect", "Applications Developer", "Business Intelligence Analyst", 
//   "Chief Operating Officer (COO)", "Director of Operations", "Environmental Scientist", "Forensic Scientist", 
//   "IT Consultant", "Medical Laboratory Technician", "Psychiatrist", "Speech Therapist", "Architect", 
//   "Chief Technology Officer (CTO)", "Director of Sales", "Epidemiologist", "Front-End Developer", "IT Manager", 
//   "Medical Technologist", "Psychologist", "Statistician", "Art Director", "Civil Engineer", "Distribution Manager", 
//   "Event Coordinator", "Full Stack Developer", "Mental Health Counselor", "Public Relations Manager", 
//   "Store Manager", "Artificial Intelligence Engineer", "Claims Adjuster", "Doctor", "Executive Assistant", 
//   "Fundraiser", "Microbiologist", "Purchasing Manager", "Strategic Planner", "Asset Manager", 
//   "Clinical Research Coordinator", "Mobile Developer", "Structural Engineer", "Assistant Manager", "Cloud Architect", 
//   "Mortgage Broker", "Supply Chain Manager", "Associate Professor", "Community Manager", "Music Producer", 
//   "Support Engineer", "Audit Manager", "Compliance Officer", "Surgeon", "Assistant Product Manager", 
//   "Computer Programmer", "Surveyor", "Construction Manager", "System Administrator", "Content Manager", 
//   "Systems Analyst", "Content Writer", "Controller", "Copywriter", "Corporate Trainer", "Creative Director", 
//   "Credit Analyst", "Customer Service Manager", "Cyber Security Analyst"
// ];
const jobTitles = [
  "Account Executive", "Account Manager", "Accountant", "Administrative Assistant", 
  "Advertising Manager", "Aerospace Engineer", "Agile Coach", "Analyst", "Android Developer", 
  "Animator", "Applications Developer", "Architect", "Art Director", "Assistant Manager", 
  "Assistant Product Manager", "Associate Professor", "Asset Manager", "Audit Manager", 
  "Back-End Developer", "Banking Analyst", "Benefits Coordinator", "Bioinformatics Specialist", 
  "Biomedical Engineer", "Blockchain Developer", "Brand Manager", "Business Analyst", 
  "Business Consultant", "Business Development Manager", "Business Intelligence Analyst", 
  "CAD Designer", "CEO (Chief Executive Officer)", "CFO (Chief Financial Officer)", 
  "Call Center Manager", "Campaign Manager", "Carpenter", "Case Manager", "Cashier", 
  "Chemical Engineer", "Chief Marketing Officer (CMO)", "Chief Operating Officer (COO)", 
  "Chief Technology Officer (CTO)", "Claims Adjuster", "Clinical Research Coordinator", 
  "Cloud Architect", "Compliance Officer", "Computer Programmer", "Construction Manager", 
  "Content Manager", "Content Writer", "Controller", "Copywriter", "Corporate Trainer", 
  "Creative Director", "Credit Analyst", "Customer Service Manager", "Cyber Security Analyst", 
  "Cytotechnologist", "Database Administrator", "Data Analyst", "Data Engineer", "Data Scientist", 
  "Design Engineer", "Designer", "Development Manager", "DevOps Engineer", "Dietitian", 
  "Director of Operations", "Director of Sales", "Distribution Manager", "Doctor", 
  "Electrical Engineer", "Elementary School Teacher", "Embedded Systems Engineer", 
  "Emergency Medical Technician (EMT)", "Employee Relations Specialist", "Email Marketing Manager", 
  "Engineer", "Environmental Engineer", "Environmental Scientist", "Epidemiologist", 
  "Event Coordinator", "Executive Assistant", "Facilities Manager", "Family Nurse Practitioner", 
  "Fashion Designer", "Finance Manager", "Financial Advisor", "Financial Analyst", 
  "Financial Planner", "Firefighter", "Fleet Manager", "Food Scientist", "Forensic Scientist", 
  "Front-End Developer", "Full Stack Developer", "Fundraiser", "Game Designer", 
  "Genetic Counselor", "Geneticist", "Geologist", "Graphic Designer", "Guidance Counselor", 
  "Hardware Engineer", "Health and Safety Manager", "Healthcare Administrator", 
  "Help Desk Technician", "High School Teacher", "Hospitality Manager", "Hotel Manager", 
  "HR Manager", "Human Resources Specialist", "Hydrologist", "Illustrator", 
  "Industrial Designer", "Industrial Engineer", "Information Security Analyst", 
  "Information Systems Manager", "Information Technology Manager", "Information Technology Specialist", 
  "Insurance Agent", "Instructional Designer", "Interior Designer", "Investment Banker", 
  "IT Consultant", "IT Manager", "Java Developer", "Journalist", "Junior Accountant", 
  "Laboratory Technician", "Landscape Architect", "Lawyer", "Librarian", "Machine Learning Engineer", 
  "Maintenance Manager", "Management Consultant", "Manufacturing Engineer", "Marketing Coordinator", 
  "Marketing Manager", "Marketing Specialist", "Mathematician", "Mechanical Engineer", 
  "Media Planner", "Medical Assistant", "Medical Laboratory Technician", "Medical Technologist", 
  "Mental Health Counselor", "Microbiologist", "Mobile Developer", "Mortgage Broker", 
  "Music Producer", "Network Administrator", "Network Engineer", "Neuroscientist", 
  "Nurse Practitioner", "Nursing Assistant", "Nutritionist", "Occupational Therapist", 
  "Office Manager", "Operations Analyst", "Operations Manager", "Pediatrician", 
  "Pharmacist", "Pharmacy Technician", "Physical Therapist", "Physician", "Physicist", 
  "Portfolio Manager", "Principal", "Product Manager", "Product Owner", "Professor", 
  "Project Coordinator", "Project Manager", "Property Manager", "Psychiatrist", 
  "Psychologist", "Public Relations Manager", "Public Relations Specialist", 
  "Purchasing Manager", "QA Engineer", "QA Manager", "Quality Assurance Analyst", 
  "Recruiter", "Registered Nurse", "Research Analyst", "Research Scientist", "Retail Manager", 
  "Risk Manager", "Sales Consultant", "Sales Director", "Sales Manager", "Sales Representative", 
  "Scrum Master", "Security Analyst", "SEO Specialist", "Social Media Manager", 
  "Software Developer", "Software Engineer", "Solutions Architect", "Speech Therapist", 
  "Statistician", "Store Manager", "Strategic Planner", "Structural Engineer", 
  "Supply Chain Manager", "Surgeon", "Surveyor", "System Administrator", "Systems Analyst", 
  "Tax Advisor", "Teacher", "Technical Writer", "Technology Consultant", "Therapist", 
  "Training Manager", "Translator", "Treasury Analyst", "UI Developer", "UI/UX Designer", 
  "Underwriter", "User Experience Researcher", "Veterinarian", "Video Game Designer", 
  "Warehouse Manager", "Web Designer", "Web Developer", "Writer"
];

function PostedJobs() {
  const log = useSelector(state => state.adminlog);
  const token = log.data.token;
  const [showSideNav, setShowSideNav] = useState(false);
  const sideNavRef = useRef(null);
  const buttonRef = useRef(null);
  const [postedJobs, setPostedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (
      sideNavRef.current &&
      !sideNavRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setShowSideNav(false);
    }
  };

  useEffect(() => {
    if (showSideNav) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSideNav]);

  const getPostedJobs = () => {
    setLoading(true);
    axios.get(`${config.api.baseURL}${config.api.admin.postedJobs}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420"
      },
    }).then(response => {
      setPostedJobs(response.data);
    }).catch(error => {
      console.log(error);
    }).finally(() => setLoading(false));
  }

  useEffect(() => {
    getPostedJobs();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleJobTitleChange = (event) => {
    setSelectedJobTitle(event.target.value);
    setCurrentPage(1);
  };

  const filteredJobs = postedJobs.filter(job =>
    job.jobPostedBy.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedJobTitle === '' || job.jobTitle === selectedJobTitle)
  );

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClick = (job) => {
    navigate('/posted-jobdetails', { state: { job } });
  };

  return (
    <div className='bg-[#f5faff] min-h-screen flex flex-col'>
      <AdminNavBar />
      <div className='flex-grow mb-3'>
        {loading ? (
          <div className="flex flex-col justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-900">Loading...</p>
          </div>
        ) : (
          <div>
            <h1 className='font-bold my-2 mx-5'>Jobs Posted</h1>
            <div className='mx-5 my-2 text-end'>
              <input
                type="text"
                placeholder="Search by Job Posted By"
                value={searchTerm}
                onChange={handleSearch}
                className="px-4 py-2 border border-gray-300 rounded-md"
              />
              <select
                value={selectedJobTitle}
                onChange={handleJobTitleChange}
                className="ml-4 px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value=''>All Job Titles</option>
                {jobTitles.map((title, index) => (
                  <option key={index} value={title}>{title}</option>
                ))}
              </select>
            </div>
            <p className='mx-7 my-1'>{filteredJobs.length} results</p>
            <div className="overflow-x-auto px-4 sm:px-6 lg:px-8">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="w-1/12 py-3 px-6 uppercase font-semibold text-sm text-left">S.No</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Name</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Job Posted By</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Job Role</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {currentJobs.map((item, index) => (
                    <tr key={index}>
                      <td className="w-1/12 py-3 px-6 border-b border-gray-200">{indexOfFirstJob + index + 1}</td>
                      <td className="w-2/12 py-3 px-6 border-b border-gray-200">{item.jobPosterName}</td>
                      <td className="w-2/12 py-3 px-6 border-b border-gray-200">{item.jobPostedBy}</td>
                      <td onClick={() => handleClick(item)} className="w-2/12 py-3 px-6 border-b border-gray-200 text-blue-500 cursor-pointer">{item.jobTitle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              jobsPerPage={jobsPerPage}
              totalJobs={filteredJobs.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
      <div className="bg-[#00145e] w-full p-4">
        <footer className='sm:mx-auto max-w-screen-lg'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='text-white justify-self-start'>
              <h2>Company</h2>
              <p>About us</p>
            </div>
            <div className='text-white justify-self-end'>
              <h2>Help & Support</h2>
              <p>Contact Us</p>
            </div>
          </div>
          <div className='text-white text-center mt-4'>
            <p>Copyright &copy; {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

const Pagination = ({ jobsPerPage, totalJobs, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='flex justify-center mt-4'>
      <ul className='flex space-x-2'>
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default PostedJobs;
