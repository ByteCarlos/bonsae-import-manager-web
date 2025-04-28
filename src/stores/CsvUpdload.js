import { defineStore } from 'pinia';
import { ref } from 'vue';
import { parse } from 'papaparse';

export const useCsvStore = defineStore('csv', () => {
    const file = ref(null);
    const tableData = ref([]);
    const columns = ref([]);
    const loading = ref(false);  // Controla o estado de carregamento
  
    const processFile = (file) => {
      loading.value = true;  // Inicia o carregamento
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = e.target.result;
        console.log('CSV raw data:', csv);  // Verifica o conteúdo do CSV
  
        parse(csv, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            console.log('Parsed CSV result:', result);  // Verifique o resultado do parsing
            tableData.value = result.data.filter(row => Object.values(row).some(cell => cell));  // Filtra linhas vazias
            columns.value = result.meta.fields;
  
            // Log para verificar a estrutura de tableData
            console.log('Columns:', columns.value);
            console.log('TableData:', tableData.value);
  
            loading.value = false;  // Finaliza o carregamento
          },
          error: (error) => {
            console.error('CSV Parsing error:', error);
            loading.value = false;
          },
        });
      };
      reader.readAsText(file);
    };
  
    const handleFileUpload = (event) => {
      const selectedFile = event.target.files[0];
      if (!selectedFile) return;
  
      file.value = selectedFile;
      processFile(selectedFile);
    };
  
    const handleFileDrop = (event) => {
      event.preventDefault();
      const droppedFile = event.dataTransfer.files[0];
      if (!droppedFile) return;
  
      file.value = droppedFile;
      processFile(droppedFile);
    };
  
    return {
      file,
      tableData,
      columns,
      loading,  // Expondo o estado de carregamento
      handleFileUpload,
      handleFileDrop,
    };
  });
  
  
  
