import SideBar from './SideBar';
import emailicon from '../../../assets/emailicon.png'
import callicon from '../../../assets/callicon.png'
import { Link } from "react-router-dom";

function EContactus() {
    return(
        <div className="bg-[#f8f9fa] min-h-screen flex flex-col justify-between">
            <SideBar/>
           <div className="flex-grow ml-0 xl:ml-[20%] pt-20">
          <div className="flex  flex-col justify-center items-center">
          <h1 className=" text-3xl">We are here to help.</h1>
            <p className="pt-12 text-center">Have an issue or query or feedback for us? our support team is here to help you 24/7</p>
            <h1 className="pt-12 ont-bold text-3xl">Contact Us</h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-10  ">
                <div className=''>
                    <div className='mx-auto'>
                    <img src={emailicon} alt='emailicon'/>   
                    </div>
                    <p>support@guidein.org</p>
                </div>
                <div className='hidden lg:block' >
                    <h1 className="text-3xl text-center  ">Address</h1>
                    <div className="pt-5 text-center">
                    <p>P. No 27, Sri Ram Nagar Colony</p>
                    <p>Beeramguda, Hyderabad, Medak</p>
                    <p>Telangana, 502032</p>
                    </div>
                </div>
                <div className="text-center">
                   <div className="mx-auto">
                   <img src={callicon} alt='callicon' className="mx-auto"/>
                   </div>
                    <p>+91 9392579230</p>
                    <p></p>
                </div>
            </div>

          </div>
           </div>
           <footer className="bg-[#00145e]  p-1 ml-0 xl:ml-[20%]">
                <div className="sm:mx-auto max-w-screen-lg">
                    <div className="grid grid-cols-2 gap-4 ">
                        <div className="text-white justify-self-start">

                        </div>
                        <div className="text-white justify-self-end">
                            <h2 className='pr-2'>Help & Support</h2>
                            <Link to='/econtactus' className='pl-2'>Contact Us</Link>
                        </div>
                    </div>
                    <div className="text-white text-center ">
                        <p>Copyright &copy; 2024</p>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default EContactus;