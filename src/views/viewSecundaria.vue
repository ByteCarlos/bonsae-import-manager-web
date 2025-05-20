<template>
  <link rel="stylesheet" href="/src/assets/secundaria.css" />
  <div class="paginaSecundaria">
    <header class="cabecalho">
      <img src="/src/assets/academy-2.png" alt="Logo Bonsae" width="110px" />
    </header>

    <div class="topo-conteudo-secundaria">
      <h1>Importação de Dados - Controle de Processo</h1>
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
              <div class="input-group">
                <label for="periodo" class="form-label">Período Letivo</label>
                <input
                  id="periodo"
                  type="text"
                  placeholder="Ex: 2024/1"
                  class="form-input"
                />
              </div>
              <div class="input-group">
                <label for="identificacao" class="form-label"
                  >identificação</label
                >
                <input type="text" id="identificacao" class="form-input" placeholder="Ex: 10032025"/>
              </div>
              <div class="input-group">
                <label for="DataInicio" class="form-label"
                  >Data Inicial</label
                >
                <input type="text" id="dataInicial" class="form-input" placeholder="Ex: 01/2025"/>
              </div>
              <div class="input-group">
                <label for="dataFinal" class="form-label"
                  >Data Final</label
                >
                <input type="text" id="dataFinal" class="form-input" placeholder="Ex: 03/2025" />
              </div>
            </div>
            <button class="form-button">Continuar</button>
          </v-tabs-window-item>

          <v-tabs-window-item value="disciplinas">
            <form
              class="form-disciplinas"
              action=""
              enctype="multipart/form-data"
            >
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
                  style="display: none"
                />
                <img src="/src/assets/ICON-DOWLOADA.jpg" alt="" width="30px" />
                <p>Arraste e solte um arquivo CSV ou clique para selecionar</p>
              </div>
            </form>

            <div v-if="loading">
              <p>Carregando dados...</p>
            </div>

            <v-dialog v-model="showErrorModal" max-width="600">
              <v-card>
                <v-card-title class="text-h6">Erros encontrados</v-card-title>
                <v-card-text>
                  <ul>
                    <li v-for="(error, index) in currentErrors" :key="index">
                      {{ error }}
                    </li>
                  </ul>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="showErrorModal = false">Fechar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <div
              v-if="
                !loading &&
                tableDataByTab[tab] &&
                tableDataByTab[tab].tableData.length
              "
            >
              <table class="csv-table">
                <thead>
                  <tr>
                    <th v-for="col in tableDataByTab[tab].columns" :key="col">
                      {{ col }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, index) in tableDataByTab[tab].tableData"
                    :key="index"
                  >
                    <td v-for="col in tableDataByTab[tab].columns" :key="col">
                      <input
                        v-model="row[col]"
                        class="editable-cell"
                        :placeholder="'Vazio'"
                        style="width: 100%; padding: 4px"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              class="form-button"
              @click.prevent="submitData"
              style="margin-left: 40px"
            >
              Importar
            </button>
          </v-tabs-window-item>

          <v-tabs-window-item value="turmas">
            <form class="form-turmas" action="" enctype="multipart/form-data">
              <h3 class="tituloturmas">Turmas</h3>
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
                  style="display: none"
                />
                <img src="/src/assets/ICON-DOWLOADA.jpg" alt="" width="30px" />
                <p>Arraste e solte um arquivo CSV ou clique para selecionar</p>
              </div>
            </form>

            <div v-if="loading">
              <p>Carregando dados...</p>
            </div>

            <v-dialog v-model="showErrorModal" max-width="600">
              <v-card>
                <v-card-title class="text-h6">Erros encontrados</v-card-title>
                <v-card-text>
                  <ul>
                    <li v-for="(error, index) in currentErrors" :key="index">
                      {{ error }}
                    </li>
                  </ul>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="showErrorModal = false">Fechar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <div
              v-if="
                !loading &&
                tableDataByTab[tab] &&
                tableDataByTab[tab].tableData.length
              "
            >
              <table class="csv-table">
                <thead>
                  <tr>
                    <th v-for="col in tableDataByTab[tab].columns" :key="col">
                      {{ col }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, index) in tableDataByTab[tab].tableData"
                    :key="index"
                  >
                    <td v-for="col in tableDataByTab[tab].columns" :key="col">
                      <input
                        v-model="row[col]"
                        class="editable-cell"
                        :placeholder="'Vazio'"
                        style="width: 100%; padding: 4px"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              class="form-button"
              @click.prevent="submitData"
              style="margin-left: 40px"
            >
              Importar
            </button>
          </v-tabs-window-item>
          <v-tabs-window-item value="usuarios">
            <form
              class="form-disciplinas"
              action=""
              enctype="multipart/form-data"
            >
              <h3 class="titulodisciplinas">Usuários</h3>
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
                  style="display: none"
                />
                <img src="/src/assets/ICON-DOWLOADA.jpg" alt="" width="30px" />
                <p>Arraste e solte um arquivo CSV ou clique para selecionar</p>
              </div>
            </form>

            <div v-if="loading">
              <p>Carregando dados...</p>
            </div>

            <v-dialog v-model="showErrorModal" max-width="600">
              <v-card>
                <v-card-title class="text-h6">Erros encontrados</v-card-title>
                <v-card-text>
                  <ul>
                    <li v-for="(error, index) in currentErrors" :key="index">
                      {{ error }}
                    </li>
                  </ul>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="showErrorModal = false">Fechar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <div
              v-if="
                !loading &&
                tableDataByTab[tab] &&
                tableDataByTab[tab].tableData.length
              "
            >
              <table class="csv-table">
                <thead>
                  <tr>
                    <th v-for="col in tableDataByTab[tab].columns" :key="col">
                      {{ col }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, index) in tableDataByTab[tab].tableData"
                    :key="index"
                  >
                    <td v-for="col in tableDataByTab[tab].columns" :key="col">
                      <input
                        v-model="row[col]"
                        class="editable-cell"
                        :placeholder="'Vazio'"
                        style="width: 100%; padding: 4px"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              class="form-button"
              @click.prevent="submitData"
              style="margin-left: 40px"
            >
              Importar
            </button>
          </v-tabs-window-item>

          <v-tabs-window-item value="vinculos">
            <form
              class="form-disciplinas"
              action=""
              enctype="multipart/form-data"
            >
              <h3 class="titulodisciplinas">Vínculos</h3>
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
                  style="display: none"
                />
                <img src="/src/assets/ICON-DOWLOADA.jpg" alt="" width="30px" />
                <p>Arraste e solte um arquivo CSV ou clique para selecionar</p>
              </div>
            </form>

            <div v-if="loading">
              <p>Carregando dados...</p>
            </div>

            <v-dialog v-model="showErrorModal" max-width="600">
              <v-card>
                <v-card-title class="text-h6">Erros encontrados</v-card-title>
                <v-card-text>
                  <ul>
                    <li v-for="(error, index) in currentErrors" :key="index">
                      {{ error }}
                    </li>
                  </ul>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="showErrorModal = false">Fechar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <div
              v-if="
                !loading &&
                tableDataByTab[tab] &&
                tableDataByTab[tab].tableData.length
              "
            >
              <table class="csv-table">
                <thead>
                  <tr>
                    <th v-for="col in tableDataByTab[tab].columns" :key="col">
                      {{ col }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, index) in tableDataByTab[tab].tableData"
                    :key="index"
                  >
                    <td v-for="col in tableDataByTab[tab].columns" :key="col">
                      <input
                        v-model="row[col]"
                        class="editable-cell"
                        :placeholder="'Vazio'"
                        style="width: 100%; padding: 4px"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              class="form-button"
              @click.prevent="submitData"
              style="margin-left: 40px"
            >
              Importar
            </button>
          </v-tabs-window-item>
        <v-tabs-window-item value ="usuarios">
          <form class="form-usuarios" action="" enctype="multipart/form-data">
              <h3 class="titulousuarios">Usuários</h3>
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
    <v-alert
      v-if="errorMessage"
      type="error"
      dismissible
      class="mb-4"
    >
      {{ errorMessage }}
    </v-alert>
  </div>
