import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CertificationsList = () => {
    const [certifications, setCertifications] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/certifications`);
                setCertifications(response.data);
            } catch (err) {
                setError(err);
            }
        };
        fetchCertifications();
    }, []);

    if (error) return <p>Error loading certifications: {error.message}</p>;

    return (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map(cert => (
                <div key={cert.Id} className="p-4 bg-white rounded-lg shadow-md border">
                    <h3 className="text-xl font-semibold mb-2">{cert.CertificationName}</h3>
                    <p className="text-gray-700">{cert.IssuingOrganization}</p>
                    <p className="text-gray-500 text-sm">
                        Issued on: {new Date(cert.IssueDate).toLocaleDateString()}
                    </p>
                    <a 
                        href={cert.CertificateLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-500 hover:underline mt-2 block"
                    >
                        View Certificate
                    </a>
                    {cert.ImageUrl ? (
                        <img 
                            src={cert.ImageUrl} 
                            alt={`Certificate for ${cert.CertificationName}`} 
                            className="w-full h-48 object-cover mt-4 rounded-lg"
                        />
                    ) : (
                        <div className="w-full h-48 flex items-center justify-center bg-gray-200 mt-4 rounded-lg">
                            <span className="text-gray-500">No image available</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CertificationsList;
