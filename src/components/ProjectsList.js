import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectsList = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/projects`);
                setProjects(response.data);
            } catch (err) {
                setError(err);
            }
        };
        fetchProjects();
    }, []);

    if (error) return <p>Error loading projects: {error.message}</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <ProjectCard key={project.Id} project={project} />
            ))}
        </div>
    );
};

const ProjectCard = ({ project }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => setIsExpanded(!isExpanded);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md border">
            <img src={project.ImageUrl} alt={project.Title} className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold mb-2">{project.Title}</h3>
            
            {/* Description with toggle */}
            <p className="text-gray-700">
                {isExpanded ? project.Description : `${project.Description.slice(0, 100)}...`}
                {project.Description.length > 100 && (
                    <button onClick={toggleDescription} className="text-blue-500 ml-2">
                        {isExpanded ? "Show Less" : "Read More"}
                    </button>
                )}
            </p>

            <p className="text-sm text-gray-500 mt-2">Technologies: {project.Technologies}</p>
            <div className="flex justify-between mt-4">
                <a href={project.DemoLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Demo
                </a>
                <a href={project.RepoLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Code
                </a>
            </div>
        </div>
    );
};

export default ProjectsList;
