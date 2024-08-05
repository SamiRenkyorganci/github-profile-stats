import Link from 'next/link';
import { FC } from 'react';

interface ProjectCardProps {
  project: {
    full_name: string;
    description: string;
    stargazers_count: number;
    language: string;
    owner: {
      avatar_url: string;
    };
  };
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const encodedProjectName = project.full_name.replace(/\//g, '%2F');
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg m-3 p-4">
      <img src={project.owner.avatar_url} alt={`${project.full_name} avatar`} className="w-24 h-24 object-cover rounded-full mx-auto" />
      <h2 className="text-xl font-bold mt-3 text-center">{project.full_name}</h2>
      <p className="text-sm mt-2 text-center">{project.description}</p>
      <p className="text-sm mt-2 text-center">Stars: {project.stargazers_count}</p>
      <p className="text-sm mt-2 text-center">Language: {project.language}</p>
      <Link href={`/project/${encodedProjectName}`} passHref>
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white p-2 rounded-lg mt-3 mx-auto block transition-all duration-300 ease-in-out">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default ProjectCard;
