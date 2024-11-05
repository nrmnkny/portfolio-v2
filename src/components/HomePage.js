import React from 'react';
import EducationList from './EducationList';
import WorkExperienceList from './WorkExperienceList';
import SkillsList from './SkillsList';
import ProjectsList from './ProjectsList';
import CertificationsList from './CertificationsList';

const HomePage = () => (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
        <section className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 relative after:content-[''] after:block after:w-full after:h-1 after:bg-gray-300 after:mt-1">
                Work Experience
            </h2>
            <WorkExperienceList />
        </section>
        
        <section className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 relative after:content-[''] after:block after:w-full after:h-1 after:bg-gray-300 after:mt-1">
                Education
            </h2>
            <EducationList />
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 relative after:content-[''] after:block after:w-full after:h-1 after:bg-gray-300 after:mt-1">
                Skills
            </h2>
            <SkillsList />
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 relative after:content-[''] after:block after:w-full after:h-1 after:bg-gray-300 after:mt-1">
                Projects
            </h2>
            <ProjectsList />
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 relative after:content-[''] after:block after:w-full after:h-1 after:bg-gray-300 after:mt-1">
                Certifications
            </h2>
            <CertificationsList />
        </section>
    </div>
);

export default HomePage;
