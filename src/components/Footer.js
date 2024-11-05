import React from 'react';

const Footer = () => (
    <footer className="bg-white text-black py-8 mt-12 border-t border-gray-300">
        <div className="container mx-auto flex flex-col items-center space-y-6 md:flex-row md:space-y-0 md:justify-center md:space-x-12">
            <div className="text-center">
                <a 
                    href="https://3amcast.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-black hover:underline transition duration-300 text-lg font-semibold"
                >
                    Writing
                </a>
                <p className="text-gray-600 text-xs mt-1">Crafting words, & visuals</p>
            </div>
            <div className="text-center">
                <a 
                    href="https://rhythmic.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-black hover:underline transition duration-300 text-lg font-semibold"
                >
                    Music
                </a>
                <p className="text-gray-600 text-xs mt-1"> Music and visuals.</p>
            </div>
            
        </div>
        <div className="text-center text-sm text-gray-600 mt-6">
            © 2024 Norman Kenya. All rights reserved.
        </div>
    </footer>
);

export default Footer;
