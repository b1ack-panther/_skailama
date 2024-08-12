import { Link, useLocation, useParams } from "react-router-dom";
import MainLogo from "../components/MainLogo.jsx";

const Sidebar = () => {
	const {episodeId} = useParams();
	const {state: {projectId}, pathname}= useLocation()
	const unknownStr = "Podcast Upload Flow";

	return (
		<div className="sidebar">
			<MainLogo />
			<div className="unknown-str">{unknownStr}</div>
			<ol className="sidenavbar-elementList">
				<Link state={{projectId}} to={`/${projectId}/upload`}>
					<li
						className={`sidenavbar-element " ${
							pathname.includes("upload") || episodeId  ? "active" : ""
						}`}
					>
						Projects
					</li>
				</Link>
				<Link state={{projectId}} to={`/${projectId}/widgetConfiguration`}>
					<li
						className={`sidenavbar-element " ${
							pathname.includes("widgetConfiguration") ? "active" : ""
						}`}
					>
						Widget Configurations
					</li>
				</Link>
				<Link state={{projectId}} to={`/${projectId}/deployment`}>
					<li
						className={`sidenavbar-element " ${
							pathname.includes("deployment") ? "active" : ""
						}`}
					>
						Deployment
					</li>
				</Link>
				<Link state={{projectId}} to={`/${projectId}/pricing`}>
					<li
						className={`sidenavbar-element " ${
							pathname.includes("pricing") ? "active" : ""
						}`}
					>
						Pricing
					</li>
				</Link>
				<div className="seperator" />
				<div className="seperator seperator2" />
				<Link state={{projectId}} to={`/settings`}>
					<li
						className={`sidenavbar-element settings " ${
							pathname.includes("settings") ? "active" : ""
						}`}
					>
						Settings
					</li>
				</Link>
			</ol>
		</div>
	);
};

export default Sidebar;
