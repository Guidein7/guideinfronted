import { useNavigate } from "react-router-dom";


export default function AdminNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="admin-navbar">
      <span onClick={() => navigate("/admin-upload")}>Admin Upload</span>
      <span onClick={() => navigate("/admin-blog")}>Blog Upload</span>
      <span onClick={() => navigate("/admin-blog-list")}>Blog List</span>
      <span onClick={() => navigate("/admin-data")}>Student Info</span>
      <span onClick={() => navigate()}></span>
    </nav>
  );
}
