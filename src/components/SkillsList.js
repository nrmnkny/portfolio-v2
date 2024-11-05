import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SkillsList = () => {
    const [skillsData, setSkillsData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSkillsData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/skills`);
                setSkillsData(response.data);
            } catch (err) {
                setError(err);
            }
        };
        fetchSkillsData();
    }, []);

    if (error) return <p>Error loading skills: {error.message}</p>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border">
            {skillsData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skillsData.map((skill) => (
                        <div key={skill.Id} className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm">
                            <span className="text-lg font-medium text-gray-800">{skill.SkillName}</span>
                            <span className={`text-sm px-2 py-1 rounded-md ${
                                skill.SkillLevel === 'Expert' ? 'bg-green-200 text-green-800' :
                                skill.SkillLevel === 'Advanced' ? 'bg-blue-200 text-blue-800' :
                                skill.SkillLevel === 'Intermediate' ? 'bg-yellow-200 text-yellow-800' :
                                'bg-gray-200 text-gray-800'
                            }`}>
                                {skill.SkillLevel}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No skills found.</p>
            )}
        </div>
    );
};

export default SkillsList;
