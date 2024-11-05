import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectAdmin = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        Title: '',
        Description: '',
        Technologies: '',
        DemoLink: '',
        RepoLink: '',
        ImageUrl: '',
        StartDate: '',
        EndDate: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/projects`);
            setProjects(response.data);
        } catch (err) {
            setError('Error fetching projects');
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/projects/${editingId}`, formData);
                setEditingId(null);
            } else {
                await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/projects`, formData);
            }
            setFormData({ Title: '', Description: '', Technologies: '', DemoLink: '', RepoLink: '', ImageUrl: '', StartDate: '', EndDate: '' });
            fetchProjects();
        } catch (err) {
            setError('Error saving project');
        }
    };

    const handleEdit = (project) => {
        setFormData(project);
        setEditingId(project.Id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/projects/${id}`);
            fetchProjects();
        } catch (err) {
            setError('Error deleting project');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage Projects</h2>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleAddOrUpdate} className="mb-8 space-y-4 bg-gray-100 p-4 rounded">
                <input type="text" name="Title" value={formData.Title} onChange={handleInputChange} placeholder="Title" className="w-full p-2 border rounded" required />
                <textarea name="Description" value={formData.Description} onChange={handleInputChange} placeholder="Description" className="w-full p-2 border rounded" required />
                <input type="text" name="Technologies" value={formData.Technologies} onChange={handleInputChange} placeholder="Technologies" className="w-full p-2 border rounded" />
                <input type="url" name="DemoLink" value={formData.DemoLink} onChange={handleInputChange} placeholder="Demo Link" className="w-full p-2 border rounded" />
                <input type="url" name="RepoLink" value={formData.RepoLink} onChange={handleInputChange} placeholder="Repository Link" className="w-full p-2 border rounded" />
                <input type="url" name="ImageUrl" value={formData.ImageUrl} onChange={handleInputChange} placeholder="Image URL" className="w-full p-2 border rounded" />
                <input type="date" name="StartDate" value={formData.StartDate} onChange={handleInputChange} className="w-full p-2 border rounded" />
                <input type="date" name="EndDate" value={formData.EndDate} onChange={handleInputChange} className="w-full p-2 border rounded" />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">{editingId ? 'Update' : 'Add'} Project</button>
            </form>

            <ul className="space-y-4">
                {projects.map((project) => (
                    <li key={project.Id} className="p-4 border rounded bg-white shadow-md">
                        <h3 className="font-semibold">{project.Title}</h3>
                        <p>{project.Description}</p>
                        <p>Technologies: {project.Technologies}</p>
                        <p>
                            <a href={project.DemoLink} target="_blank" rel="noopener noreferrer">Demo</a> | <a href={project.RepoLink} target="_blank" rel="noopener noreferrer">Repo</a>
                        </p>
                        <div className="space-x-2 mt-2">
                            <button onClick={() => handleEdit(project)} className="px-4 py-2 bg-yellow-500 text-white rounded">Edit</button>
                            <button onClick={() => handleDelete(project.Id)} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectAdmin;
