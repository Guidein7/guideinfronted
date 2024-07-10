import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Welcome2 (){
    const data = useSelector(state => state.emplog)
  console.log(data.data.access_token);
    return (
        <div className="h-screen flex justify-center items-center bg-gray-500">
  <div>
    <h1 className="text-white">Welcome</h1>
    
      <p className="text-white">{data.data.access_token}</p>
  </div>
</div>
    )
}
export default Welcome2;
