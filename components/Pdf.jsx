import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { parseISO, format } from 'date-fns';
import { enUS } from 'date-fns/locale';
const styles = StyleSheet.create({
  head: {
    backgroundColor: '#04acec',
    height: '15',
    width: '100%',
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
    marginLeft: '40px',
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
  section: { marginBottom: 10 },
  // Se crea una tabla con 5 columnas, cada una con ancho de 20%
  table: { 
    display: "table", 
    width: "auto", 
    margin: "40px 20px" 
  },
  tableRow: { 
    flexDirection: "row", 
    flexWrap: 'nowrap' 
  },
  tableColHeader: { 
    width: "20%", 
    borderStyle: 'dashed', 
    borderWidth: 0.5, 
    backgroundColor: "#04acec", 
    padding: '10', 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  tableCol: { 
    width: "20%", 
    borderStyle: "dashed", 
    borderWidth: 0.5 
  },
  tableCellHeader: { 
    margin: "auto", 
    marginTop: 5, 
    fontSize: 12, 
    fontWeight: 'extrabold' 
  },
  tableCell: { 
    margin: "auto", 
    marginTop: 5, 
    fontSize: 10, 
    padding: '10', 
    color: '#5b5969'
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
const Pdf = ({ data }) => {
  // Agrupar la data por día (formateada como 'yyyy-MM-dd')
  const groupedData = data.reduce((acc, item) => {    
    const date = format(parseISO(item.fecha), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});
  
  // Calcular totales diarios, incluyendo el total de click_fee
  const dailySums = Object.keys(groupedData).map(date => {
    const items = groupedData[date];
    const totalLensPrice = items.reduce((sum, item) => sum + item.LensPrice, 0);
    const totalCoatingsPrice = items.reduce((sum, item) => sum + item.CoatingsPrice, 0);
    const totalTintPrice = items.reduce((sum, item) => sum + item.TintPrice, 0);
    const totalClickFee = items.reduce((sum, item) => sum + item.click_fee, 0);
    return {
      date,
      totalLensPrice,
      totalCoatingsPrice,
      totalTintPrice,
      totalClickFee,
    };
  });
  
  const formattedDate = data.length > 0 
    ? format(parseISO(data[0].fecha), 'yyyy-MM', { locale: enUS }) 
    : '';
    
  const monthYearText = data.length > 0 
    ? `The values represent the total sum of sales for the month of ${format(parseISO(data[0].fecha), 'MMMM', { locale: enUS })} in the year ${format(parseISO(data[0].fecha), 'yyyy')}.`
    : 'The values represent the total sum of sales.';
    
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View style={styles.head}></View>
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
        <View style={styles.bb2}>
          <View>
            <Text style={[styles.prueba__p, styles.padding, styles.mt, styles.mb, styles.ml]}>
              {monthYearText}
            </Text>
          </View>
          {/* Tabla con 5 columnas: Fecha, Coatings Totals, Tint Totals, Lens Totals y Click Fee Totals */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Fecha</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Coatings Totals</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Tint Totals</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Lens Totals</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Click Fee Totals</Text>
              </View>
            </View>
            {dailySums.map((sum, index) => (
              <View style={styles.tableRow} key={index} wrap={false}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{sum.date}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>${sum.totalCoatingsPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>${sum.totalTintPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>${sum.totalLensPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>${sum.totalClickFee.toFixed(2)}</Text>
                </View>
              </View>
            ))}
          </View>
          {/* Sección de totales generales */}
          <View style={styles.totalSection}>
            <View>
              <Text style={styles.totalText}>Grand Total Coatings:</Text>
              <Text style={styles.totalText}>Grand Total Tint:</Text>
              <Text style={styles.totalText}>Grand Total Lens:</Text>
              <Text style={styles.totalText}>Grand Total Click Fee:</Text>
            </View>
            <View>
              <Text style={styles.totalText}>
                ${dailySums.reduce((sum, item) => sum + item.totalCoatingsPrice, 0).toFixed(2)}
              </Text>
              <Text style={styles.totalText}>
                ${dailySums.reduce((sum, item) => sum + item.totalTintPrice, 0).toFixed(2)}
              </Text>
              <Text style={styles.totalText}>
                ${dailySums.reduce((sum, item) => sum + item.totalLensPrice, 0).toFixed(2)}
              </Text>
              <Text style={styles.totalText}>
                ${dailySums.reduce((sum, item) => sum + item.totalClickFee, 0).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default Pdf;