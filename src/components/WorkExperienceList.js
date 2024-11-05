import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CollapsibleItem from './CollapsibleItem';

const WorkExperienceList = () => {
  const [experienceData, setExperienceData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/workexperience`);
        setExperienceData(response.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchExperienceData();
  }, []);

  if (error) return <p>Error loading work experience data: {error.message}</p>;

  return (
    <div className="p-4">
      {experienceData.length > 0 ? (
        experienceData.map((exp) => (
          <CollapsibleItem
            key={exp.Id}
            title={exp.Position}
            subtitle={`${exp.Company}, ${exp.Location}`}
            dates={`${new Date(exp.StartDate).toLocaleDateString()} - ${exp.EndDate ? new Date(exp.EndDate).toLocaleDateString() : 'Present'}`}
            description={Array.isArray(exp.Description) 
              ? exp.Description 
              : (exp.Description.includes('. ') 
                  ? exp.Description.split('. ') 
                  : exp.Description.split('.')
                )}
          />
        ))
      ) : (
        <p>No work experience records found.</p>
      )}
    </div>
  );
};

export default WorkExperienceList;
