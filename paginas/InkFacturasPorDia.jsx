import React, { useState, useEffect } from 'react';
import { FaDownload, FaSpinner } from 'react-icons/fa';
import { PDFDownloadLink } from '@react-pdf/renderer';
import clienteAxios from '../config/clienteAxios';
import { format, parseISO } from 'date-fns';
import Pdf from '../components/Pdf';
import Pdf2 from '../components/Pdf2';
import TablaFacturasPorDia from '../components/tables/TablaFacturasPorDia';
import Totales from '../components/Totales';
const InkFacturasPorDia = () => {
  // Array con los nombres de los meses en español
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  // Estados locales: aquí calculamos el mes anterior al actual
  const [mes, setMes] = useState(() => {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1; // getMonth() es 0-indexado
    const mesAnterior = mesActual === 1 ? 12 : mesActual - 1;
    // Aseguramos formato de dos dígitos
    return mesAnterior < 10 ? `0${mesAnterior}` : `${mesAnterior}`;
  });
  const [totalesPorDia, setTotalesPorDia] = useState([]);
  const [pdfData, setPdfData] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [columnaBusqueda, setColumnaBusqueda] = useState("fecha");
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 8;
  const [cargando, setCargando] = useState(false);
  // Mapeo de columnas para el filtrado
  const mapeoColumnas = {
    fecha: "fecha",
    coatingsTotal: "CoatingsPrice",
    tintTotal: "TintPrice",
    lensTotal: "LensPrice"
  };
  // Manejadores para select e input de búsqueda
  const manejarCambioMes = (e) => {
    setMes(e.target.value);
    setPaginaActual(1);
  };
  const manejarCambioBusqueda = (e) => {
    setTextoBusqueda(e.target.value);
    setPaginaActual(1);
  };
  const manejarCambioColumnaBusqueda = (e) => {
    setColumnaBusqueda(e.target.value);
    setPaginaActual(1);
  };
  // Función para obtener registros del mes y agruparlos por día
  const obtenerYAgruparRegistros = async () => {
    try {
      setCargando(true);
      const { data } = await clienteAxios(`/orders/get-month/${mes}`);
      // Agrupar por día usando la fecha formateada "yyyy-MM-dd"
      const agrupados = data.reduce((acc, registro) => {
        const fechaISO = parseISO(registro.ShipDate);
        const fechaFormateada = format(fechaISO, "yyyy-MM-dd");
        if (!acc[fechaFormateada]) {
          acc[fechaFormateada] = {
            CoatingsPrice: 0,
            TintPrice: 0,
            LensPrice: 0,
          };
        }
        acc[fechaFormateada].CoatingsPrice += parseFloat(registro.CoatingsPrice || 0);
        acc[fechaFormateada].TintPrice += parseFloat(registro.TintPrice || 0);
        acc[fechaFormateada].LensPrice += parseFloat(registro.LensPrice || 0);
        return acc;
      }, {});
      const totales = Object.keys(agrupados).map(fecha => ({
        fecha,
        ...agrupados[fecha],
      }));
      totales.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
      setTotalesPorDia(totales);
      setPdfData(totales);
    } catch (error) {
      console.error("Error al obtener los registros:", error);
    } finally {
      setCargando(false);
    }
  };
  useEffect(() => {
    obtenerYAgruparRegistros();
  }, [mes]);
  // Filtrado de registros según texto y columna
  const registrosFiltrados = totalesPorDia.filter((registro) => {
    if (textoBusqueda.trim() === "") return true;
    const key = mapeoColumnas[columnaBusqueda];
    if (registro[key] !== undefined) {
      return String(registro[key]).toLowerCase().includes(textoBusqueda.toLowerCase());
    }
    return false;
  });
  // Paginación
  const totalPaginas = Math.ceil(registrosFiltrados.length / registrosPorPagina);
  const indiceUltimoRegistro = paginaActual * registrosPorPagina;
  const indicePrimerRegistro = indiceUltimoRegistro - registrosPorPagina;
  const registrosActuales = registrosFiltrados.slice(indicePrimerRegistro, indiceUltimoRegistro);
  
  const paginar = (nuevaPagina) => {
    if (nuevaPagina > 0 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };
  // Cálculo de totales generales
  const totalCoatingsPrice = totalesPorDia.reduce((acc, item) => acc + item.CoatingsPrice, 0).toFixed(2);
  const totalTintPrice = totalesPorDia.reduce((acc, item) => acc + item.TintPrice, 0).toFixed(2);
  const totalLensPrice = totalesPorDia.reduce((acc, item) => acc + item.LensPrice, 0).toFixed(2);
  const totalGeneral = totalLensPrice;
  // Obtiene el nombre del mes a partir del valor numérico almacenado en el estado "mes"
  const nombreMes = monthNames[parseInt(mes, 10) - 1];
  return (
    <div className="space-y-6">
      {/* Encabezado: título, información del mes y botones de descarga PDF */}
      <div className="flex flex-col items-center justify-center bg-white py-6 shadow-sm rounded border-b-0 border-b-gray-300">
        <h1 className="text-3xl font-bold mb-2 uppercase text-gray-500">ink - total por dia</h1>
        <p className="text-sm text-gray-500 mb-4">
          Mostrando información del mes de ( {nombreMes} )
        </p>
        <div className="flex space-x-4">
          <PDFDownloadLink
            document={<Pdf data={pdfData} />}
            fileName={`ventas_detallado_${mes}.pdf`}
            className="flex items-center"
          >
            {({ loading }) =>
              loading ? (
                <button
                  disabled
                  className="flex items-center bg-gray-400 text-white px-4 py-1 rounded cursor-not-allowed"
                >
                  <FaSpinner className="animate-spin mr-2" />
                  <span>Espere...</span>
                </button>
              ) : (
                <button
                  className="flex items-center bg-white text-blue-500 border border-blue-500 px-4 py-1 rounded hover:bg-blue-500 hover:text-white focus:outline-none transition duration-500"
                >
                  <FaDownload className="mr-2" />
                  Descargar PDF Detallado
                </button>
              )
            }
          </PDFDownloadLink>
          <PDFDownloadLink
            document={<Pdf2 data={pdfData} />}
            fileName={`ventas_globales_${mes}.pdf`}
            className="flex items-center"
          >
            {({ loading }) =>
              loading ? (
                <button
                  disabled
                  className="flex items-center bg-gray-400 text-white px-4 py-1 rounded cursor-not-allowed"
                >
                  <FaSpinner className="animate-spin mr-2" />
                  <span>Espere...</span>
                </button>
              ) : (
                <button
                  className="flex items-center bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-white hover:text-gray-600 focus:outline-none transition duration-500"
                >
                  <FaDownload className="mr-2" />
                  Descargar PDF Global
                </button>
              )
            }
          </PDFDownloadLink>
        </div>
      </div>
      {/* Sección de Totales */}
      <Totales 
        totalLensPrice={totalLensPrice} 
        totalCoatingsPrice={totalCoatingsPrice} 
        totalTintPrice={totalTintPrice} 
        totalGeneral={totalGeneral} 
      />
      {/* Componente TablaFacturasPorDia */}
      <TablaFacturasPorDia
        mes={mes}
        onMesChange={manejarCambioMes}
        textoBusqueda={textoBusqueda}
        onBusquedaChange={manejarCambioBusqueda}
        columnaBusqueda={columnaBusqueda}
        onColumnaBusquedaChange={manejarCambioColumnaBusqueda}
        cargando={cargando}
        registrosActuales={registrosActuales}
        totalRegistros={registrosFiltrados.length}
        indicePrimerRegistro={indicePrimerRegistro}
        indiceUltimoRegistro={indiceUltimoRegistro}
        totalPaginas={totalPaginas}
        paginaActual={paginaActual}
        paginar={paginar}
      />
    </div>
  );
};
export default InkFacturasPorDia;