import { useState } from "react";
import "./WidgetConfig.css";

const WidgetConfig = () => {
	const [activeTab, setActiveTab] = useState("general");

	return (
		<div className="widget-container">
			<h1>Configuration</h1>
			<div className="widget-main">
				<div className="widget-tabs">
					<button
						className={`widget-btn ${activeTab === "general" ? "active" : ""}`}
						onClick={() => setActiveTab("general")}
					>
						General
					</button>
					<button
						className={`widget-btn ${activeTab === "display" ? "active" : ""}`}
						onClick={() => setActiveTab("display")}
					>
						Display
					</button>
					<button
						className={`widget-btn ${activeTab === "advanced" ? "active" : ""}`}
						onClick={() => setActiveTab("advanced")}
					>
						Advanced
					</button>
				</div>
				<div className="tab-content">
					{activeTab === "general" && (
						<div className="general-tab">
							<div className="general-tab-input">
								<label htmlFor="chatbotName">Chatbot Name</label>
								<input type="text" name="chatbotName" />
								<span>Lorem ipsum dolor sit amet consectetur.</span>
							</div>
							<div className="general-tab-input">
								<label htmlFor="welcomeMessage">Welcome Message</label>
								<input type="text" name="welcomeMessage" />
								<span>Lorem ipsum dolor sit amet consectetur.</span>
							</div>
							<div className="general-tab-input">
								<label htmlFor="inputPlaceholder">Input Placeholder</label>
								<input type="text" name="inputPlaceholder" />
								<span>Lorem ipsum dolor sit amet consectetur.</span>
							</div>
						</div>
					)}
					{activeTab === "Advanced" && (
						<div className="Advanced-tab">Advanced tab</div>
					)}
					{activeTab === "display" && (
						<div className="display-tab">
							<div className="up-section">
								<div className="display-tab-input general-tab-input">
									<label htmlFor="primaryColor">Primary Color</label>
									<div className="display-input-div">
										<input
											type="text"
											name="primaryColor"
											defaultValue="#0f4d6c"
											onChange={(e) => {
												document
													.querySelector(".primary-color")
													.style.setProperty("--PRIMARY-COLOR", e.target.value);
											}}
										/>
										<div className="color-div primary-color"></div>
									</div>
									<span>Lorem ipsum dolor sit amet consectetur.</span>
								</div>
								<div className="display-tab-input general-tab-input">
									<label htmlFor="fontColor">Font Color</label>
									<div className="display-input-div">
										<input
											type="text"
											name="fontColor"
											defaultValue="#0a970a"
											onChange={(e) => {
												document
													.querySelector(".font-color")
													.style.setProperty("--FONT-COLOR", e.target.value);
											}}
										/>
										<div className="color-div font-color"></div>
									</div>
									<span>Lorem ipsum dolor sit amet consectetur.</span>
								</div>
								<div className="display-tab-input general-tab-input">
									<label htmlFor="fontSize">Font Size (in px)</label>
									<input defaultValue="14px" type="text" name="fontSize" />
									<span>Lorem ipsum dolor sit amet consectetur.</span>
								</div>
								<div className="display-tab-input general-tab-input">
									<label htmlFor="chatHeight">
										Chat Height (in % of total screen)
									</label>
									<input value="lorem epsum" type="text" name="chatHeight" />
									<span>Lorem ipsum dolor sit amet consectetur.</span>
								</div>
								<div className="display-tab-input general-tab-input">
									<label htmlFor="chatbotName">Show Sources</label>
									<span>Lorem ipsum dolor sit amet consectetur.</span>
								</div>
								<div className="switch">
									<input type="checkbox" id="switch" className="checkbox" />
									<label htmlFor="switch" className="toggle"></label>
								</div>
							</div>
							<h3 className="chat-icon">Chat Icon</h3>
							<div className="down-section up-section">
								<div className="display-tab-input general-tab-input">
									<label htmlFor="chatIconSize">Chat Icon Size</label>
									<div className="display-input-div">
										{/* <input type="text" name="chatIconSize" /> */}
										<select id="dropdown" name="chatIconSize">
											<option value="40px">Small (40px * 40px)</option>
											<option value="80px">Medium (80px * 80px)</option>
											<option value="120px">Large (120px * 120px)</option>
										</select>
									</div>
									<span>Lorem ipsum dolor sit amet consectetur.</span>
								</div>
								<div className="display-tab-input general-tab-input">
									<label htmlFor="PositionOnScreen">Position on Screen</label>
									<div className="display-input-div">
										<select id="dropdown" className="positionOnScreen">
											<option value="top-left">Top Left</option>
											<option value="top-center">Top Center</option>
											<option value="top-right">Top Right</option>
											<option value="middle-left">Middle Left</option>
											<option value="middle-center">Middle Center</option>
											<option value="middle-right">Middle Right</option>
											<option value="bottom-left">Bottom Left</option>
											<option value="bottom-center">Bottom Center</option>
											<option value="bottom-right">Bottom Right</option>
										</select>
									</div>
									<span>Lorem ipsum dolor sit amet consectetur.</span>
								</div>
								<div className="display-tab-input general-tab-input">
									<label htmlFor="positonFromBottom">
										Position from Bottom (in px)
									</label>
									<input
										defaultValue="24"
										type="text"
										name="positonFromBottom"
									/>
									<span>Lorem ipsum dolor sit amet consectetur.</span>
								</div>
								<div className="display-tab-input general-tab-input">
									<label htmlFor="horizontalDistance">
										Horizontal Distance (in px)
									</label>
									<input
										defaultValue="24"
										type="text"
										name="horizontalDistance"
									/>
									<span>Lorem ipsum dolor sit amet consectetur.</span>
								</div>
								<div className="bot-icon-div">
									<h4>Bot Icon</h4>
									<div className="bot-icon-content">
										<div className="bot-img"></div>
										<button className="upload-bot-img">
											<span>Upload Image</span>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="35"
												height="35"
												viewBox="0 0 35 35"
												fill="currentColor"
											>
												<path
													d="M16.0417 23.3333V11.4479L12.25 15.2396L10.2084 13.125L17.5 5.83334L24.7917 13.125L22.75 15.2396L18.9584 11.4479V23.3333H16.0417ZM8.75004 29.1667C7.94796 29.1667 7.26108 28.8808 6.68942 28.3092C6.11775 27.7375 5.8324 27.0511 5.83338 26.25V21.875H8.75004V26.25H26.25V21.875H29.1667V26.25C29.1667 27.0521 28.8809 27.739 28.3092 28.3106C27.7375 28.8823 27.0512 29.1677 26.25 29.1667H8.75004Z"
													fill="currentColor"
												/>
											</svg>
										</button>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default WidgetConfig;
