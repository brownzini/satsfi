import React, { useState } from 'react';

import Papa from 'papaparse';

import { 
  Container, 
  Input, 
  Label 
} from './styles';

//Contexts
import { useMessage } from '@/contexts/useMessage';
import { useData } from '@/contexts/useData';

interface Prop {
  setDonates: React.Dispatch<any>;
}

const CSVImporter = ({ setDonates }:Prop) => {
  
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const { setData } = useData();
  const { dispatchMessage } = useMessage();

  const handleFileUpload = (event:any) => {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = file.name;

      if (!fileName.endsWith('.csv')) {
           dispatchMessage('[ERRO]: Por favor, envie apenas arquivos CSV.', false);
           return;
      }

      Papa.parse(file, {
        complete: (result:any) => {
      
          const donate:any = result.data[0];
          
          setDonates((prevData:any) => [...prevData, donate]);
          setData(prevData => ({
              ...prevData,
              donations: [...prevData.donations || [], donate]
          }));

          setFileInputKey(Date.now());
          dispatchMessage('[SUCESSO]: Dados importados', true);
        },
        header: true,
      });
    }
  };

  return (
    <Container className="upload-button">
      <Input 
        type="file" 
        multiple 
        key={fileInputKey}
        className="hidden-input"
        onChange={handleFileUpload} 
      />
        <Label 
           className="flex"
           htmlFor="fileInput"
        >
          Importar
        </Label>
      </Container>
  );
};

export default CSVImporter;