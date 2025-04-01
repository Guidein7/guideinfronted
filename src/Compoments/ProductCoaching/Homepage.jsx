import { useState } from "react";
import ProductNav from "./ProductNav";
import { TbArrowBigRight } from "react-icons/tb";
import Drawing from '../../assets/Drawing.png'
import chatgpt from '../../assets/chatgpt.png'
import figma from '../../assets/figma-logo-png_seeklogo-332042.png'
import jira from '../../assets/jira.png'
import powerbi from '../../assets/powerbi.png'
import sqlserver from '../../assets/sql-server.png'
import trello from '../../assets/Trello.jpeg'
import notion from '../../assets/notion.jpeg'
import Confluence from '../../assets/Confluence.jpeg'
import { FaUserGraduate } from "react-icons/fa";
// import { LuBriefcaseBusiness } from "react-icons/lu";
import { MdBusinessCenter } from "react-icons/md";
import { MdOutlineAutoGraph } from "react-icons/md";
import JFooter from "../JobSeeker/LandingPage/JFooter";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";
import Policy from '../../assets/Policy.pdf';









const images = [
    { name: "Jira", src: jira },
    { name: "Trello", src: trello },
    { name: "Figma", src: figma },
    { name: "Power BI", src: powerbi },
    { name: "SQL", src: sqlserver },
    { name: "Notion", src: notion },
    { name: "Confluence", src: Confluence },
    { name: "ChatGPT", src: chatgpt }
];




