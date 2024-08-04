import { Link } from "react-router-dom"
function Footer() {
    return (
        <footer className="bg-[#00145e]  p-2 ml-0 xl:ml-[20%]">
            <div className="sm:mx-auto max-w-screen-lg">
                <div className="grid grid-cols-3 gap-2 lg:gap-4 md:mx-10 items-center ">
                    <div className="text-white">
                        <Link to='/faqs-employee'  className="text-sm ml-5 md:ml-0">FAQ</Link>
                    </div>
                    <div className="text-white text-sm text-center ">
                        <p>Copyright &copy; {new Date().getFullYear()}</p>
                    </div>
                    <div className="text-white text-sm justify-self-end">
                        <h2 className=''>Help & Support</h2>
                        <Link to='/econtactus' className=''>Contact Us</Link>
                    </div>
                </div>

            </div>
        </footer>
    )
}
export default Footer;