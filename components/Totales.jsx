import React from 'react';
const Totales = ({ totalLensPrice, totalCoatingsPrice, totalTintPrice, totalGeneral }) => {
  return (
    <div className="flex flex-col bg-white px-6 py-8 pb-12 shadow-sm rounded border-b-0 border-b-gray-300">
      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 uppercase">Total Lens</span>
          <span className="text-2xl font-bold text-gray-600">${totalLensPrice}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 uppercase">Total coatings</span>
          <span className="text-2xl font-bold text-gray-600">${totalCoatingsPrice}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 uppercase">Total tint</span>
          <span className="text-2xl font-bold text-gray-600">${totalTintPrice}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 uppercase">Total general</span>
          <span className="text-2xl font-bold text-gray-600">${totalGeneral}</span>
        </div>
      </div>
    </div>
  );
};
export default Totales;