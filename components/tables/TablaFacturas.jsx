import React from 'react';
import { FaSpinner } from 'react-icons/fa';
const TablaFacturas = ({
  mes,
  onMesChange,
  textoBusqueda,
  onBusquedaChange,
  columnaBusqueda,
  onColumnaBusquedaChange,
  cargando,
  registrosActuales,
  totalRegistros,
  indicePrimerRegistro,
  indiceUltimoRegistro,
  totalPaginas,
  paginaActual,
  paginar
}) => {
  return (
    <div className="bg-white py-5 px-14 rounded overflow-x-auto" style={{ minHeight: '300px' }}>
      {/* Sección de selectores: Mes, búsqueda y columna de búsqueda */}
      <div className="mb-4 flex items-center justify-between">
        {/* Selector de mes */}
        <div className="flex items-center space-x-2">
          <label htmlFor="mes" className="text-sm text-gray-600">Mes:</label>
          <select
            id="mes"
            value={mes}a
            onChange={onMesChange}
            className="bg-gray-50 text-gray-600 text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-1.5"
          >
            <option value="01">Enero</option>
            <option value="02">Febrero</option>
            <option value="03">Marzo</option>
            <option value="04">Abril</option>
            <option value="05">Mayo</option>
            <option value="06">Junio</option>
            <option value="07">Julio</option>
            <option value="08">Agosto</option>
            <option value="09">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
        </div>
        {/* Buscador y selector de columna */}
        <div className="flex items-center space-x-2">
          <label htmlFor="busqueda" className="text-sm text-gray-600">Buscar:</label>
          <input
            type="text"
            id="busqueda"
            value={textoBusqueda}
            onChange={onBusquedaChange}
            placeholder="Buscar..."
            className="bg-gray-50 text-gray-600 text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-1.5"
          />
          <select
            value={columnaBusqueda}
            onChange={onColumnaBusquedaChange}
            className="bg-gray-50 text-gray-600 text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-1.5"
          >
            <option value="fecha">Fecha</option>
            <option value="patient">Patient</option>
            <option value="coatingsTotal">Coatings Total</option>
            <option value="tintTotal">Tint Total</option>
            <option value="poder">Poder</option>
            <option value="tat">TAT</option>
            <option value="lensTotal">Lens Total</option>
          </select>
        </div>
      </div>
      
      {/* Tabla de datos o indicador de carga */}
      {cargando ? (
        <div className="flex items-center justify-center py-20">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
      ) : (
        <table className="min-w-full shadow-lg rounded-md overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 border-b border-gray-200 text-center">Fecha</th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">Patient</th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">Coatings Total</th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">Tint Total</th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">Poder</th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">TAT</th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">Lens Total</th>
            </tr>
          </thead>
          <tbody className="text-center text-gray-600">
            {registrosActuales.length > 0 ? (
              registrosActuales.map((registro, indice) => {
                const precioCoatings = parseFloat(registro.CoatingsPrice || 0);
                const precioTint = parseFloat(registro.TintPrice || 0);
                const precioLens = parseFloat(registro.LensPrice || 0);
                return (
                  <tr key={indice} className="odd:bg-blue-50 even:bg-white hover:bg-blue-100">
                    <td className="px-4 py-2 border-b border-gray-100">{registro.ShipDate}</td>
                    <td className="px-4 py-2 border-b border-gray-100">{registro.Patient || 'N/A'}</td>
                    <td className="px-4 py-2 border-b border-gray-100">${precioCoatings.toFixed(2)}</td>
                    <td className="px-4 py-2 border-b border-gray-100">${precioTint.toFixed(2)}</td>
                    <td className="px-4 py-2 border-b border-gray-100">{registro.Poder || 'N/A'}</td>
                    <td className="px-4 py-2 border-b border-gray-100">{parseFloat(registro.TAT || 0).toFixed(2)}</td>
                    <td className="px-4 py-2 border-b border-gray-100">${precioLens.toFixed(2)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-gray-500">No hay registros para este mes</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {/* Información y paginación */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Mostrando{" "}
          {registrosActuales.length > 0
            ? `${indicePrimerRegistro + 1} - ${Math.min(indiceUltimoRegistro, totalRegistros)}`
            : "0"}{" "}
          de {totalRegistros} registros
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => paginar(paginaActual - 1)}
            className={`px-3 py-1 border border-gray-300 rounded text-sm transition duration-500 ${
              paginaActual === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-500 hover:text-white"
            }`}
            disabled={paginaActual === 1}
          >
            Atrás
          </button>
          {Array.from({ length: totalPaginas }, (_, idx) => (
            <button
              key={idx}
              onClick={() => paginar(idx + 1)}
              className={`px-3 py-1 border border-gray-300 rounded text-sm transition duration-500 ${
                paginaActual === idx + 1 ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => paginar(paginaActual + 1)}
            className={`px-3 py-1 border border-gray-300 rounded text-sm transition duration-500 ${
              paginaActual >= totalPaginas ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-500 hover:text-white"
            }`}
            disabled={paginaActual >= totalPaginas}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};
export default TablaFacturas;