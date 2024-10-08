import { useEffect } from "react";

const Modal = ({ children, className }) => {
	useEffect(() => {
		const AllModals = document.querySelectorAll(".modal");

		window.onclick = function (event) {
			AllModals.forEach((modal) => {
				if (event.target == modal) {
					modal.style.display = "none";
				}
			});
		};
	}, [className]);

	const handleModalClose = () => {
		document.querySelectorAll(".modal").forEach((modal) => {
			modal.style.display = "none";
		});
	};
	
	return (
		<div className={`modal ${className}`}>
			<div className="modal-content">
				<span
					onClick={handleModalClose}
					className="close"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="62"
						height="62"
						viewBox="0 0 62 62"
						fill="currentColor"
					>
						<path
							d="M31.0001 34.6165L18.3417 47.2748C17.8681 47.7484 17.2653 47.9852 16.5334 47.9852C15.8015 47.9852 15.1987 47.7484 14.7251 47.2748C14.2515 46.8012 14.0146 46.1984 14.0146 45.4665C14.0146 44.7345 14.2515 44.1318 14.7251 43.6582L27.3834 30.9998L14.7251 18.3415C14.2515 17.8679 14.0146 17.2651 14.0146 16.5332C14.0146 15.8012 14.2515 15.1984 14.7251 14.7248C15.1987 14.2512 15.8015 14.0144 16.5334 14.0144C17.2653 14.0144 17.8681 14.2512 18.3417 14.7248L31.0001 27.3832L43.6584 14.7248C44.132 14.2512 44.7348 14.0144 45.4667 14.0144C46.1987 14.0144 46.8015 14.2512 47.2751 14.7248C47.7487 15.1984 47.9855 15.8012 47.9855 16.5332C47.9855 17.2651 47.7487 17.8679 47.2751 18.3415L34.6167 30.9998L47.2751 43.6582C47.7487 44.1318 47.9855 44.7345 47.9855 45.4665C47.9855 46.1984 47.7487 46.8012 47.2751 47.2748C46.8015 47.7484 46.1987 47.9852 45.4667 47.9852C44.7348 47.9852 44.132 47.7484 43.6584 47.2748L31.0001 34.6165Z"
							fill="currentColor"
						/>
					</svg>
				</span>
				{children}
			</div>
		</div>
	);
};

export default Modal;
