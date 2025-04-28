<template>
    <div>
      <h3>Disciplinas</h3>
  
      <div 
        class="dropbox" 
        @dragover="handleDragOver" 
        @drop="handleDrop"
        @click="triggerFileInput"
      >
        <input 
          type="file" 
          class="input-file" 
          ref="fileInput" 
          required 
          @change="$emit('handleFileUpload', $event)" 
          accept=".csv" 
          style="display:none;" 
        />
        <img src="/src/assets/ICON-DOWLOADA.jpg" alt="" width="30px" />
        <p>Arraste e solte um arquivo CSV ou clique para selecionar</p>
      </div>
  
      <div v-if="loading">
        <p>Carregando dados...</p>
      </div>
  
      <!-- AQUI RENDERIZA A TABELA -->
      <div v-if="!loading && tableData.length">
        <table class="csv-table">
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
  
      <button class="form-button" @click.prevent="submitData" style="margin-left: 40px;">
        Importar
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      loading: Boolean,
      tableData: Array,
      columns: Array,
      validationErrors: Array,
    },
    methods: {
      triggerFileInput() {
        this.$refs.fileInput.click();
      },
      handleDragOver(event) {
        event.preventDefault();
      },
      handleDrop(event) {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === 'text/csv') {
          this.$emit('handleFileUpload', { target: { files: [droppedFile] } });
        }
      },
      submitData() {
        console.log('Submetendo dados:', this.tableData);
      }
    }
  };
  </script>
  