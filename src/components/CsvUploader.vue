<script setup>
import { ref } from 'vue';
import { parse } from 'papaparse';

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
</script>

<template>
  <div class="csv-uploader">
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
  </div>
</template>

<style scoped>
.csv-uploader {
  text-align: center;
  margin-top: 20px;
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
</style>
