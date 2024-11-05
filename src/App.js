import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ProfessionalSummary from './components/ProfessionalSummary';
import Footer from './components/Footer';
import AdLayout from './components/Admin/AdLayout';
import WorkExperienceAdmin from './components/Admin/WorkExperienceAdmin';
import EducationAdmin from './components/Admin/EducationAdmin';
import ProjectsAdmin from './components/Admin/ProjectsAdmin';
import SkillsAdmin from './components/Admin/SkillsAdmin';
import CertificationsAdmin from './components/Admin/CertificationsAdmin';
import PersonalInfoAdmin from './components/Admin/PersonalInfoAdmin';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen font-roboto bg-gray-100">
        <Header />
        <main className="flex-grow p-6">
          <ProfessionalSummary />
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* Admin */}
            <Route path="/admin" element={<AdLayout />}>
              <Route path="workexperience" element={<WorkExperienceAdmin />} />
              <Route path="education" element={<EducationAdmin />} />
              <Route path="projects" element={<ProjectsAdmin />} />
              <Route path="skills" element={<SkillsAdmin />} />
              <Route path="certifications" element={<CertificationsAdmin />} />
              <Route path="personalinfo" element={<PersonalInfoAdmin />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
