import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdLayout = () => (
    <div className="flex min-h-screen">
        <aside className="w-64 bg-gray-800 text-white p-6">
            <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
            <nav className="space-y-4">
                <Link to="/admin/workexperience" className="block text-indigo-300 hover:text-white">Work Experience</Link>
                <Link to="/admin/education" className="block text-indigo-300 hover:text-white">Education</Link>
                <Link to="/admin/projects" className="block text-indigo-300 hover:text-white">Projects</Link>
                <Link to="/admin/skills" className="block text-indigo-300 hover:text-white">Skills</Link>
                <Link to="/admin/certifications" className="block text-indigo-300 hover:text-white">Certifications</Link>
                <Link to="/admin/personalinfo" className="block text-indigo-300 hover:text-white">Personal Info</Link>
            </nav>
        </aside>
        <main className="flex-grow p-8 bg-white">
            <Outlet />
        </main>
    </div>
);

export default AdLayout;
