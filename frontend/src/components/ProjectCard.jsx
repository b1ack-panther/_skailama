import Avatar from "react-avatar";
import ago from "s-ago";

const ProjectCard = ({ project, avatarColor }) => {
	const updated_at = new Date(project.updatedAt);
  return (
		<div className="project-card">
			{/* <span className="projectCard-avatar">
				{project.project_name[0] + project.project_name.split(" ")[1]}
			</span> */}
			<Avatar
				className="project-avatar"
				name={project.name}
				round="10px"
				color={avatarColor}
				textSizeRatio={2}
			/>
			<div className="project-content">
				<h2>{project.name}</h2>
				<span>
          {project.episodes.length} { project.episodes.length > 1
						? "Episodes"
						: "Episode"}{" "}
				</span>
				<span className="project-updated-at">
					Last edited {ago(updated_at)}
				</span>
			</div>
		</div>
	);
}

export default ProjectCard
