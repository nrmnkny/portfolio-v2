import React from 'react';
import { summaryText } from '../config/data';

const ProfessionalSummary = () => (
    <section className="bg-white text-black py-12 px-8 shadow-lg border border-gray-200 my-12 mx-auto max-w-3xl rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6 border-b-2 border-gray-300 pb-2"> Summary</h2>
        <p className="text-lg text-black leading-relaxed text-center">
            {summaryText}
        </p>
    </section>
);

export default ProfessionalSummary;
