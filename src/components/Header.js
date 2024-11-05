import React from 'react';
import { FaPhone, FaEnvelope, FaLinkedin } from 'react-icons/fa';

const Header = () => (
    <header className="bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white py-8 shadow-md border-b border-gray-700">
        <div className="container mx-auto flex flex-col items-center space-y-6">
            {/* Profile */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                    src="https://res.cloudinary.com/dzbghf4hg/image/upload/v1730392650/PHOTOGRAPH-photoaidcom-greyscale_qorh55.png"
                    alt="Profile"
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Name & Title */}
            <h1 className="text-2xl font-extrabold tracking-wider">Norman Kenya</h1>
            <p className="text-lg font-light text-gray-300 italic">Full Stack JavaScript Developer</p>

            {/* Contact */}
            <div className="flex space-x-8 text-gray-400">
                <a href="tel:+254705532531" className="hover:text-white transition duration-300">
                    <FaPhone size={24} />
                </a>
                <a href="mailto:normane7@icloud.com.com" className="hover:text-white transition duration-300">
                    <FaEnvelope size={24} />
                </a>
                <a href="https://www.linkedin.com/in/norman-kenya-b54058295/" className="hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin size={24} />
                </a>
            </div>
        </div>
    </header>
);

export default Header;
