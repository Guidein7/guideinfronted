import { Link } from "react-router-dom";
function JSFooter() {
    return (

        <footer className="bg-[#00145e]  p-2 ml-0 lg:ml-[20%]">
            <div className="max-w-screen mx-auto">
            <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-4 justify-center items-center text-center md:mx-10">
                <div className="text-white justify-self-start">
                    <Link to='/faqs-referral' className="text-sm ml-1">FAQ</Link>
                </div>
                <div className="text-white text-sm text-center my-auto ">
                    <p>Copyright &copy; {new Date().getFullYear()}</p>
                </div>
                <div className="text-white text-sm justify-self-end">
                    <h2 className=''>Help & Support</h2>
                    <Link to='/contactus' className=''>Contact Us</Link>
                </div>
                </div>
            </div>
        </footer>



    )
}
export default JSFooter;
