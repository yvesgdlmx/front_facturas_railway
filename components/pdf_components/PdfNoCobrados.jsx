import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { parseISO, format } from 'date-fns';
import { enUS } from 'date-fns/locale';
// Estilos para el PDF, se actualiza el ancho de las columnas a 12.5% para incluir la columna "Click Fee"
const styles = StyleSheet.create({
  header__flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  header__img: {
    width: '200px'
  },
  header_campo__flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  header__h2: {
    fontSize: '30px',
    fontWeight: 'bold'
  },
  header__p: {
    fontSize: '20px',
  },
  prueba: {
    paddingHorizontal: '20',
    marginTop: '20'
  },
  prueba__flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: '10px'
  },
  prueba__img: {
    width: '150px',
  },
  prueba__datos: {
    marginLeft: '20px',
  },
  prueba__h2: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#5b5969',
  },
  prueba__h1: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#5b5969',
  },
  prueba__p: {
    fontSize: '12px',
    color: '#696969',
  },
  prueba__span: {
    fontWeight: 'bold',
  },
  border: {
    borderBottom: '0.5px solid #696969',
    marginBottom: '10px',
    paddingBottom: '10px',
  },
  padding: {
    paddingHorizontal: '20px',
  },
  mt: {
    marginTop: '20px',
  },
  mb: {
    marginBottom: '20px',
  },
  ml: {
    marginLeft: '112px',
  },
  prueba_campo__flex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '45%',
    gap: '5',
    marginLeft: '20',
  },
  bb: {
    borderBottom: '0.5px solid #696969',
    paddingBottom: '10px',
  },
  bb2: {
    borderBottom: '0.5px solid #696969',
    paddingBottom: '10px',
    marginHorizontal: '20px'
  },
  position:  {
    position: 'relative',
    bottom: '7.5px'
  },
  position2:  {
    position: 'relative',
    top: '7.5px'
  },
  page: {
    padding: 10,
    backgroundColor: '#FFF'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderRightWidth: 0,
    borderBottomWidth: 0,
    margin: 'auto', // Centrar la tabla horizontalmente
  },
  tableRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  // Se ajusta a 12.5% para que 8 columnas sumen el 100%
  tableColHeader: {
    width: '12.5%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    backgroundColor: '#04acec',
    textAlign: 'center',
    padding: 10,
    color: '#fff',
    fontWeight: 'bold'
  },
  tableCol: {
    width: '12.5%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    textAlign: 'center',
    padding: 5,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 'extrabold',
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  totalSection: {
    marginTop: 10,
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '20',
    borderStyle: 'solid',
    borderWidth: '0.5',
    padding: '10',
    borderRadius: '5px',
    marginBottom: '20px'
  },
  totalText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: '25',
    color: '#5b5969'
  },
});
const PdfNoCobrados = ({ data }) => {
  // Calcular totales
  const totalLensPrice = data.reduce((acc, registro) => acc + parseFloat(registro.LensPrice || 0), 0).toFixed(2);
  const totalCoatingsPrice = data.reduce((acc, registro) => acc + parseFloat(registro.CoatingsPrice || 0), 0).toFixed(2);
  const totalTintPrice = data.reduce((acc, registro) => acc + parseFloat(registro.TintPrice || 0), 0).toFixed(2);
  const totalClickFee = data.reduce((acc, registro) => acc + parseFloat(registro.click_fee || 0), 0).toFixed(2);
  // Verificar si data no está vacío y obtener la fecha del primer registro
  let formattedDate = '';
  if (data.length > 0 && data[0].ShipDate) {
    const firstRecordDate = parseISO(data[0].ShipDate);
    formattedDate = format(firstRecordDate, 'yyyy-MM', { locale: enUS });
  }
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado con logo e información de la fecha */}
        <View style={styles.prueba}>
          <View style={styles.border}>
            <View style={styles.prueba__flex}>
              <Image src="/img/logo_real.png" style={styles.prueba__img} />
              <View style={styles.prueba__datos}>
                <Text style={styles.prueba__p}>
                  Order Date: <Text style={styles.prueba__span}>{formattedDate}</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Texto descriptivo */}
        <View>
          <Text style={[styles.prueba__p, styles.padding, styles.mt, styles.mb, styles.ml]}>
            {data.length > 0 && data[0].ShipDate 
              ? `The following values represent the sales data for ${format(parseISO(data[0].ShipDate), 'MMMM', { locale: enUS })} ${format(parseISO(data[0].ShipDate), 'yyyy')}.`
              : 'No data available.'}
          </Text>
        </View>
        {/* Tabla de datos con la nueva columna "Click Fee" */}
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Date</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Patient</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Coatings</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Tint</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Poder</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>TAT</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Lens Total</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Click Fee</Text>
              </View>
            </View>
            {data.map((registro, index) => {
              const lensPrice = parseFloat(registro.LensPrice || 0);
              const coatingsPrice = parseFloat(registro.CoatingsPrice || 0);
              const tintPrice = parseFloat(registro.TintPrice || 0);
              const clickFee = parseFloat(registro.click_fee || 0);
              return (
                <View style={styles.tableRow} key={index} wrap={false}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{registro.ShipDate}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{registro.Patient}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>${coatingsPrice.toFixed(2)}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>${tintPrice.toFixed(2)}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{registro.Poder}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{registro.TAT}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>${lensPrice.toFixed(2)}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>${clickFee.toFixed(2)}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        {/* Sección de totales, incluyendo Total Click Fee */}
        <View style={styles.totalSection}>
          <Text style={styles.totalText}>Total Coatings: ${totalCoatingsPrice} -</Text>
          <Text style={styles.totalText}>Total Tint: ${totalTintPrice} -</Text>
          <Text style={styles.totalText}>Total Lens: ${totalLensPrice} -</Text>
          <Text style={styles.totalText}>Total Click Fee: ${totalClickFee}</Text>
        </View>
      </Page>
    </Document>
  );
};
export default PdfNoCobrados;