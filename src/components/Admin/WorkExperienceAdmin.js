import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkExperienceAdmin = () => {
    const [workExperiences, setWorkExperiences] = useState([]);
    const [formData, setFormData] = useState({
        Position: '',
        Company: '',
        Location: '',
        StartDate: '',
        EndDate: '',
        Description: '',
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWorkExperiences();
    }, []);

    const fetchWorkExperiences = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/workexperience`);
            setWorkExperiences(response.data);
        } catch (err) {
            setError('Error fetching work experiences');
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/workexperience/${editingId}`, formData);
                setEditingId(null);
            } else {
                await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/workexperience`, formData);
            }
            setFormData({ Position: '', Company: '', Location: '', StartDate: '', EndDate: '', Description: '' });
            fetchWorkExperiences();
        } catch (err) {
            setError('Error saving work experience');
        }
    };

    const handleEdit = (experience) => {
        setFormData(experience);
        setEditingId(experience.Id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/workexperience/${id}`);
            fetchWorkExperiences();
        } catch (err) {
            setError('Error deleting work experience');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage Work Experience</h2>
            {error && <p className="text-red-500">{error}</p>}
            
            <form onSubmit={handleAddOrUpdate} className="mb-8 space-y-4 bg-gray-100 p-4 rounded">
                <input
                    type="text"
                    name="Position"
                    value={formData.Position}
                    onChange={handleInputChange}
                    placeholder="Position"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="Company"
                    value={formData.Company}
                    onChange={handleInputChange}
                    placeholder="Company"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="Location"
                    value={formData.Location}
                    onChange={handleInputChange}
                    placeholder="Location"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="date"
                    name="StartDate"
                    value={formData.StartDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="date"
                    name="EndDate"
                    value={formData.EndDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
                <textarea
                    name="Description"
                    value={formData.Description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    className="w-full p-2 border rounded"
                    required
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    {editingId ? 'Update' : 'Add'} Experience
                </button>
            </form>

            <ul className="space-y-4">
                {workExperiences.map((experience) => (
                    <li key={experience.Id} className="p-4 border rounded bg-white shadow-md">
                        <h3 className="font-semibold">{experience.Position}</h3>
                        <p>{experience.Company}, {experience.Location}</p>
                        <p>
                            {new Date(experience.StartDate).toLocaleDateString()} -{' '}
                            {experience.EndDate ? new Date(experience.EndDate).toLocaleDateString() : 'Present'}
                        </p>
                        <p>{experience.Description}</p>
                        <div className="space-x-2 mt-2">
                            <button onClick={() => handleEdit(experience)} className="px-4 py-2 bg-yellow-500 text-white rounded">Edit</button>
                            <button onClick={() => handleDelete(experience.Id)} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WorkExperienceAdmin;
