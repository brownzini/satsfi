import React from 'react';
import { parse } from 'json2csv';
import { saveAs } from 'file-saver';
import { ExportTitleArea } from '../Card/styles';
import { useData } from '@/contexts/useData';

const CSVConverter = () => {

  const { data } = useData();

  const generateFileName = (BrazilDate: boolean = false) => {
        const now = new Date();
        const isMonth = (now.getMonth()+1 < 10) ? '0'+(now.getMonth()+1) : now.getMonth()+1; 
        
        if(!BrazilDate) {
            return now.getFullYear()+'-'+isMonth+'-'+now.getDate()+'.csv';
        } else {
            return now.getDate()+'-'+isMonth+'-'+now.getFullYear()+'.csv';
        }
  }

  const convertToCSV = () => {
    try {
      const fields = ['date', 'value']; // Especificando os campos para os cabeçalhos
      const opts = { fields };
      const csv = parse(data.donations, opts);
      const csvBlob = new Blob([csv], { type: 'text/csv;charset=utf-8' });

      const fileName = 'donations_'+generateFileName(true);

      saveAs(csvBlob, fileName);

    } catch (error) {
      console.error('Error converting to CSV:', error);
    }
  };

  return <ExportTitleArea onClick={convertToCSV}>Exportar</ExportTitleArea>
  
};

export default CSVConverter;