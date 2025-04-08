<script>
import { useCsvStore } from '@/stores/csvStoreVinculoAluno';

export default {
  setup() {
    const store = useCsvStore();

    const handleFileUpload = (event) => {
      const file = event.target.files[0];

      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target.result;

        await store.validateCsv(content);

        if (store.errors && store.errors.length > 0) {
          return;
        }

        const simulatedData = store.data || [];

        await submitData(simulatedData);
      };

      reader.readAsText(file);
    };

    const submitData = async (data) => {
      try {
        // const response = await axios.post(`${import.meta.env.API_URL}/import/csv`, { data });

        console.log('Simulando envio dos dados JSON:');
        console.log(JSON.stringify(data, null, 2));

        alert('Dados simulados como enviados com sucesso!');
      } catch (error) {
        console.error('Erro na simulação de envio:', error);
      }
    };

    return { store, handleFileUpload };
  }
};
</script>

<template>
  <div class="container">
    <h2>📂 Vinculo Aluno</h2>

    <label for="file-upload" class="custom-file-upload">
      📁 Escolher arquivo CSV
    </label>
    <input type="file" id="file-upload" @change="handleFileUpload" accept=".csv" />

    <div v-if="store.errors.length" class="error-box">
      <h3>⚠️ Erros encontrados:</h3>
      <ul>
        <li v-for="(error, index) in store.errors" :key="index">❌ {{ error }}</li>
      </ul>
    </div>

    <table v-if="store.data.length">
      <thead>
        <tr>
          <th>Disciplina (Código)</th>
          <th>Código da Turma</th>
          <th>Matriucla</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in store.data" :key="index" :class="{ 'row-error': row.error }">
          <td>{{ row.disciplina }}</td>
          <td>{{ row.codigoTurma }}</td>
          <td>{{ row.matricula }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style src="../assets/csv.css"></style>