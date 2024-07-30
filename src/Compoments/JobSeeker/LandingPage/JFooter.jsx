import { Link } from "react-router-dom";
function JFooter() {
    return (
        <div className="bg-[#00145e] w-full p-2">
        <footer className="max-w-screen mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-4 justify-center items-center text-center">
            <div className="text-white">
              <Link to="/referral-faqs" className="text-sm">FAQ</Link>
            </div>
            <div className="text-white text-sm">
              <p>Copyright &copy; {new Date().getFullYear()}</p>
            </div>
            <div className="text-white text-sm">
              <h2>Help & Support</h2>
              <Link to="/contact-us" className="">Contact Us</Link>
            </div>
          </div>
        </footer>
      </div>
      
    )
}
export default JFooter;