import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EducationAdmin = () => {
    const [educations, setEducations] = useState([]);
    const [formData, setFormData] = useState({
        Degree: '',
        University: '',
        Location: '',
        StartDate: '',
        EndDate: '',
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEducations();
    }, []);

    const fetchEducations = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/education`);
            setEducations(response.data);
        } catch (err) {
            setError('Error fetching education records');
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/education/${editingId}`, formData);
                setEditingId(null);
            } else {
                await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/education`, formData);
            }
            setFormData({ Degree: '', University: '', Location: '', StartDate: '', EndDate: '' });
            fetchEducations();
        } catch (err) {
            setError('Error saving education record');
        }
    };

    const handleEdit = (education) => {
        setFormData(education);
        setEditingId(education.Id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/education/${id}`);
            fetchEducations();
        } catch (err) {
            setError('Error deleting education record');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage Education</h2>
            {error && <p className="text-red-500">{error}</p>}
            
            <form onSubmit={handleAddOrUpdate} className="mb-8 space-y-4 bg-gray-100 p-4 rounded">
                <input
                    type="text"
                    name="Degree"
                    value={formData.Degree}
                    onChange={handleInputChange}
                    placeholder="Degree"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="University"
                    value={formData.University}
                    onChange={handleInputChange}
                    placeholder="University"
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
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    {editingId ? 'Update' : 'Add'} Education
                </button>
            </form>

            <ul className="space-y-4">
                {educations.map((education) => (
                    <li key={education.Id} className="p-4 border rounded bg-white shadow-md">
                        <h3 className="font-semibold">{education.Degree}</h3>
                        <p>{education.University}, {education.Location}</p>
                        <p>
                            {new Date(education.StartDate).toLocaleDateString()} -{' '}
                            {education.EndDate ? new Date(education.EndDate).toLocaleDateString() : 'Present'}
                        </p>
                        <div className="space-x-2 mt-2">
                            <button onClick={() => handleEdit(education)} className="px-4 py-2 bg-yellow-500 text-white rounded">Edit</button>
                            <button onClick={() => handleDelete(education.Id)} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EducationAdmin;
