import React from 'react';
const Totales = ({ totalLensPrice, totalCoatingsPrice, totalTintPrice, totalGeneral }) => {
  // Convertir los valores a número en caso de que sean cadenas
  const lens = parseFloat(totalLensPrice);
  const coatings = parseFloat(totalCoatingsPrice);
  const tint = parseFloat(totalTintPrice);
  // Calcular el total modificado de lens restándole coatings y tint
  const totalLensModificado = (lens - coatings - tint).toFixed(2);
  return (
    <div className="flex flex-col bg-white px-6 py-8 pb-12 shadow-sm rounded border-b-0 border-b-gray-300">
      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 uppercase">Total Lens</span>
          <span className="text-2xl font-bold text-gray-600">${totalLensModificado}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 uppercase">Total Coatings</span>
          <span className="text-2xl font-bold text-gray-600">${totalCoatingsPrice}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 uppercase">Total Tint</span>
          <span className="text-2xl font-bold text-gray-600">${totalTintPrice}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 uppercase">Total General</span>
          <span className="text-2xl font-bold text-gray-600">${totalGeneral}</span>
        </div>
      </div>
    </div>
  );
};
export default Totales;