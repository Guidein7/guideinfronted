import BlogCard from '../../Admin/Blog/BlogCard.jsx'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { resources } from '../../resources'
import { useEffect, useState } from 'react'
import { types } from '../../Admin/ExcelUploads/types'
import { ArrowRight, Building, GraduationCap, MapPin, Phone, Search, SearchIcon, Star, Tag, Youtube } from 'lucide-react'
import { RxClock } from 'react-icons/rx'
import { GrCertificate } from 'react-icons/gr'
import Company from '../../../assets/company.png'
import youtubeimg from '../../../assets/youtube.png'
import instituteimg from '../../../assets/institute.png'
import certificateimg from '../../../assets/certificate.png'
import interviewhub from '../../../assets/interviewhub.png'
import CustomSearchDropdown from './CustomSearchDropDown.jsx'
import Footer from '../Footer.jsx'



export default function HomePage() {

    const [data, setData] = useState({
        careerData: [],
        youtubeData: [],
        instituteData: [],
        certificateData: [],
    });

    const [searchTerm, setSearchTerm] = useState('');

    const navigateForSearch = (value) => {
        if (!searchValue) {
            return;
        }
        // Your navigation logic here
        navigate(searchValue);
    };


    const [searchValue, setSearchValue] = useState('');

    const navigatFunciton = () => {
        if (!searchValue) {
            return
        }
        navigate(searchValue)
    }


    const [blogs, setBlogs] = useState([]);


    const fetchBlogs = async (page = 0, size = 10) => {

        try {
            const response = await fetch(
                `${resources.APPLICATION_URL}admin/get-blogs?page=${page}&size=${size}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch blogs');
            }

            const data = await response.json();

            setBlogs(data.content || []);

        } catch (err) {
            console.log(err)
        }
    };


    useEffect(() => {
        fetchBlogs(0, 10)
    }, [])



    const getCareerData = (type) => {
        axios.get(`${resources.APPLICATION_URL}view/data?type=${type}&page=0&size=6`).then(response => {
            if (type === types.CAREER) {
                setData(prev => ({
                    ...prev,
                    careerData: response.data.content
                }))
            } else if (type === types.YOUTUBE) {
                setData(prev => ({
                    ...prev,
                    youtubeData: response.data.content
                }))
            } else if (type === types.COACHING) {
                setData(prev => ({
                    ...prev,
                    instituteData: response.data.content
                }))
            }
            else {
                setData(prev => ({
                    ...prev,
                    certificateData: response.data.content
                }))
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            navigateForSearch();
        }
    }

    useEffect(() => {
        getCareerData(types.CAREER);
        getCareerData(types.YOUTUBE)
        getCareerData(types.COACHING)
        getCareerData(types.CERTIFICATE)
    }, [])
    function extractBracketOrOriginal(str) {
        if (!str)
            return
        const match = str.match(/\(([^)]+)\)/);
        return match ? match[1] : str;
    }

    const navigate = useNavigate()

    const handleBlogClick = (blogSlug) => {
        navigate(`/knowledge-hub/${blogSlug}`);
    };

    return (
        <div className="bg-[#f5faff] w-full min-h-screen">

            <div className=' hidden lg:block bg-[#244ad1] p-10'>

                <div className='text-center text-white text-[36px] font-[500]'>
                    <h1>One-Stop Guide for</h1>
                    <h1>Your Career Journey</h1>
                </div>
                <div className='w-[450px] mx-auto flex justify-center mt-2'>
                    <CustomSearchDropdown />
                </div>

                <div className='grid grid-cols-5 gap-4 mt-8 -mb-36'>

                    <div onClick={() => navigate('/career')} className='bg-white rounded-lg shadow-lg overflow-hidden relative h-60 cursor-pointer'>

                        <div className='h-1/2 white flex items-center justify-center'>
                            <div className='text-4xl text-white'><img src={Company} className='w-18 h-18' /></div>
                        </div>

                        <div className='h-1/2 bg-white p-4 text-center overflow-y-auto custom-scrollbar'>
                            <h3 className='font-bold text-xl text-gray-800'>Company Careers</h3>
                            <p className='text-sm text-gray-600'>Explore company career pages and know their current hiring status, median employee tenure, and more — all in one place</p>
                        </div>
                    </div>

                    <div onClick={() => navigate('/interviewqa-hub')} className='bg-white rounded-lg shadow-lg overflow-hidden relative h-60 cursor-pointer'>
                        <div className='h-1/2 white flex items-center justify-center'>
                            <div className='text-4xl text-white'><img src={youtubeimg} className='w-18 h-18' /></div>
                        </div>
                        <div className='h-1/2 bg-white p-4 text-center overflow-y-auto custom-scrollbar'>
                            <h3 className='font-bold text-xl text-gray-800'>Interview Q&A Hub</h3>
                            <p className='text-sm text-gray-600'>Stop struggling to find interview Questions — we’ve researched the best Q&A for every role from fresher to  experienced</p>
                        </div>
                    </div>
                    <div onClick={() => navigate('/institute')} className='bg-white rounded-lg shadow-lg overflow-hidden relative h-60 cursor-pointer'>
                        <div className='h-1/2 bg-white flex items-center justify-center'>
                            <div className='text-4xl text-white'><img src={instituteimg} className='w-18 h-18' /></div>
                        </div>
                        <div className='h-1/2 bg-white p-4 text-center overflow-y-auto custom-scrollbar'>
                            <h3 className='font-bold text-xl text-gray-800'>Coaching Centers</h3>
                            <p className='text-sm text-gray-600'>Find the right coaching center without leaving your home. We’ve researched it all — explore course details, reviews, and request a call back</p>
                        </div>
                    </div>
                    <div onClick={() => navigate('/certificate')} className='bg-white rounded-lg shadow-lg overflow-hidden relative h-60'>
                        <div className='h-1/2 bg-white flex items-center justify-center'>
                            <div className='text-4xl text-white'><img src={certificateimg} className='w-18 h-18' /></div>
                        </div>
                        <div className='h-1/2 bg-white p-4 text-center overflow-y-auto custom-scrollbar'>
                            <h3 className='font-bold text-xl text-gray-800'>Free Certifications</h3>
                            <p className='text-sm text-gray-600'>Boost your career with 100% free certification courses. We’ve curated the best from top platforms — start learning and get certified</p>
                        </div>
                    </div>
                    <div onClick={() => navigate('/interview-Q&A')} className='bg-white rounded-lg shadow-lg overflow-hidden relative h-60 cursor-pointer'>
                        <div className='h-1/2 white flex items-center justify-center'>
                            <div className='text-4xl text-white'><img src={interviewhub} className='w-18 h-18' /></div>
                        </div>
                        <div className='h-1/2 bg-white p-4 text-center overflow-y-auto custom-scrollbar'>
                            <h3 className='font-bold text-xl text-gray-800'>Interview Videos</h3>
                            <p className='text-sm text-gray-600'>Don’t waste time searching for good videos — we’ve already done the research. Learn from the best YouTube videos.</p>
                        </div>
                    </div>
                </div>
            </div>

            {blogs.length > 0 &&
                <div className='hidden lg:block mt-36  p-5'>
                    <div className='flex justify-between items-center mb-6'>
                        <h1 className='font-bold text-xl'>Knowledge Hub</h1>
                        {blogs.length > 3 && (
                            <Link to='/knowledge-hub' className='cursor-pointer text-blue-400 font-semibold'>
                                View all
                            </Link>
                        )}
                    </div>
                    <div className='flex overflow-x-auto scrollbar-hide gap-4 pb-4'>
                        {blogs.slice(0, 5).map((blog, idx) => (
                            <div key={blog.id} className='min-w-[300px]'>
                                <BlogCard blog={blog} onClick={() => handleBlogClick(blog.slug)} />
                            </div>
                        ))}
                    </div>
                </div>}
            <div className={`hidden lg:block  p-5 ${blogs.length === 0 ? 'mt-40' : ''}`}>
                <h1 className=' font-bold text-xl '>Top Searches</h1>
                <div className='grid grid-cols-3 p-5 gap-3 text-[#244ad1]'>
                    < p className='cursor-pointer' onClick={() => navigate(`career/1314/TCS`)}>TCS Careers</p>
                    <p className='cursor-pointer' onClick={() => navigate(`career/1374/Swiggy`)}>Swiggy</p>
                    <p className='cursor-pointer' onClick={() => navigate(`career/1376/PhonePe`)}>PhonePe</p>

                </div>
            </div>

            <div className={`flex flex-col gap-5 lg:hidden `}>
                <div className=' p-2 bg-gradient-to-r from-blue-600 to-indigo-700' >
                    <div className='text-center  flex flex-col gap-3 text-white text-2xl font-[500]'>
                        <h1>One-Stop Guide for</h1>
                        <h1>Your Career Journey</h1>
                    </div>
                    <div className='mx-auto flex justify-center mt-3'>
                        <CustomSearchDropdown />
                    </div>

                </div>


                <div className='grid grid-cols-3 gap-2 px-2 space-y-6 justify-center'>

                    <div onClick={() => navigate('/career')} className='flex flex-col gap-2'>
                        <div className='flex justify-center '>
                            <div className=' w-[40.6px] h-[40.6px]  flex justify-center items-center rounded-lg'>
                                <img src={Company} className='w-12 h-12' />
                            </div>
                        </div>
                        <span className='font-bold text-xs text-center'>Company Careers</span>
                    </div>
                    <div onClick={() => navigate('interviewqa-hub')} className='flex flex-col gap-2'>
                        <div className='flex justify-center'>
                            <div className=' w-[40.6px] h-[40.6px]  flex justify-center items-center rounded-lg'>
                                <img src={youtubeimg} className='w-12 h-12' />
                            </div>
                        </div>

                        <span className='font-bold  text-xs text-center '>Interview Q&A Hub</span>
                    </div>



                    <div onClick={() => navigate('/institute')} className='flex flex-col gap-2 items-center justify-center'>
                        <div className='flex justify-center  '>
                            <div className=' w-[40.6px] h-[40.6px]  flex justify-center items-center rounded-lg'>
                                <img src={instituteimg} className='w-12 h-12' />
                            </div>
                        </div>
                        <span className='font-bold  text-xs text-center '>Coaching Centers</span>
                    </div>
                    <div className='flex col-span-2 justify-center '>
                        <div onClick={() => navigate('/certificate')} className='flex flex-col gap-2 justify-center items-center mx-auto'>
                            <div className='flex justify-center'> 
                                <div className=' w-[40.6px] h-[40.6px]  flex justify-center items-center rounded-lg'>
                                    <img src={certificateimg} className='w-12 h-12' />
                                </div>
                            </div>

                            <span className='font-bold  text-xs text-center'>Free Certifications</span>
                        </div>

                        <div onClick={() => navigate('/interview-Q&A')} className='flex flex-col gap-2'>
                            <div className='flex justify-center'>
                                <div className=' w-[40.6px] h-[40.6px]  flex justify-center items-center rounded-lg'>
                                    <img src={interviewhub} className='w-12 h-12' />
                                </div>
                            </div>

                            <span className='font-bold  text-xs text-center '>Interview Videos</span>
                        </div>

                    </div>
                    {/* <div className='w-full flex  justify-evenly'>
                        <div onClick={() => navigate('/interviewqa')} className='flex flex-col gap-2'>
                            <div className='flex justify-center '>
                                <div className=' w-[73.6px] h-[73.6px]  flex justify-center items-center rounded-lg'>
                                    <img src={instituteimg} className='w-12 h-12' />
                                </div>
                            </div>
                            <span className='font-bold '>Interviews</span>
                        </div>
                        <div onClick={() => navigate('/certificate')} className='flex flex-col gap-2'>
                            <div className='flex justify-center'>
                                <div className=' w-[73.6px] h-[73.6px]  flex justify-center items-center rounded-lg'>
                                    <img src={certificateimg} className='w-12 h-12' />
                                </div>
                            </div>

                            <span className='font-bold '>Free Certifications</span>
                        </div>
                    </div> */}

                </div>


                {blogs.length > 0 && <div className='flex flex-col'>
                    <div className='flex justify-between items-center p-2 font-sans'>
                        <span className='text-lg font-semibold'>Knowledge Hub</span>
                        {blogs.length > 3 && (
                            <Link to='/knowledge-hub' className='cursor-pointer text-blue-400 font-semibold'>
                                View all
                            </Link>
                        )}
                    </div>
                    <div className='flex overflow-x-auto scrollbar-hide gap-4 px-2 pb-2 mb-3'>
                        {blogs.slice(0, 5).map((blog, idx) => (
                            <div className='w-full min-w-[300px]'>
                                <BlogCard key={blog.id} blog={blog} onClick={() => handleBlogClick(blog.slug)} />
                            </div>
                        ))}
                    </div>
                </div>}

                <div className='flex flex-col'>
                    <div className='flex justify-between items-center p-2 font-sans'>
                        <span className='text-lg font-semibold'>Explore Career Pages</span>
                        {data.careerData.length > 5 && (
                            <Link to='/career' className='cursor-pointer text-blue-400 font-semibold'>
                                View all
                            </Link>
                        )}
                    </div>
                    <div className='flex  overflow-x-auto scrollbar-hide gap-4 px-2 pb-2'>
                        {data.careerData.slice(0, 5).map((item, idx) => (
                            <div
                                onClick={() => navigate(`career/${item.id}/${item.companyName}`)}
                                key={idx}
                                className='bg-white flex flex-col items-center gap-5 py-2 px-4 rounded-lg  flex-shrink-0'
                            >
                                <div className=' p-3 rounded-xl'>
                                    <img src={Company} className='w-12 h-12' />
                                </div>
                                <span className=' font-sans font-semibold text-center'>
                                    {extractBracketOrOriginal(item?.companyName)}
                                </span>
                                <span className="p-1 bg-green-100 rounded-lg text-[10px] font-medium">
                                    Hiring Now
                                </span>
                            </div>
                        ))}

                    </div>
                </div>


                <div className='flex flex-col  rounded-2xl p-2'>
                    <div className='flex justify-between items-center mb-6'>
                        <div>
                            <h2 className='text-lg font-semibold text-gray-900'> Coaching Centers</h2>

                        </div>
                        {data.instituteData?.length > 5 && (

                            <Link className='text-blue-400 font-semibold cursor-pointer' to='/institute'>View all</Link>

                        )}
                    </div>


                    <div className='flex overflow-x-auto scrollbar-hide gap-6 pb-4'>
                        {data.instituteData.slice(0, 5).map((item, idx) => (
                            <div
                                onClick={() => navigate(`institute/${item.id}/${item.instituteName}`)}
                                key={idx}
                                className='group bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50 flex flex-col  p-2 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 min-w-[200px]'
                            >

                                <div className='flex items-start gap-4 mb-4'>
                                    <div className="w-[76px] h-[76px]  rounded-2xl flex items-center justify-center p-3 ">
                                        {/* <GraduationCap className="w-12 h-12 text-white" /> */}
                                        <img src={instituteimg} />
                                    </div>
                                    <div className='flex-1'>
                                        <h3 className=' font-semibold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors'>
                                            {extractBracketOrOriginal(item?.instituteName)}
                                        </h3>

                                    </div>
                                </div>


                                <div className='flex flex-col gap-3 '>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-bold text-gray-900">{item.rating}</span>
                                        </div>
                                        <span className="text-gray-600 text-sm">({item.numberOfReviews?.split('.')[0]} reviews)</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                                        <MapPin className="w-4 h-4 text-gray-500" />
                                        <span className="font-medium">{item.location}</span>
                                    </div>
                                </div>

                            </div>
                        ))}

                    </div>
                </div>


                <div className='flex flex-col p-2'>
                    <div className='flex justify-between items-center p-2 font-sans'>
                        <span className='text-lg font-semibold'>Interview Videos</span>
                        {data.youtubeData.length > 5 && (
                            <Link to='/interview-Q&A' className='cursor-pointer text-blue-400 font-semibold'>
                                View all
                            </Link>
                        )}
                    </div>
                    <div className='flex  overflow-x-auto scrollbar-hide gap-4 px-2 pb-2'>
                        {data.youtubeData.slice(0, 5).map((item, idx) => (
                            <div
                                onClick={() => navigate(`/interview-Q&A/${item.id}/${item.videoTitle}`)}
                                key={idx}
                                className='group bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50 flex flex-col  p-2 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 min-w-[300px]'
                            >
                                <div className='  rounded-xl flex items-center gap-5'>
                                    <div className=' w-[73.6px] h-[73.6px]  flex justify-center items-center rounded-lg'>
                                        <img src={youtubeimg} className='w-12 h-12' />
                                    </div>
                                    <span className='text-lg font-sans font-semibold text-center'>
                                        {item.topic}
                                    </span>
                                </div>


                                <span className=' font-sans font-semibold text-center'>
                                    {extractBracketOrOriginal(item?.videoTitle.substring(0, 28))}
                                </span>


                                {item.tags && (
                                    <div className="flex items-start gap-2 ">
                                        <Tag className="w-3 h-3 text-gray-400 mt-1 flex-shrink-0" />
                                        <div className="flex flex-wrap gap-1">
                                            {item.tags.split(',').map((tag, index) => (
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


                            </div>
                        ))}

                    </div>
                </div>





                <div className='flex flex-col'>
                    <div className='flex justify-between items-center p-2 font-sans'>
                        <span className='text-lg font-semibold'>Free Certifications</span>
                        {data.certificateData.length > 5 && (
                            <Link to='/certificate' className='cursor-pointer text-blue-400 font-semibold'>
                                View all
                            </Link>
                        )}
                    </div>
                    <div className='flex  overflow-x-auto scrollbar-hide gap-4 px-2 pb-2 mb-3'>
                        {data.certificateData.slice(0, 5).map((item, idx) => (
                            <div
                                onClick={() => navigate(`certificate/${item.id}/${item.courseTitle}`)}
                                key={idx}
                                className='group bg-white gap-3 hover:bg-gradient-to-br hover:from-white hover:to-blue-50 flex flex-col  p-2 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 min-w-[300px]'
                            >
                                <div className='flex items-center gap-3 rounded-xl'>
                                    <div className=' w-[73.6px] h-[73.6px]  flex justify-center items-center rounded-lg'>
                                        <img src={certificateimg} className='w-12 h-12' />
                                    </div>
                                    <span className=' font-sans font-semibold text-center'>
                                        {item?.courseCategory}
                                    </span>

                                </div>
                                <div className='flex flex-col'>
                                    <span className=' font-sans font-semibold text-center'>
                                        {item?.courseTitle.substring(0, 28)}
                                    </span>

                                </div>


                            </div>
                        ))}

                    </div>
                </div>






            </div>
            <Footer />

        </div>
    )
}
