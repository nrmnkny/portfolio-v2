import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExperienceList = () => {
  const [experienceData, setExperienceData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/experience`);
        setExperienceData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchExperienceData();
  }, []);

  if (error) return <p>Error loading experience data: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4">Experience</h2>
      {experienceData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experienceData.map((exp) => (
            <div key={exp.Id} className="p-4 bg-white shadow-md rounded-lg">
              <p className="text-gray-600">{new Date(exp.StartDate).toLocaleDateString()} - {exp.EndDate ? new Date(exp.EndDate).toLocaleDateString() : 'Present'}</p>
              <h3 className="text-xl font-semibold">{exp.Position}</h3>
              <p className="italic">{exp.Company} - {exp.Location}</p>
              <p className="mt-2">{exp.Description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No experience records found.</p>
      )}
    </div>
  );
};

export default ExperienceList;
