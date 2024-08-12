
import "./Project.css";
import ProjectNav from "../components/ProjectNav.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { Outlet } from "react-router-dom";

const Project = () => {


  return (
		<div className="project-container">
			<Sidebar />
			<div className="project-upload">
				<ProjectNav />
				<Outlet />
			</div>
		</div>
	);
}

export default Project
