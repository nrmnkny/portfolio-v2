import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EducationList = () => {
    const [educationData, setEducationData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEducationData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/education`);
                setEducationData(response.data);
            } catch (err) {
                setError(err);
            }
        };
        fetchEducationData();
    }, []);

    if (error) return <p>Error loading education data: {error.message}</p>;

    return (
        <div className="p-4">
        {educationData.length > 0 ? (
            educationData.map((edu) => (
                <div key={edu.Id} className="mb-6 p-4 rounded-lg shadow-md bg-white flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-semibold">{edu.Degree}</h3>
                        <p className="text-md font-medium text-gray-700">{edu.Institution}</p>
                        <p className="text-gray-600">{edu.Description}</p>
                    </div>
                    <div className="text-gray-500 text-sm text-right">
                        <p>{new Date(edu.StartDate).toLocaleDateString()}</p>
                        <p>{edu.EndDate ? new Date(edu.EndDate).toLocaleDateString() : 'Present'}</p>
                    </div>
                </div>
            ))
        ) : (
            <p>No education records found.</p>
        )}
    </div>
    );
};

export default EducationList;
