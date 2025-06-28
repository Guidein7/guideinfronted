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


export default function HomePage() {

    const [data, setData] = useState({
        careerData: [],
        youtubeData: [],
        instituteData: [],
        certificateData: [],
    });

    const [searchTerm, setSearchTerm] = useState('');

    const navigateForSearch = () => {
        if (!searchTerm)
            return

        alert(searchTerm)
        if (searchTerm.toLowerCase().startsWith('com')) {
            navigate('/career')
        } else if (searchTerm.toLocaleLowerCase().startsWith('y')) {
            navigate('youtube')
        }
        navigate(searchTerm)
    }


    const [searchValue, setSearchValue] = useState('');

    const navigatFunciton = () => {
        if (!searchValue) {
            return
        }
        navigate(searchValue)
    }

    const getCareerData = (type) => {
        axios.get(`${resources.APPLICATION_URL}view/data?type=${type}&page=0&size=6`).then(response => {
            console.log(response)
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

    console.log(data.careerData)
    return (
        <div className="bg-[#f5faff] w-full min-h-screen">

            <div className=' hidden lg:block bg-[#244ad1] p-10'>

                <div className='text-center text-white text-[44px] font-[500]'>
                    <h1>One-Stop Guide for</h1>
                    <h1>Your Career Journey</h1>
                </div>
                <div className='flex justify-center '>
                    <div className='flex bg-white justify-between py-2  gap-4  min-w-[400px] rounded-lg'>
                        <div className='p-2 '>
                            <select className='outline-none' value={searchTerm} onChange={(e) => navigateForSearch(e.target.value)}>
                                <option className='font-bold' value="">Select Category</option>
                                <option vlaue="/career">Company Careers</option>
                                <option value="/youtube">Youtube Learning</option>
                                <option value="/insitute">Coaching Centers</option>
                                <option value="/certificate">Free  Certifications</option>
                            </select>
                        </div>
                        {/* <div className='p-2 border-r' >
                            <select >
                                <option>All Cities</option>
                            </select>
                        </div>
                        <div className='p-2'>
                            <input type='text' placeholder="whats' on your mind" />
                        </div> */}
                        <div className='p-2  mr-2 rounded-lg'>
                            {/* <button className='text-white'>Search</button> */}
                            <SearchIcon onClick={navigateForSearch} strokeWidth={2.5} className='text-[#244ad1] font-bold' />
                        </div>

                    </div>
                </div>


                <div className='grid grid-cols-4 gap-4 mt-8 -mb-36'>

                    <div onClick={() => navigate('/career')} className='bg-white rounded-lg shadow-lg overflow-hidden relative h-60 cursor-pointer'>

                        <div className='h-1/2 white flex items-center justify-center'>
                            <div className='text-4xl text-white'><img src={Company} className='w-24 h-24' /></div>
                        </div>

                        <div className='h-1/2 bg-white p-4 text-center'>
                            <h3 className='font-bold text-2xl text-gray-800'>Company Careers</h3>
                            <p className='text-sm text-gray-600'>Explore company career pages and know their current hiring status, median employee tenure, and more — all in one place</p>
                        </div>
                    </div>

                    <div onClick={() => navigate('/youtube')} className='bg-white rounded-lg shadow-lg overflow-hidden relative h-60 cursor-pointer'>
                        <div className='h-1/2 white flex items-center justify-center'>
                            <div className='text-4xl text-white'><img src={youtubeimg} className='w-24 h-24' /></div>
                        </div>
                        <div className='h-1/2 bg-white p-4 text-center'>
                            <h3 className='font-bold text-2xl text-gray-800'>YouTube Learning</h3>
                            <p className='text-sm text-gray-600'>Don’t waste time searching for good videos — we’ve already done the research. Learn from the best YouTube videos.</p>
                        </div>
                    </div>
                    <div onClick={() => navigate('/institute')} className='bg-white rounded-lg shadow-lg overflow-hidden relative h-60 cursor-pointer'>
                        <div className='h-1/2 bg-white flex items-center justify-center'>
                            <div className='text-4xl text-white'><img src={instituteimg} className='w-24 h-24' /></div>
                        </div>
                        <div className='h-1/2 bg-white p-4 text-center'>
                            <h3 className='font-bold text-2xl text-gray-800'>Coaching Centers</h3>
                            <p className='text-sm text-gray-600'>Find the right coaching center without leaving your home. We’ve researched it all — explore course details, reviews, and request a call back</p>
                        </div>
                    </div>
                    <div onClick={() => navigate('/certificate')} className='bg-white rounded-lg shadow-lg overflow-hidden relative h-60'>
                        <div className='h-1/2 bg-white flex items-center justify-center'>
                            <div className='text-4xl text-white'><img src={certificateimg} className='w-24 h-24' /></div>
                        </div>
                        <div className='h-1/2 bg-white p-4 text-center'>
                            <h3 className='font-bold text-2xl text-gray-800'>Free Certifications</h3>
                            <p className='text-sm text-gray-600'>Boost your career with 100% free certification courses. We’ve curated the best from top platforms — start learning and get certified</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' hidden lg:block mt-36 p-5'>
                <h1 className=' font-bold text-xl '>Top Searches</h1>
                <div className='grid grid-cols-3 p-5 gap-3 text-[#244ad1]'>
                    <p >TCS Careers</p>
                    <p >Swiggy</p>
                    <p >PhonePe</p>
                    <p>Data Science</p>
                    <p>IAS Coaching Centers</p>
                    <p>Excel Courses</p>
                </div>
            </div>




            <div className='flex flex-col gap-5 lg:hidden'>


                <div className=' p-2 bg-gradient-to-r from-blue-600 to-indigo-700' >

                    <div className='text-center  flex flex-col gap-3 text-white text-3xl font-[500]'>
                        <h1>One-Stop Guide for</h1>
                        <h1>Your Career Journey</h1>
                    </div>

                    <div className='flex bg-white items-center rounded-lg justify-between px-3 mt-8 w-[80%] mx-auto'>

                        <select onChange={(e) => setSearchValue(e.target.value)} className=' border bg-white border-gray-100 rounded-lg p-4 outline-none' >
                            <option value="">Select Category</option>
                            <option value="career">Career Pages</option>
                            <option value="youtube">Youtube</option>
                            <option value="institute">Coaching Centers</option>
                            <option value="certificate">Certificates</option>
                        </select>
                        <SearchIcon className='bg-white text-[#244ad1]' strokeWidth={2.5} size={24} onClick={navigatFunciton} />
                    </div>

                </div>


                <div className='flex flex-col gap-10'>
                    <div className='w-full flex  justify-evenly'>
                        <div onClick={() => navigate('/career')} className='flex flex-col gap-2'>
                            <div className='flex justify-center '>
                                <img src={Company} className='h-16 w-16' />
                            </div>
                            <span className='font-bold text-lg'>Company Careers</span>
                        </div>
                        <div onClick={() => navigate('/youtube')} className='flex flex-col gap-2'>
                            <div className='flex justify-center'>
                                <img src={youtubeimg} className='h-16 w-16' />
                            </div>

                            <span className='font-bold text-lg'>YouTube Learning</span>
                        </div>
                    </div>

                    <div className='w-full flex  justify-evenly'>
                        <div onClick={() => navigate('/institute')} className='flex flex-col gap-2'>
                            <div className='flex justify-center '>
                                <img src={instituteimg} className='h-16 w-16' />
                            </div>
                            <span className='font-bold text-lg'>Coaching Centers</span>
                        </div>
                        <div onClick={() => navigate('/certificate')} className='flex flex-col gap-2'>
                            <div className='flex justify-center'>
                                <img src={certificateimg} className='h-16 w-16' />
                            </div>

                            <span className='font-bold text-lg'>Free Certifications</span>
                        </div>
                    </div>

                </div>




                <div className='flex flex-col'>
                    <div className='flex justify-between items-center p-2 font-sans'>
                        <span className='text-xl font-semibold'>Explore Career Pages</span>
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
                                <div className='bg-blue-100 p-3 rounded-xl'>
                                    <img src={Company} className='w-16 h-16' />
                                </div>
                                <span className='text-lg font-sans font-semibold text-center'>
                                    {extractBracketOrOriginal(item?.companyName)}
                                </span>
                                <span className="p-1 bg-green-100 rounded-lg text-[10px] font-medium">
                                    Hiring Now
                                </span>
                            </div>
                        ))}
                        {data.careerData.length > 5 && (
                            <Link
                                to='/career'
                                className='bg-white  flex flex-col items-center justify-center gap-3 py-2 px-4 rounded-lg flex-shrink-0 cursor-pointer hover:from-blue-100 hover:to-blue-200 transition-colors'
                            >
                                <div className='bg-blue-100 p-3 rounded-xl'>
                                    <Building size={48} className='text-blue-600' />
                                </div>
                                <span className='text-lg font-sans font-semibold text-blue-600 text-center'>
                                    View All
                                </span>
                                <span className='text-xs text-blue-500 text-center'>
                                    +{data.careerData.length - 5} more companies
                                </span>
                            </Link>
                        )}
                    </div>
                </div>




                <div className='flex flex-col  rounded-2xl p-2'>
                    <div className='flex justify-between items-center mb-6'>
                        <div>
                            <h2 className='text-lg font-semibold text-gray-900'> Coaching Centers</h2>

                        </div>
                        {data.instituteData?.length > 5 && (
                            <button onClick={() => navigate(`institute`)} className='group flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl'>
                                View All
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        )}
                    </div>


                    <div className='flex overflow-x-auto scrollbar-hide gap-6 pb-4'>
                        {data.instituteData.slice(0, 5).map((item, idx) => (
                            <div
                                onClick={() => navigate(`institute/${item.id}/${item.instituteName}`)}
                                key={idx}
                                className='group bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50 flex flex-col  p-2 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100'
                            >

                                <div className='flex items-start gap-4 mb-4'>
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow">
                                        <GraduationCap className="w-7 h-7 text-white" />
                                    </div>
                                    <div className='flex-1'>
                                        <h3 className='text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors'>
                                            {extractBracketOrOriginal(item?.instituteName)}
                                        </h3>

                                    </div>
                                </div>


                                <div className='flex flex-col gap-3 mb-6'>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-bold text-gray-900">{item.rating}</span>
                                        </div>
                                        <span className="text-gray-600 text-sm">({item.numberOfReviews} reviews)</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                                        <MapPin className="w-4 h-4 text-gray-500" />
                                        <span className="font-medium">{item.location}</span>
                                    </div>
                                </div>
                                {/* <button className="group/btn w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                                <Phone className="w-4 h-4 group-hover/btn:animate-pulse" />
                                Request Callback
                            </button> */}
                            </div>
                        ))}
                        {data.instituteData?.length > 5 && (
                            <div className='group bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 flex flex-col items-center justify-center gap-4 min-w-[280px] p-6 rounded-2xl border-2 border-dashed border-blue-200 hover:border-blue-300 cursor-pointer transition-all duration-300 transform hover:-translate-y-2'>
                                <div className='bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow'>
                                    <Building size={32} className='text-white' />

                                </div>
                                <div className='text-center'>
                                    <h3 className='text-xl font-bold text-blue-700 mb-2'>
                                        Explore More
                                    </h3>
                                    <p className='text-blue-600 font-medium mb-2'>
                                        +{data.instituteData.length - 5} more institutes
                                    </p>
                                    <p className='text-sm text-blue-500'>
                                        Discover all coaching centers in your area
                                    </p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                            </div>
                        )}
                    </div>
                </div>


                <div className='flex flex-col p-2'>
                    <div className='flex justify-between items-center p-2 font-sans'>
                        <span className='text-xl font-semibold'>Learn From Youtube</span>
                        {data.youtubeData.length > 5 && (
                            <Link to='/youtube' className='cursor-pointer text-blue-400 font-semibold'>
                                View all
                            </Link>
                        )}
                    </div>
                    <div className='flex  overflow-x-auto scrollbar-hide gap-4 px-2 pb-2'>
                        {data.youtubeData.slice(0, 5).map((item, idx) => (
                            <div
                                onClick={() => navigate(`youtube/${item.id}/${item.videoTitle}`)}
                                key={idx}
                                className='bg-white flex flex-col  gap-2 py-2 px-4 rounded-lg  flex-shrink-0'
                            >
                                <div className=' p-3 rounded-xl flex items-center gap-5'>
                                    <img src={youtubeimg} className='w-16 h-16' />
                                    <span className='text-lg font-sans font-semibold text-center'>
                                        {item.topic}
                                    </span>
                                </div>


                                <span className='text-lg font-sans font-semibold text-center'>
                                    {extractBracketOrOriginal(item?.videoTitle)}
                                </span>


                                {item.tags && (
                                    <div className="flex items-start gap-2 flex-wrap">
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
                        {data.youtubeData.length > 5 && (
                            <Link
                                to='/youtube'
                                className='bg-white  flex flex-col items-center justify-center gap-3 py-2 px-4 rounded-lg flex-shrink-0 cursor-pointer hover:from-blue-100 hover:to-blue-200 transition-colors'
                            >
                                <div className='bg-blue-100 p-3 rounded-xl'>
                                    <Building size={48} className='text-blue-600' />
                                </div>
                                <span className='text-lg font-sans font-semibold text-blue-600 text-center'>
                                    View All
                                </span>
                                <span className='text-xs text-blue-500 text-center'>
                                    +{data.careerData.length - 5} more companies
                                </span>
                            </Link>
                        )}
                    </div>
                </div>





                <div className='flex flex-col'>
                    <div className='flex justify-between items-center p-2 font-sans'>
                        <span className='text-xl font-semibold'>Free Certifications</span>
                        {data.certificateData.length > 5 && (
                            <Link to='/certificate' className='cursor-pointer text-blue-400 font-semibold'>
                                View all
                            </Link>
                        )}
                    </div>
                    <div className='flex  overflow-x-auto scrollbar-hide gap-4 px-2 pb-2'>
                        {data.certificateData.slice(0, 5).map((item, idx) => (
                            <div
                                onClick={() => navigate(`certificate/${item.id}/${item.courseTitle}`)}
                                key={idx}
                                className='bg-white flex flex-col  gap-5 py-2 px-4 rounded-lg  flex-shrink-0'
                            >
                                <div className='flex items-center gap-3 rounded-xl'>
                                    <img src={certificateimg} className='w-16 h-16' />
                                    <span className='text-lg font-sans font-semibold text-center'>
                                        {item?.courseCategory}
                                    </span>

                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-lg font-sans font-semibold text-center'>
                                        {item?.courseTitle}
                                    </span>
                                    {/* <span className='text-lg font-sans font-semibold '>
                                    {item?.platform}
                                </span> */}
                                    {/* <div className="flex items-center gap-2">
                                    <RxClock size={16} />
                                    <p>{item.courseDuration}</p>
                                </div> */}
                                </div>

                                {/* <button className="p-2 border border-gray-300 rounded-lg text-[10px] font-medium text-white bg-black">
                                    Enroll  Now
                                </button> */}
                            </div>
                        ))}
                        {data.certificateData.length > 5 && (
                            <Link
                                to='/certificate'
                                className='bg-white  flex flex-col items-center justify-center gap-3 py-2 px-4 rounded-lg flex-shrink-0 cursor-pointer hover:from-blue-100 hover:to-blue-200 transition-colors'
                            >
                                <div className='bg-blue-100 p-3 rounded-xl'>
                                    <GrCertificate size={96} />
                                </div>
                                <span className='text-lg font-sans font-semibold text-blue-600 text-center'>
                                    View All
                                </span>
                                <span className='text-xs text-blue-500 text-center'>
                                    +{data.careerData.length - 5} more companies
                                </span>
                            </Link>
                        )}
                    </div>
                </div>



            </div>

        </div >
    )
}
