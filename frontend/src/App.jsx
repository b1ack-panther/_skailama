import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Project from "./pages/Project";
import ProjectUpload from "./pages/ProjectUpload";
import EditEpisode from "./pages/EditEpisode";
import Settings from "./pages/Settings";
import Deployment from "./pages/Deployment";
import Login from "./pages/Login";
import WidgetConfig from "./pages/WidgetConfig";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* <Route index element={<Login />} /> */}
				<Route path="/" element={<Home />} />
				<Route path="/:projectId" element={<Project />}>
					<Route path="upload" element={<ProjectUpload />} />
          <Route path=":episodeId" element={<EditEpisode />} />
          <Route path="widgetConfiguration" element={<WidgetConfig />} />
          <Route path="deployment" element={<Deployment />} />
          <Route path="pricing" element={<Deployment />} />
				</Route>
				<Route path="/settings" element={<Settings />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
