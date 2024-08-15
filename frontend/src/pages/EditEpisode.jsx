import { useEffect, useState } from "react";
import "./EditEpisode.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
	useGetEpisodesQuery,
	useUpdateEpisodeMutation,
} from "../store/episodesSlice";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";

const EditEpisode = () => {
	const [edit, setEdit] = useState(false);
	const [description, setDescription] = useState("");
	const { episodeId, projectId } = useParams();
	const { user } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const { state } = useLocation();
	const [loading, setLoading] = useState(false);

	const {
		data: episodeList,
		isSuccess,
		isLoading,
	} = useGetEpisodesQuery({
		projectId,
		email: user.email,
	});
	const [
		editEpisode,
		{ isSuccess: editSuccess, error: editError, isLoading: editLoading },
	] = useUpdateEpisodeMutation();

	let episode;

	if (isSuccess) {
		episodeList?.ids?.forEach((id) => {
			if (episodeList.entities[id].id == episodeId)
				episode = episodeList.entities[id];
		});
	}

	useEffect(() => {
		setDescription(episode?.description);
	}, [episode]);

	useEffect(() => {
		setLoading(editLoading || isLoading);
	}, [editLoading, isLoading]);

	const handleEditClick = () => {
		setEdit(true);
		setTimeout(() => {
			document.querySelector(".description-input").focus();
		}, 0);
	};

	const handleEditSubmit = () => {
		editEpisode({ description, email: user.email, episodeId });
	};

	useEffect(() => {
		if (editSuccess) {
			if (editSuccess) {
				navigate(`/${projectId}/upload`, { state });
			}
		}
	}, [editSuccess, navigate, projectId, state]);

	return (
		<div className="edit-transcript">
			<div className="transcript-header">
				<h2>Edit Transcript</h2>
				{edit && (
					<div className="save-discard-btns">
						<button onClick={() => setEdit(false)} className="discard-btn">
							Discard
						</button>
						{loading ? (
							<Spinner />
						) : (
							<button className="save-exit-btn" onClick={handleEditSubmit}>
								Save & Exit
							</button>
						)}
					</div>
				)}
			</div>
			{editError && <span>{editError?.data?.message}</span>}
			<div className="transcript-content">
				<div className="edit-header">
					<button onClick={handleEditClick} className="edit-mode">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="CurrentColor"
						>
							<path
								d="M14.0588 9.02L14.9788 9.94L5.91878 19H4.99878V18.08L14.0588 9.02ZM17.6588 3C17.4088 3 17.1488 3.1 16.9588 3.29L15.1288 5.12L18.8788 8.87L20.7088 7.04C21.0988 6.65 21.0988 6.02 20.7088 5.63L18.3688 3.29C18.1688 3.09 17.9188 3 17.6588 3ZM14.0588 6.19L2.99878 17.25V21H6.74878L17.8088 9.94L14.0588 6.19Z"
								fill="CurrentColor"
							/>
						</svg>
						<span>Edit Mode</span>
					</button>
					<button className="edit-search">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="33"
							height="33"
							viewBox="0 0 33 33"
							fill="none"
						>
							<path
								d="M21.6631 19.6006H20.5769L20.1919 19.2293C21.5394 17.6618 22.3506 15.6268 22.3506 13.4131C22.3506 8.47684 18.3494 4.47559 13.4131 4.47559C8.4769 4.47559 4.47565 8.47684 4.47565 13.4131C4.47565 18.3493 8.4769 22.3506 13.4131 22.3506C15.6269 22.3506 17.6619 21.5393 19.2294 20.1918L19.6006 20.5768V21.6631L26.4756 28.5243L28.5244 26.4756L21.6631 19.6006ZM13.4131 19.6006C9.9894 19.6006 7.22565 16.8368 7.22565 13.4131C7.22565 9.98934 9.9894 7.22559 13.4131 7.22559C16.8369 7.22559 19.6006 9.98934 19.6006 13.4131C19.6006 16.8368 16.8369 19.6006 13.4131 19.6006Z"
								fill="#7E22CE"
							/>
						</svg>
					</button>
				</div>
				<div className="edit-description">
					<h3>Speaker</h3>
					{edit ? (
						<textarea
							className="description-input"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					) : (
						<p>{description}</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default EditEpisode;
