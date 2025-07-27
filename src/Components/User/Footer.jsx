// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//     Linkedin,
//     Instagram,
//     Youtube,
//     Facebook,
// } from 'lucide-react';

// const Footer = () => {
//     const navigate = useNavigate();

//     const socialLinks = [
//         {
//             icon: Linkedin,
//             url: "https://www.linkedin.com/company/guideinorg/",
//             label: "LinkedIn",
//             color: "hover:text-blue-400"
//         },
//         {
//             icon: Instagram,
//             url: "https://www.instagram.com/guidein_org?igsh=eGZnZWptOHE1bGgw",
//             label: "Instagram",
//             color: "hover:text-pink-400"
//         },
//         {
//             icon: Youtube,
//             url: "https://youtube.com/@guideinorg?si=o0aPITZ1fv6Dol-s",
//             label: "YouTube",
//             color: "hover:text-red-400"
//         },
//         {
//             icon: Facebook,
//             url: "https://www.facebook.com/share/16xznP6cen/",
//             label: "Facebook",
//             color: "hover:text-blue-500"
//         }
//     ];

//     return (
//         // <footer className="bg-gradient-to-b from-gray-900 to-black text-white border-t border-gray-800">
//         //     <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         //         <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
                    
//         //             {/* Company Info Section */}
//         //             <div className="lg:max-w-md space-y-4">
//         //                 <div className="space-y-3">
//         //                     <h3 className="text-2xl font-bold text-white tracking-wide">GuideIn</h3>
//         //                     <p className="text-gray-300 text-sm leading-relaxed">
//         //                         Empowering growth through guidance and innovation. Connect with us for expert solutions.
//         //                     </p>
//         //                 </div>
                        
//         //                 {/* Social Links */}
//                         <div className="pt-2 ">
                            
//                             <div className="flex gap-10">
//                                 {socialLinks.map((social, index) => (
//                                     <a
//                                         key={index}
//                                         href={social.url}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className={`p-1 rounded-lg bg-gray-800/50 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 ${social.color} hover:bg-gray-700/70 border border-white hover:border-gray-600/50`}
//                                         aria-label={social.label}
//                                     >
//                                         <social.icon size={16} />
//                                     </a>
//                                 ))}
//                             </div>
//                         </div>
           

//         //             {/* Quick Links Section */}
//         //             <div className="lg:mt-0 space-y-4">
//         //                 <h4 className="text-lg font-semibold text-white">Quick Links</h4>
//         //                 <nav className="space-y-2">
//         //                     <button
//         //                         onClick={() => navigate('/about')}
//         //                         className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium hover:translate-x-1 transform transition-transform"
//         //                     >
//         //                         About Us
//         //                     </button>
//         //                     <button
//         //                         onClick={() => navigate('/contact-us')}
//         //                         className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium hover:translate-x-1 transform transition-transform"
//         //                     >
//         //                         Contact Us
//         //                     </button>
//         //                     <button
//         //                         onClick={() => navigate('/privacy-policy')}
//         //                         className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium hover:translate-x-1 transform transition-transform"
//         //                     >
//         //                         Privacy Policy
//         //                     </button>
//         //                 </nav>
//         //             </div>
//         //         </div>
//         //     </div>

//         //     {/* Bottom Bar */}
//         //     <div className="border-t border-gray-800/50 bg-black/30 backdrop-blur-sm">
//         //         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//         //             <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
//         //                 <span className="text-gray-400 text-xs font-medium">
//         //                     © {new Date().getFullYear()} GuideIn. All rights reserved.
//         //                 </span>
//         //                 <div className="flex items-center space-x-4 text-xs">
//         //                     <button
//         //                         onClick={() => navigate('/privacy-policy')}
//         //                         className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
//         //                     >
//         //                         Privacy
//         //                     </button>
//         //                     <span className="text-gray-600">•</span>
//         //                     <button
//         //                         onClick={() => navigate('/terms')}
//         //                         className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
//         //                     >
//         //                         Terms
//         //                     </button>
//         //                 </div>
//         //             </div>
//         //         </div>
//         //     </div>
//         // </footer>
//     );
// };

// export default Footer;




import { useNavigate } from 'react-router-dom';
import {
    Linkedin,
    Instagram,
    Youtube,
    Facebook,
} from 'lucide-react';


const Footer = () => {
    const navigate = useNavigate();

    const socialLinks = [
        {
            icon: Linkedin,
            url: "https://www.linkedin.com/company/guideinorg/",
            label: "LinkedIn",
            color: "hover:text-blue-400"
        },
        {
            icon: Instagram,
            url: "https://www.instagram.com/guidein_org?igsh=eGZnZWptOHE1bGgw",
            label: "Instagram",
            color: "hover:text-pink-400"
        },
        {
            icon: Youtube,
            url: "https://youtube.com/@guideinorg?si=o0aPITZ1fv6Dol-s",
            label: "YouTube",
            color: "hover:text-red-400"
        },
        {
            icon: Facebook,
            url: "https://www.facebook.com/share/16xznP6cen/",
            label: "Facebook",
            color: "hover:text-blue-500"
        }
    ];

    return (
        <div className='bg-black text-white flex flex-col gap-2 px-2  md:px-10 py-1'>
            <div className='flex  justify-around  md:justify-evenly gap-2'>
                <div className='flex flex-col gap-2'>
                    <p className="cursor-pointer" onClick={() => navigate('/contact-us')}>Contact us</p>
                    <p className='cursor-pointer md:hidden' onClick={() => navigate('/terms-conditions')}>Terms & Conditions</p>

                </div>
                <p className='cursor-pointer' onClick={() => navigate('/about')}>About us</p>

                <p className='cursor-pointer ' onClick={() => navigate('/privacy-policy')}>Privacy Policy</p>



                <p className='cursor-pointer hidden md:block' onClick={() => navigate('/terms-conditions')}>Terms & Conditions</p>

            </div>
            <div className='flex justify-center'>

              <div className="pt-2 ">
                            
                            <div className="flex gap-10">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-1 rounded-lg bg-gray-800/50 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 ${social.color} hover:bg-gray-700/70 border border-white hover:border-gray-600/50`}
                                        aria-label={social.label}
                                    >
                                        <social.icon size={16} />
                                    </a>
                                ))}
                            </div>
                        </div>

            </div>
            <div className='flex justify-center'>


                <p>CopyRight&#169;{new Date().getFullYear()}</p>

            </div>

        </div>
    );
};

export default Footer;