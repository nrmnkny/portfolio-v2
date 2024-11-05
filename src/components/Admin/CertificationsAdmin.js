import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CertificationsAdmin = () => {
    const [certifications, setCertifications] = useState([]);
    const [formData, setFormData] = useState({
        CertificationName: '',
        IssuingOrganization: '',
        IssueDate: '',
        CertificateLink: '',
        ImageUrl: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCertifications();
    }, []);

    const fetchCertifications = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/certifications`);
            setCertifications(response.data);
        } catch (err) {
            setError('Error fetching certifications');
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/certifications/${editingId}`, formData);
                setEditingId(null);
            } else {
                await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/certifications`, formData);
            }
            setFormData({ CertificationName: '', IssuingOrganization: '', IssueDate: '', CertificateLink: '', ImageUrl: '' });
            fetchCertifications();
        } catch (err) {
            setError('Error saving certification');
        }
    };

    const handleEdit = (certification) => {
        setFormData(certification);
        setEditingId(certification.Id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/certifications/${id}`);
            fetchCertifications();
        } catch (err) {
            setError('Error deleting certification');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage Certifications</h2>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleAddOrUpdate} className="mb-8 space-y-4 bg-gray-100 p-4 rounded">
                <input type="text" name="CertificationName" value={formData.CertificationName} onChange={handleInputChange} placeholder="Certification Name" className="w-full p-2 border rounded" required />
                <input type="text" name="IssuingOrganization" value={formData.IssuingOrganization} onChange={handleInputChange} placeholder="Issuing Organization" className="w-full p-2 border rounded" required />
                <input type="date" name="IssueDate" value={formData.IssueDate} onChange={handleInputChange} className="w-full p-2 border rounded" />
                <input type="url" name="CertificateLink" value={formData.CertificateLink} onChange={handleInputChange} placeholder="Certificate Link" className="w-full p-2 border rounded" />
                <input type="url" name="ImageUrl" value={formData.ImageUrl} onChange={handleInputChange} placeholder="Image URL" className="w-full p-2 border rounded" />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">{editingId ? 'Update' : 'Add'} Certification</button>
            </form>

            <ul className="space-y-4">
                {certifications.map((certification) => (
                    <li key={certification.Id} className="p-4 border rounded bg-white shadow-md">
                        <h3 className="font-semibold">{certification.CertificationName}</h3>
                        <p>{certification.IssuingOrganization}</p>
                        <p>{new Date(certification.IssueDate).toLocaleDateString()}</p>
                        <a href={certification.CertificateLink} target="_blank" rel="noopener noreferrer">Certificate Link</a>
                        <div className="space-x-2 mt-2">
                            <button onClick={() => handleEdit(certification)} className="px-4 py-2 bg-yellow-500 text-white rounded">Edit</button>
                            <button onClick={() => handleDelete(certification.Id)} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CertificationsAdmin;
