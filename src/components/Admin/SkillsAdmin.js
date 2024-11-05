import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SkillsAdmin = () => {
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({ SkillName: '', SkillLevel: '' });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/skills`);
            setSkills(response.data);
        } catch (err) {
            setError('Error fetching skills');
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/skills/${editingId}`, formData);
                setEditingId(null);
            } else {
                await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/skills`, formData);
            }
            setFormData({ SkillName: '', SkillLevel: '' });
            fetchSkills();
        } catch (err) {
            setError('Error saving skill');
        }
    };

    const handleEdit = (skill) => {
        setFormData(skill);
        setEditingId(skill.Id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/skills/${id}`);
            fetchSkills();
        } catch (err) {
            setError('Error deleting skill');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage Skills</h2>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleAddOrUpdate} className="mb-8 space-y-4 bg-gray-100 p-4 rounded">
                <input type="text" name="SkillName" value={formData.SkillName} onChange={handleInputChange} placeholder="Skill Name" className="w-full p-2 border rounded" required />
                <input type="text" name="SkillLevel" value={formData.SkillLevel} onChange={handleInputChange} placeholder="Skill Level" className="w-full p-2 border rounded" required />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">{editingId ? 'Update' : 'Add'} Skill</button>
            </form>

            <ul className="space-y-4">
                {skills.map((skill) => (
                    <li key={skill.Id} className="p-4 border rounded bg-white shadow-md">
                        <div className="flex justify-between">
                            <span>{skill.SkillName}</span>
                            <span>{skill.SkillLevel}</span>
                        </div>
                        <div className="space-x-2 mt-2">
                            <button onClick={() => handleEdit(skill)} className="px-4 py-2 bg-yellow-500 text-white rounded">Edit</button>
                            <button onClick={() => handleDelete(skill.Id)} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SkillsAdmin;