export default function HomePage() {

    const successMessage = (message) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 3000,
        })

    }

    const errorMessage = (message) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 3000,
        })

    }
    const [isChecked, setIsChecked] = useState(false);
    const [checkboxError, setCheckboxError] = useState("");
    const [loading,setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            mobile: '',
            city: ''
        }
    });

    const onSubmit = (data) => {
        
        if (!isChecked) {
          
            setCheckboxError("You must agree to the Terms & Conditions");
            return;
        }
        setCheckboxError("");
        setLoading(true)
        axios.post(`${config.api.baseURL}${config.api.jobSeeker.learner}`, data).then(response => {
            if (response.data.success) {
                setIsChecked(false);
                setIsOpen(false);
                reset();
                successMessage("Your request was successfully submitted");

            }
            else {
                errorMessage(response.data.message)
            }

        }).catch(error => {
            if(error?.message){
                errorMessage(error?.message);
                return
            }
            errorMessage(error.response.data.message)
        }).finally(() => setLoading(false))

    };

    const [currentStep, setCurrentStep] = useState('learning');
    const [showPop, setShowPopup] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className="bg-[#C8C9EA] min-h-screen">
            <ProductNav />
            <div className="pt-14 flex flex-col  gap-10">

                <div className="pro-stickybutto" onClick={() => setIsOpen(true)}>
                    <button>Register For Free Demo</button>
                </div>
                <div className="bottom-0 fixed bg-[#031330] h-[76px]  w-full ">
                    <div className="flex justify-between">
                        <div className="text-white p-4">
                            <div className="">
                                <span className="text-2xl mr-2">&#8377; 14999</span>  <s >&#8377; 19999</s>
                            </div>
                            <p className="text-sm  text-white blink">
                                The Early Bird Offer is Ending Soon!
                            </p>
                        </div>
                        <div className=" hidden md:flex items-center px-3">
                            <button onClick={() => setIsOpen(true)} className="text-white pro-background py-2 px-2 rounded-lg">ENQUIRE NOW</button>
                        </div>
                    </div>
                </div>


                <div className=" w-full fixed z-10 bg-[#C8C9EA] flex flex-col gap-5 pt-4 pb-2">
                    <div className="text-center" >
                        <span className="text-center text-black font-Inter text-xl md:text-3xl font-bold" >Ready to Become a Business Analyst?<br />

                        </span><span className="text-black font-dmsans text-base md:text-lg ">Click on each step to see how we take you from learning to landing the job</span>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <button onClick={() => setCurrentStep('learning')} className={`font-Inter text-[16px] md:text-xl bg-[#244ad1] p-3 text-white  rounded-lg step-button ${currentStep === 'learning' ? 'stepcolor border border-white border-2' : 'text-white'}`}>Learn_Skills</button>
                        < TbArrowBigRight size={18} className="pro-arrowicon" />
                        <button onClick={() => setCurrentStep('practice')} className={`font-Inter text-[16px] md:text-xl bg-[#244ad1] p-3 text-white  rounded-lg step-button ${currentStep === 'practice' ? 'stepcolor border border-white border-2' : 'text-white'}`}>Practice</button>
                        < TbArrowBigRight size={18} className="pro-arrowicon" />
                        <button onClick={() => setCurrentStep('getjob')} className={`font-Inter text-[16px] md:text-xl bg-[#244ad1] p-3 text-white  rounded-lg step-button ${currentStep === 'getjob' ? 'stepcolor border border-white border-2' : 'text-white'}`}>Get Job</button>
                    </div>
                </div>
                {currentStep === 'learning' && (
                    <>
                        <div className="text-center flex flex-col gap-8 pt-44 ">
                            <div className="md:hidden">
                                <span className=" text-[26px] font-dmSans font-semibold text-[#3741dc] block">Learning is Not About<br /> Reading the Book </span>
                                <span className="text-[#013a7d] font-dmSans text-[24px] font-bold block">It’s about  gaining real skills</span>
                            </div>
                            <div className="hidden md:block">
                                <span className=" text-[26px] font-dmSans font-semibold text-[#3741dc] block">Learning is Not About Reading the Book </span>
                                <span className="text-[#013a7d] font-dmSans text-[24px] font-bold block">It’s about  gaining real skills</span>
                            </div>
                            <div className="flex-flex-col gap-5 text-center mx-auto md:hidden" >
                                <div className="">
                                    <p className="block text-center font-dmSans pro-sub"> We teach every topic with </p>
                                    <p className="p-0 m-0">Simple examples</p>
                                    <p className="p-0 m-0">Not with boring definitions</p>

                                </div>
                                <div>
                                    <p className="block text-center font-dmSans pro-sub">You don’t just remember </p>
                                    <p className="p-0 m-0">You understand</p>
                                    <p className="p-0 m-0">Once you understand, you never forget</p>

                                </div>
                                <div>
                                    <p className="block text-center font-dmSans pro-sub">That’s why our students feel confident </p>
                                    <p className="p-0 m-0"> Even if they are from </p>
                                    <p className="p-0 m-0">Non-technical background</p>

                                </div>
                            </div>
                            <div className="hidden md:block ">
                                <div className="grid grid-cols-3">
                                    <div className="bg-[#F2F2F2] mx-16 rounded-lg flex flex-col gap-1 py-4" >
                                        <p className="block text-center text-lg font-dmSans pro-sub"> We teach every topic with </p>
                                        <div>
                                            <p className="p-0 m-0 text-lg">Simple examples</p>
                                            <p className="p-0 m-0 text-lg">Not with boring definitions</p>
                                        </div>
                                    </div>
                                    <div className="bg-[#F2F2F2] mx-16 text-lg rounded-lg flex flex-col gap-1 py-4" >
                                        <p className="block text-center font-dmSans pro-sub">You don’t just remember </p>
                                        <p className="p-0 m-0">You understand</p>
                                        <p className="p-0 m-0">Once you understand, you never forget</p>

                                    </div>
                                    <div className="bg-[#F2F2F2] mx-16  text-lg rounded-lg flex flex-col gap-1 py-4" >
                                        <p className="block text-center font-dmSans pro-sub"> Our students feel confident </p>
                                        <p className="p-0 m-0"> Even if they are from </p>
                                        <p className="p-0 m-0">Non-technical background</p>

                                    </div>
                                </div>

                            </div>

                            <div className="mb-3 md:hidden ">
                                <span className="text-xl font-dmsans font-bold mb-3">Skills You wil Learn</span>
                                <div className="flex justify-center mt-2">
                                    <img src={Drawing} alt="picture" className="h-60 w-[95%] md:w-auto" />
                                </div>
                            </div>
                            <div className="my-2 md:hidden">
                                <h1 className="fot-bold font-Inter text-xl font-bold mb-2">Tools You will Master</h1>
                                <div className="grid grid-cols-3 mx-auto gap-3 place-items-center">
                                    {images.map((item, idx) => (
                                        <div key={idx} className="flex flex-col   gap-1 " >
                                            <div className=" w-[57px] h-[57px] rounded-lg bg-[#1f4aad1a]  p-3">
                                                <img src={item.src} alt="companyimg" className="" />
                                            </div>
                                            <span className="text-sm font-dmsans font-normal">{item.name}</span>
                                        </div>
                                    ))}
                                </div>

                            </div>
                            <div className="md:flex hidden ">
                                <div className=" flex-1">
                                    <span className="text-xl font-dmsans font-bold mb-3">Skills You wil Learn</span>
                                    <div className="flex justify-center mt-2">
                                        <img src={Drawing} alt="picture" className="h-96  md:w-auto" />
                                    </div>
                                </div>
                                <div className=" flex-1 ">
                                    <h1 className="fot-bold font-Inter text-xl font-bold mb-2">Tools You will Master</h1>
                                    <div className="grid grid-cols-3 mx-auto gap-10 place-items-center">
                                        {images.map((item, idx) => (
                                            <div key={idx} className="flex flex-col   gap-2 " >
                                                <div className=" w-[57px] h-[57px] rounded-lg bg-[#1f4aad1a]  p-3">
                                                    <img src={item.src} alt="companyimg" className="" />
                                                </div>
                                                <span className="text-sm font-dmsans font-normal">{item.name}</span>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                        <h1 className="text-black text-center text-xl font-bold font-Inter">Who is this course for?</h1>
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                            <div className="flex items-center  mx-2 gap-5 bg-[#fff6] p-2 rounded-lg">
                                <div className="pro-background w-60 h-14 flex justify-center items-center rounded-lg" >
                                    <FaUserGraduate size={24} />
                                </div>
                                <div>
                                    <h1 className="font-bold  font-Inter">Freshers & Graduates</h1>
                                    <span className="text-base font-dmsans text-[#444]">
                                        Start your career as a Business Analyst with in-demand skills like requirement gathering,
                                        stakeholder communication, and tools like Excel, Confluence, Figma, SQL & Jira.
                                    </span>
                                </div>

                            </div>
                            <div className="flex items-center  mx-2 gap-5 bg-[#fff6] p-2 rounded-lg">
                                <div className="pro-background w-60 h-14 flex justify-center items-center rounded-lg" >
                                    <MdOutlineAutoGraph size={24} />
                                </div>
                                <div>
                                    <h1 className="font-bold  font-Inter">Non-Technical Working Professionals</h1>
                                    <span className="text-base font-dmsans text-[#444]">
                                        Transition into a Business Analyst role without coding knowledge. Learn how to analyze business needs,
                                        document requirements, and communicate with tech teams.
                                    </span>
                                </div>

                            </div>

                            <div className="flex items-center  mx-2 gap-5 bg-[#fff6] p-2 rounded-lg">
                                <div className="pro-background w-60 h-14 flex justify-center items-center rounded-lg" >
                                    <MdBusinessCenter size={24} />
                                </div>
                                <div>
                                    <h1 className="font-bold  font-Inter">Technical Working Professionals</h1>
                                    <span className="text-base font-dmsans text-[#444]">
                                        Leverage your tech background to move into  Business Analyst role. Learn to bridge business
                                        and technology through data, process flows, and user stories
                                    </span>
                                </div>

                            </div>

                        </div>
                        <div className="bg-[#03183f] py-2">
                            <h1 className="text-white text-center text-xl font-bold mb-2">Why Business Analyst?</h1>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:py-3">
                                <div className="bg-[#ffffff1a] mx-5 p-2 rounded-lg">
                                    <h1 className="per-why-heading">25K+ Jobs/Month</h1>
                                    <p className="text-white font-Inter">In India alone, over 25,000 Business Analyst roles are posted each month across job portals like LinkedIn, Naukri, and Indeed.
                                    </p>

                                </div>
                                <div className="bg-[#ffffff1a] mx-5 p-2 rounded-lg">
                                    <h1 className="per-why-heading text-base">High Demand Across Industries</h1>
                                    <p className="text-white font-Inter">Business Analysts are among the top 10 most in-demand roles in industries like IT, Banking, Healthcare, E-commerce, and Consulting.
                                    </p>

                                </div>
                                <div className="bg-[#ffffff1a] mx-5 p-2 rounded-lg">
                                    <h1 className="per-why-heading text-base">INR ₹9L–₹21L Salary Range</h1>
                                    <p className="text-white font-Inter">Mid to senior-level Business Analysts earn ₹9–21 Lakhs per annum in India, with top companies offering even more for specialized roles.
                                    </p>

                                </div>
                                <div className="bg-[#ffffff1a] mx-5 p-2 rounded-lg">
                                    <h1 className="per-why-heading text-base">AI-Proof Career</h1>
                                    <p className="text-white font-Inter">A report by the World Economic Forum states that analytical and critical thinking roles like Business Analysts are least likely to be replaced by AI.
                                    </p>

                                </div>
                            </div>
                        </div>
                    </>)}
                {currentStep === 'practice' && (
                    <div className="text-center flex flex-col gap-8 pt-44 ">
                        <div className="md:hidden">
                            <span className=" text-[26px] font-dmSans font-semibold text-[#3741dc] block">Just Learning is Not Enough </span>
                            <span className="text-[#013a7d] font-dmSans text-[20px] font-bold block">You should also know how to apply concepts in real work scenarios</span>
                        </div>
                        <div className="hidden md:block">
                            <span className=" text-[26px] font-dmSans font-semibold text-[#3741dc] block">Just learning is not enough </span>
                            <span className="text-[#013a7d] font-dmSans text-[24px] font-bold block">you should also know how to apply concepts in real work scenarios</span>
                        </div>
                        <div className="flex-flex-col gap-7  md:hidden" >
                            <div className="mb-2">
                                <p className="pl-5 text-[#444] font-semibold text-start font-dmSans text-[20px] "> We show you: </p>
                                <p className="p-0 m-0 font-Inter"> How BA and PMs work inside companies</p>
                            </div>
                            <div className="">
                                <p className="pl-5 text-[#444] font-semibold text-start font-dmSans text-xl ">We conduct: </p>
                                <p className="p-0 m-0 font-Inter pl-5"> Real case studies, mock discussions, and role-plays to help you understand
                                </p>
                            </div>
                            <div className="">
                                <p className="pl-5 text-[#444] font-semibold text-start font-dmSans text-xl">You Practice: </p>
                                <ul className="list-disc list-inside font-Inter text-sm  " style={{ listStyleType: 'disc' }} >
                                    <li className="font-dmSans mb-2 text-[15px]">How to talk to stakeholders and customers</li>
                                    <li className="font-dmSans mb-2 text-[15px]">How to work with developers and designers</li>
                                    <li className="ml-4 dmSans mb-2 text-[15px]">What kind of problems you will face on the job</li>
                                    <li className="ml-4 dmSans mb-2 text-[15px]">What exactly are your roles and responsibilities</li>
                                </ul>

                            </div>

                            <div className="mx-auto my-5">
                                <p className="text-center text-[#013a7d] font-dm-Sans font-bold text-xl">
                                    So, even before getting a job <br /> You’ll already know <br />How to work like a pro.
                                </p>
                            </div>


                        </div>








                        <div className="hidden  md:flex flex-col gap-7 " >
                            <div className="flex justify-center items-center gap-5">
                                <div className=" bg-white w-[25%] h-[150px] rounded-lg">
                                    <p className="pl-5 text-[#444] font-semibold text-start font-dmSans text-[23px] "> We show you: </p>
                                    <p className="p-0 m-0 mt-2 font-Inter text-lg"> How BA and PMs work inside companies</p>
                                </div>
                                <div className="bg-white w-[25%] h-[150px] rounded-lg">
                                    <p className="pl-5 text-[#444] font-semibold text-start font-dmSans text-xl md:text-[23px] ">We conduct: </p>
                                    <p className="p-0 m-0 mt-2 font-Inter pl-5 text-lg"> Real case studies, mock discussions, and role-plays to help you understand
                                    </p>
                                </div>
                                <div className="bg-white w-[25%] h-[150px] rounded-lg">
                                    <p className="pl-5 text-[#444] font-semibold text-start font-dmSans text-xl md:text-[23px]">You Practice: </p>
                                    <ul className="list-disc list-inside font-Inter text-sm  " style={{ listStyleType: 'disc' }} >
                                        <li className="font-dmSans mb-2 text-[15px]">How to talk to stakeholders and customers</li>
                                        <li className="font-dmSans mb-2 text-[15px]">How to work with developers and designers</li>
                                        <li className="ml-4 dmSans mb-2 text-[15px]">What kind of problems you will face on the job</li>
                                        <li className="ml-4 dmSans mb-2 text-[15px]">What exactly are your roles and responsibilities</li>
                                    </ul>

                                </div>
                            </div>
                            <div className="mx-auto my-5">
                                <p className="text-center text-[#013a7d] font-dm-Sans font-bold text-xl md:text-2xl">
                                    So, even before getting a job <br /> You’ll already know <br />How to work like a pro
                                </p>
                            </div>

                        </div>


                    </div>
                )}
                {currentStep === 'getjob' && (
                    <div className="text-center flex flex-col gap-8 pt-44 ">
                        <div className="md:hidden">
                            <span className=" text-[26px] font-dmSans font-semibold text-[#3741dc] block">Getting a Job Needs More Than  Knowledge</span>
                            <span className="text-[#013a7d] font-dmSans text-[20px] font-bold block">It needs the right support too</span>
                        </div>
                        <div className="hidden md:block">
                            <span className=" text-[26px] font-dmSans font-semibold text-[#3741dc] block">Getting a job needs more than  knowledge </span>
                            <span className="text-[#013a7d] font-dmSans text-[24px] font-bold block">it needs the right support too</span>
                        </div>
                        <div className="flex-flex-col gap-7  md:hidden" >
                            <div className="mb-2">
                                <p className=" text-[#444] font-semibold text-center font-dmSans text-xl "> We don't promise </p>
                                <p className="p-0 m-0 font-Inter text-center"> Fake "Job Guarantees"</p>
                            </div>
                            <div className="text-center mx-auto">
                                <p className="pl-5 text-[#444] font-semibold text-center font-dmSans text-xl ">We promise one thing</p>
                                <p className="p-0 mx-auto font-Inter text-center">We’ll support you until you get your job <br /> no matter how long it takes
                                </p>
                            </div>
                            <div className="">
                                <p className="pl-5 text-[#444] font-semibold text-start font-dmSans text-xl mt-2">You’ll receive:</p>
                                <ul className="list-disc list-inside font-Inter text-sm text-start  " style={{ listStyleType: 'disc' }} >
                                    <li className="ml-4 dmSans mb-2 text-[15px]">Job Referrals & Interview opportunities</li>
                                    <li className="font-dmSans mb-2 ml-4 text-[15px]">Mock interviews and case rounds</li>
                                    <li className="font-dmSans mb-2 ml-4 text-[15px]">Personal resume feedback & optimization</li>
                                    <li className="ml-4 dmSans mb-2 text-[15px]">Ongoing guidance until you land your dream role</li>
                                </ul>
                            </div>
                        </div>













                        <div className="hidden md:flex flex-col gap-7 " >
                            <div className="flex justify-center items-center gap-14">
                                <div className="bg-white w-1/5 h-[100px] rounded-lg justify-center  items-center">
                                    <p className=" text-[#444] font-semibold text-center font-dmSans text-xl "> We don't promise </p>
                                    <p className="p-0 m-0 font-Inter text-center md:text-base"> Fake "Job Guarantees"</p>
                                </div>
                                <div className="bg-white w-1/5 h-[100px] rounded-lg">
                                    <p className="pl-5 text-[#444] font-semibold text-center font-dmSans text-xl ">We promise one thing</p>
                                    <p className="p-0 mx-auto font-Inter text-center ">We’ll support you until you get your job <br /> no matter how long it takes
                                    </p>
                                </div>

                            </div>
                            <div className="my-2">
                                <p className="pl-5 text-black font-semibold text-center font-dmSans text-3xl mt-5">You’ll receive</p>
                                <div className="flex justify-center gap-4 rounded-lg my-2">
                                    <div className=" flex flex-col text-white text-start  pro-form-submit rounded-lg h-[180px]">
                                        <span className="ml-4 dmSans mb-2 text-[18px] mt-3">Job Referrals & Interview opportunities</span>
                                        <span className="font-dmSans mb-2 ml-4 text-[18px]">Mock interviews and case rounds</span>
                                        <span className="font-dmSans mb-2 ml-4 text-[18px]">Personal resume feedback & optimization</span>
                                        <span className="ml-4 dmSans mb-2 text-[18px]">Ongoing guidance until you land your dream role</span>



                                    </div>



                                </div>

                            </div>
                            <ul className="list-disc list-inside font-Inter text-sm text-start  " style={{ listStyleType: 'disc' }} >
                            </ul>
                        </div>

                    </div>
                )}
            </div>

            {isOpen && (
                <div onClick={() => {setIsChecked(false);setIsOpen(false);reset()}} className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50 p-4">
                    <div onClick={(e) => e.stopPropagation()} className="bg-white  rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-sm z-50">


                        <h2  onClick={() => {setIsChecked(false);setIsOpen(false);reset()}} className="text-3xl px-2 text-end cursor-pointer font-normal">
                            &times;
                        </h2>

                        <div className="flex flex-col gap-4 p-6">


                            <h1 className="font-dmSans font-medium text-black text-xl text-center">
                                Enquire Now
                            </h1>


                            <div className="flex flex-col gap-3 items-center">
                                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                                    <div className="mb-4">
                                        <input
                                            {...register("fullName", {
                                                required: "Full name is required",
                                                minLength: { value: 2, message: "Name must be at least 2 characters" }
                                            })}
                                            type="text"
                                            placeholder="Full Name"
                                            className="w-full max-w-xs sm:max-w-sm md:max-w-md border-b-2 border-gray-400 placeholder-gray-400 outline-none focus:ring-0 focus:border-gray-500"
                                        />
                                        {errors.fullName && (
                                            <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <input
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                            type="text"
                                            placeholder="Email"
                                            className="w-full max-w-xs sm:max-w-sm md:max-w-md border-b-2 border-gray-400 placeholder-gray-400 outline-none focus:ring-0 focus:border-gray-500"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <input
                                            {...register("mobile", {
                                                required: "Phone number is required",
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message: "Please enter a valid 10-digit phone number"
                                                }
                                            })}
                                            type="text"
                                            placeholder="Phone Number"
                                            className="w-full max-w-xs sm:max-w-sm md:max-w-md border-b-2 border-gray-400 placeholder-gray-400 outline-none focus:ring-0 focus:border-gray-500"
                                        />
                                        {errors.mobile && (
                                            <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <input
                                            {...register("city", {
                                                required: "City is required"
                                            })}
                                            type="text"
                                            placeholder="Which city are you currently in?"
                                            className="w-full max-w-xs sm:max-w-sm md:max-w-md border border-gray-400 placeholder-gray-400 outline-none focus:ring-0 focus:border-gray-500 rounded-lg px-3 py-2"
                                        />
                                        {errors.city && (
                                            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <input type="checkbox" checked={isChecked} onChange={(e) => {
                                            setIsChecked(e.target.checked);
                                            setCheckboxError("");
                                        }} />
                                        <p className="font-Inter">I agree to the <a href={Policy} className="text-blue-700" target="_blank" rel="noopener noreferrer">Terms and conditions</a></p>
                                    </div>
                                    {checkboxError && <p className="text-red-500 text-sm">{checkboxError}</p>}

                                    <div className="text-center my-3">
                                        <button disabled={loading} type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 w-full" >
                                           {loading ? 'submitting...' :'Submit'} 
                                        </button>
                                    </div>
                                </form>
                            </div>



                        </div>
                    </div>
                </div>
            )}
            <div className="pb-20">
                <div className="bg-[#00145e] w-full p-2">
                    <footer className="max-w-screen mx-auto">
                        <div className="grid grid-cols-3 md:grid-cols-3 gap-1 md:gap-4 justify-center items-center ">
                            <div className="text-white text-start">
                                {/* <Link to="/referral-faqs" className="text-sm">FAQ</Link> */}
                                <h2>Help & Support</h2>
                                <p className='text-sm md:text-base '>+91 9392579230</p>
                            </div>
                            <div className="text-white text-sm text-center ">
                                <p>Copyright &copy; {new Date().getFullYear()}</p>
                            </div>
                            <div className="text-white text-sm text-end">

                                <Link to="/contact-us" className="">Contact Us</Link>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>



        </div >
    )

}
