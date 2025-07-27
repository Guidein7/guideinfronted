import emailicon from '../../../assets/emailicon.png'
import callicon from '../../../assets/callicon.png'
import Footer from '../Footer'
export default function Contactus(){
    return (
        <div className='flex-grow justify-center items-center pt-24'>
                <div className="flex  flex-col justify-center items-center">
                    <h1 className=" text-3xl">We are here to help.</h1>
                    <p className="pt-12 text-center">Have an issue or query or feedback for us? our support team is here to help you 24/7</p>
                    <h1 className="pt-12 ont-bold text-3xl">Contact Us</h1>
                    <div className="">
                        <div className=''>
                            <img src={emailicon} alt='emailicon' />
                            <p>support@guidein.org</p>
                        </div>
                        
                    </div>

                </div>
                <Footer/>
            </div>
    )
}