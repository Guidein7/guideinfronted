import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "./Slices/loginSlice";
import { useNavigate } from "react-router-dom";


function Welcome (){
    const data = useSelector(state => state.log)
    console.log(data.data.access_token)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Dispatch the logout action
        dispatch(logoutUser());
        // Redirect to the login page after logout
        navigate('/login');
    };
  
    return (
        <div className="h-screen flex justify-center items-center bg-gray-500">
  <div>
    <h1 className="text-white">Welcome</h1>
      <p className="text-white">{data.data.access_token}</p>
      <button onClick={handleLogout}>logout</button>
    
  </div>
</div>

    )
}
export default Welcome;