<script setup>
import { ref } from 'vue';
import { parse } from 'papaparse';
import axios from 'axios';

const file = ref(null);
const tableData = ref([]);
const columns = ref([]);

const handleFileUpload = (event) => {
  const selectedFile = event.target.files[0];
  if (!selectedFile) return;
  file.value = selectedFile;

  const reader = new FileReader();
  reader.onload = (e) => {
    const csv = e.target.result;
    parse(csv, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        tableData.value = result.data;
        columns.value = result.meta.fields;
      },
    });
  };
  reader.readAsText(selectedFile);
};

const submitData = async () => {
  try {
    const response = await axios.post(`${import.meta.env.API_URL}/import/csv`, {
      data: tableData.value,
    });
    alert('Dados importados com sucesso!');
    console.log(response.data);
  } catch (error) {
    console.error('Erro ao importar:', error);
  }
};
</script>

<template>
  <div>
    <h1>Importação de Dados via CSV</h1>

    <input type="file" @change="handleFileUpload" accept=".csv" />

    <table v-if="tableData.length">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col">{{ col }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in tableData" :key="index">
          <td v-for="col in columns" :key="col">{{ row[col] }}</td>
        </tr>
      </tbody>
    </table>

    <button @click="submitData">Importar</button>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}
input {
  display: block;
  margin: 10px auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f4f4f4;
}
button {
  display: block;
  margin: 10px auto;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
