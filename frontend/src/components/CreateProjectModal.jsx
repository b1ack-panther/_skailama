import { useState } from "react";
import Modal from "./Modal";
import { useAddNewProjectMutation } from "../store/projectApiSlice";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

const CreateProjectModal = () => {
	const [projectName, setProjectName] = useState("");
	const [addNewProject, { error, isError, isLoading, isSuccess }] =
		useAddNewProjectMutation();
	const { user } = useSelector((state) => state.user);

	const handleSubmit = async () => {
		try {
			addNewProject({ email: user.email, name: projectName });
		} catch (err) {
			console.log(err);
		}
	};
	
	if (isSuccess) {
		document
			.querySelectorAll(".modal")
			.forEach((modal) => (modal.style.display = "none"));
	}

	return (
		<Modal>
			<div className="create-project-modal">
				<h2>Create Project</h2>
				<div className="create-project-content">
					<label htmlFor="projectName">Enter Project Name</label>
					<input
						type="text"
						name="projectName"
						id="projectName"
						placeholder="Type Here"
						value={projectName}
						onChange={(e) => setProjectName(e.target.value)}
					/>
					{!projectName && <span>Project Name can not be empty</span>}
					{isError && <span className="error">{error?.message}</span>}
					<div className="create-project-buttons">
						<button
							onClick={() => {
								document.querySelector(".modal").style.display = "none";
							}}
							className="cancel-btn"
						>
							Cancel
						</button>
						{isLoading ? (
							<Spinner />
						) : (
							<button onClick={handleSubmit} className="create-btn">
								Create
							</button>
						)}
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default CreateProjectModal;
