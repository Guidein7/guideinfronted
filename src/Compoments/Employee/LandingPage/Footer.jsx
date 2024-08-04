import { Link } from "react-router-dom";
function EFooter() {
    return(
        <div className="bg-[#00145e] w-full p-2 ">
        <footer className='sm:mx-auto max-w-screen-lg  '>
            <div className='grid grid-cols-3 gap-2'>
                <div className='text-white my-auto justify-self-start'>
                   <Link to='/employee-faqs' className="ml-1 text-sm">FAQ</Link>
                </div>
                <div className='text-white text-start md:text-center text-sm my-auto'>
                <p>Copyright &copy; {new Date().getFullYear()}</p>
            </div>
                <div className='text-white text-sm  justify-self-end'>
                    <h2 className=''>Help & Support</h2>
                    <Link to='/econtact-us' className='ml-2'>Contact Us</Link>
                </div>
            </div>
            
        </footer>
    </div>
    )
}
export default EFooter;