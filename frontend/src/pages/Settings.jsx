import { useEffect, useState } from "react";
import ProjectNav from "../components/ProjectNav";
import Sidebar from "../components/Sidebar";
import "./Settings.css";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import axios from "axios";
import { setUser } from "../store/userSlice";

const Settings = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.user);

	useEffect(() => {
		setName(user.name);
		setEmail(user.email);
	}, []);

	const handleSubmit = async () => {
		setIsLoading(true);
		const { data } = await axios.patch(import.meta.env.VITE_BACKEND_DOMAIN + "/user", {
			name, email
		})

		dispatch(setUser({ ...data }))
		setIsLoading(false);
	}

	return (
		<div className="project-container">
			<Sidebar />
			<div className="project-upload">
				<ProjectNav />
				<div className="settings-container">
					<h1>Account Settings</h1>
					<div className="settings-inputs">
						<img
							src="https://cdn.lazyshop.com/files/6df1f5b8-188e-4bca-b99a-87172ee534f3/product/47ec96bda6b72d74828cc94e6f57f433.jpeg"
							alt="user profile image"
						/>
						<div className="upload-name settings-name">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								name="name"
								value={name}
								placeholder="alphauser"
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="upload-name settings-name">
							<label htmlFor="email">Email</label>
							<input
								placeholder="alphauser@email.com"
								type="text"
								name="email"
								value={email}
								disabled
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
					</div>
					{user.name != name && <div style={{marginLeft: "auto", width: "max-content"}}>
						{isLoading ? (
							<Spinner />
						) : (
							<button className="upload-modal-btn" onClick={handleSubmit}>
								Save
							</button>
						)}
					</div>}
					<h1 className="subscriptions-heading">Subscriptions</h1>
					<div className="subscription-banner">
						<p>
							You are currently on the <a href="">Ques AI Basic Plan!</a>
						</p>
						<button>Upgrade</button>
					</div>
					<a className="cancel-subscription" href="">
						Cancel Subscription
					</a>
				</div>
			</div>
		</div>
	);
};

export default Settings;
