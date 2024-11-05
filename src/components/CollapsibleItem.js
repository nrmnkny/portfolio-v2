import React, { useState } from 'react';

const CollapsibleItem = ({ title, subtitle, dates, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border mb-4 transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        <p className="text-sm text-gray-500">{dates}</p>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-blue-600 mt-2 text-sm hover:underline focus:outline-none"
      >
        {isOpen ? 'Show Less' : 'Show More'}
      </button>

      {/* Description */}
      <div className={`transition-max-height duration-500 overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        {isOpen && (
          <div className="mt-4 text-gray-700 space-y-2">
            <ul className="list-disc pl-5">
              {description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollapsibleItem;
