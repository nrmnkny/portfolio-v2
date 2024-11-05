// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 h-screen fixed top-0 left-0 p-4">
      <nav>
        <ul className="space-y-2 list-none">
          <li>
            <Link to="/education" className="block p-2 hover:bg-gray-600 rounded">
              Education
            </Link>
          </li>
          <li>
            <Link to="/workexperience" className="block p-2 hover:bg-gray-600 rounded">
              Work Experience
            </Link>
          </li>
          <li>
            <Link to="/projects" className="block p-2 hover:bg-gray-600 rounded">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/skills" className="block p-2 hover:bg-gray-600 rounded">
              Skills
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
