<template>
  <link rel="stylesheet" href="/src/assets/secundaria.css" />
  <div class="paginaSecundaria">
    <div class="topo-conteudo-secundaria">
      <h1>Importação de Dados - Controle de Processo ✔️</h1>
      <p>Gerencie e controle suas importações de dados de forma eficiente.</p>
    </div>
    <v-card>
      <v-card-title>
        <h2>Novo Processo</h2>
      </v-card-title>
      <v-tabs v-model="tab" bg-color="white" size="large" grow>
        <v-tab value="periodo">Período</v-tab>
        <v-tab value="disciplinas">Disciplinas</v-tab>
        <v-tab value="turmas">Turmas</v-tab>
        <v-tab value="usuarios">Usuários</v-tab>
        <v-tab value="vinculos">Vínculos</v-tab>
      </v-tabs>

      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="periodo">
            <div class="form-group">
              <label for="periodo" class="form-label">Período Letivo</label>
              <input
                id="periodo"
                type="text"
                placeholder="Ex: 2024/1"
                class="form-input"
              />
              <button class="form-button">Next ➡️</button>
            </div>
          </v-tabs-window-item>

          <v-tabs-window-item value="disciplinas">
            <form class="form-disciplinas" action="" enctype="multipart/form-data">
              <h3 class="titulodisciplinas">Disciplinas</h3>
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
                  @change="handleFileUpload" 
                  accept=".csv" 
                  style="display:none;" 
                />
                <img src="/src/assets/ICON-DOWLOADA.jpg" alt="" width="30px" />
                <p>Arraste e solte um arquivo CSV ou clique para selecionar</p>
              </div>
            </form>

            <div v-if="loading">
              <p>Carregando dados...</p>
            </div>

            <div v-if="!loading && tableDataByTab[tab] && tableDataByTab[tab].tableData.length">
              <table class="csv-table">
                <thead>
                  <tr>
                    <th v-for="col in tableDataByTab[tab].columns" :key="col">{{ col }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in tableDataByTab[tab].tableData" :key="index">
                    <td v-for="col in tableDataByTab[tab].columns" :key="col">
                      <input 
                        v-model="row[col]" 
                        class="editable-cell" 
                        :placeholder="'Vazio'" 
                        style="width: 100%; padding: 4px;"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button class="form-button" @click.prevent="submitData" style="margin-left: 40px;">
              Importar
            </button>
          </v-tabs-window-item>

          <v-tabs-window-item value="turmas">
            <form class="form-disciplinas" action="" enctype="multipart/form-data">
              <h3 class="titulodisciplinas">Turmas</h3>
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
                  @change="handleFileUpload" 
                  accept=".csv" 
                  style="display:none;" 
                />
                <img src="/src/assets/ICON-DOWLOADA.jpg" alt="" width="30px" />
                <p>Arraste e solte um arquivo CSV ou clique para selecionar</p>
              </div>
            </form>

            <div v-if="loading">
              <p>Carregando dados...</p>
            </div>

            <div v-if="!loading && tableDataByTab[tab] && tableDataByTab[tab].tableData.length">
              <table class="csv-table">
                <thead>
                  <tr>
                    <th v-for="col in tableDataByTab[tab].columns" :key="col">{{ col }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in tableDataByTab[tab].tableData" :key="index">
                    <td v-for="col in tableDataByTab[tab].columns" :key="col">
                      <input 
                        v-model="row[col]" 
                        class="editable-cell" 
                        :placeholder="'Vazio'" 
                        style="width: 100%; padding: 4px;"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>


            <button class="form-button" @click.prevent="submitData" style="margin-left: 40px;">
              Importar
            </button>
          </v-tabs-window-item>

        </v-tabs-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { parse } from 'papaparse';
import { validateDisciplinaCsv } from '../stores/validateDisciplinaCsv';
import { validateTurmaCsv } from '../stores/validateTurmaCsv';

export default {
  data() {
  return {
    tab: null,
    loading: false,
    tableDataByTab: {
      disciplinas: {
        tableData: [],
        columns: []
      },
      turmas: {
        tableData: [],
        columns: []
      },
      // depois adiciona usuários, vínculos, etc
    },
  };
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
        this.handleFileUpload({ target: { files: [droppedFile] } });
      }
    },
    handleFileUpload(event) {
      const selectedFile = event.target.files[0];
      if (!selectedFile) return;

      this.loading = true;
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = e.target.result;

        parse(csv, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            let validation;

            if (this.tab === 'disciplinas') {
              validation = validateDisciplinaCsv(result);
            }
            else if (this.tab === 'turmas') {
              validation = validateTurmaCsv(result);
            }

            if (!validation.isValid) {
              alert(validation.error);
              this.loading = false;
              return;
            }
            
            this.tableDataByTab[this.tab].tableData = validation.data;
            this.tableDataByTab[this.tab].columns = result.meta.fields;
            this.loading = false;
          },
          error: (error) => {
            console.error('CSV Parsing error:', error);
            this.loading = false;
          },
        });
      };
      reader.readAsText(selectedFile);
    },

    submitData() {
      //TODO adicionar o metodo para fazer o post no backend
        console.log('Submetendo dados:', this.tableDataByTab[this.tab].tableData);
      }
  },
};
</script>