</template>

<script>
import { ref } from 'vue';

import { parse } from "papaparse";
import { validateDisciplinaCsv } from "../stores/validateDisciplinaCsv";
import { validateTurmaCsv } from "../stores/validateTurmaCsv";
import { validateUsuarioCsv } from '../stores/validadateUsuarioCsv';

const errorMessage = ref('');

export default {
  data() {
      return {
      showErrorModal: false,
      currentErrors: [],
        tab: null,
        loading: false,
        errorMessage: '', 
      tableDataByTab: {
          disciplinas: {
            tableData: [],
            columns: [],
          },
          turmas: {
            tableData: [],
            columns: [],
          },
          usuarios: {
          tableData: [],
          columns: []
        },
        },
      };
    },
  methods: {
    showErrors(errors) {
      this.currentErrors = errors;
      this.showErrorModal = true;
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleDragOver(event) {
      event.preventDefault();
    },
    handleDrop(event) {
      event.preventDefault();
      const droppedFile = event.dataTransfer.files[0];
      if (droppedFile && droppedFile.type === "text/csv") {
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

            if (this.tab === "disciplinas") {
              validation = validateDisciplinaCsv(result);
            } else if (this.tab === 'turmas') {
              validation = validateTurmaCsv(result);
            } else if (this.tab === 'usuarios') {
              validation = validateUsuarioCsv(result);
            }

            if (!validation.isValid) {
              this.showErrors(validation.errors || [validation.error]);
              this.loading = false;
              return;
            }

            this.tableDataByTab[this.tab].tableData = validation.data;
            this.tableDataByTab[this.tab].columns = result.meta.fields;
            this.loading = false;
          },
          error: (error) => {
            console.error("CSV Parsing error:", error);
            this.errorMessage = 'Erro ao ler o CSV.';
            this.loading = false;
          },
        });
      };
      reader.readAsText(selectedFile);
    },
    

    submitData() {
     
      console.log("Submetendo dados:", this.tableDataByTab[this.tab].tableData);
        
    },
  },
};
</script>
