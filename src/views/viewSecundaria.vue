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
        <v-tab value="disciplinas" :disabled="!completed.periodo">Disciplinas</v-tab>
        <v-tab value="turmas" :disabled="!completed.disciplinas">Turmas</v-tab>
        <v-tab value="usuarios" :disabled="!completed.turmas">Usuários</v-tab>
        <v-tab value="vinculos" :disabled="!completed.usuarios">Vínculos</v-tab>
      </v-tabs>

      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="periodo">
            <div class="form-group">
              <div class="input-group">
                <label for="periodo" class="form-label">Período Letivo</label>
                <input id="periodo" type="text" placeholder="AAAA/1" class="form-input"
                  v-model="periodoForm.periodoLetivo" @input="onPeriodoInput"
                  :class="{ 'input-error': periodoError }" />
                <p v-if="periodoError" class="error-text">{{ periodoError }}</p>
              </div>

              <div class="input-group">
                <label for="dataInicial" class="form-label">Data Inicial</label>
                <input type="date" id="dataInicial" class="form-input" v-model="periodoForm.dataInicial"
                  :class="{ 'input-error': periodoError }" />
              </div>

              <div class="input-group">
                <label for="dataFinal" class="form-label">Data Final</label>
                <input type="date" id="dataFinal" class="form-input" v-model="periodoForm.dataFinal"
                  :min="periodoForm.dataInicial" :class="{ 'input-error': periodoError }" />
              </div>
            </div>
            <button class="form-button" :disabled="!isPeriodoValid" @click="completePeriodo">Continuar</button>
            <v-card v-if="currentErrors.length > 0 || emptyFields.length > 0" class="pa-4 mb-4" outlined
              color="red lighten-5" style="max-height: 250px; overflow-y: auto;">
              <div v-if="currentErrors.length > 0">
                <strong>Erros encontrados na planilha:</strong>
                <ul>
                  <li v-for="(erro, index) in currentErrors" :key="'erro-' + index">
                    {{ erro }}
                  </li>
                </ul>
              </div>

              <div v-else-if="emptyFields.length > 0">
                <strong>Campos obrigatórios vazios:</strong>
                <ul>
                  <li v-for="(campo, index) in emptyFields" :key="'vazio-' + index">
                    {{ campo }}
                  </li>
                </ul>
              </div>
            </v-card>
          </v-tabs-window-item>

          <v-tabs-window-item value="disciplinas">
            <form class="form-disciplinas" action="" enctype="multipart/form-data">
              <h3 class="titulodisciplinas">Disciplinas</h3>
              <div class="dropbox" @dragover="handleDragOver" @drop="handleDrop" @click="triggerFileInput">
                <input type="file" class="input-file" :ref="`${tab}FileInput`" required @change="handleFileUpload"
                  accept=".csv" style="display: none" />
                <img src="/src/assets/ICON-DOWLOADA.jpg" alt="" width="30px" />
                <p>Arraste e solte um arquivo CSV ou clique para selecionar</p>
              </div>
            </form>

            <div v-if="loading">
              <p>Carregando dados...</p>
            </div>

            <v-dialog v-model="showErrorModal" max-width="600">
              <v-card>
                <v-card-title class="text-h6">{{ modalMessage }}</v-card-title>
                <v-card-text>
                  <ul>
                    <li v-for="(error, index) in currentErrors" :key="'modal-erro-' + index">
                      {{ error }}
                    </li>
                    <li v-for="(campo, index) in emptyFields" :key="'modal-vazio-' + index">
                      {{ campo }}
                    </li>
                  </ul>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="showErrorModal = false">Fechar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <div v-if="
              !loading &&
              tableDataByTab[tab] &&
              tableDataByTab[tab].tableData.length
            ">
              <table class="csv-table">
                <thead>
                  <tr>
                    <th v-for="col in tableDataByTab[tab].columns" :key="col">
                      {{ col }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in tableDataByTab[tab].tableData" :key="index">
                    <td v-for="col in tableDataByTab[tab].columns" :key="col">
                      <input v-model="row[col]" class="editable-cell" :class="{ 'input-error': !row[col]?.trim() }"
                        :placeholder="'Vazio'" style="width: 100%; padding: 4px" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button class="form-button" @click="completeDisciplinas" style="margin-left: 40px">Continuar</button>
            </div>
            <v-card v-if="currentErrors.length > 0 || emptyFields.length > 0" class="pa-4 mb-4" outlined
              color="red lighten-5" style="max-height: 250px; overflow-y: auto;">
              <div v-if="currentErrors.length > 0">
                <strong>Erros encontrados na planilha:</strong>
                <ul>
                  <li v-for="(erro, index) in currentErrors" :key="'erro-' + index">
                    {{ erro }}
                  </li>
                </ul>
              </div>

              <div v-else-if="emptyFields.length > 0">
                <strong>Campos obrigatórios vazios:</strong>
                <ul>
                  <li v-for="(campo, index) in emptyFields" :key="'vazio-' + index">
                    {{ campo }}
                  </li>
                </ul>
              </div>
            </v-card>
          </v-tabs-window-item>

          <v-tabs-window-item value="turmas">
            <form class="form-turmas" action="" enctype="multipart/form-data">
              <h3 class="tituloturmas">Turmas</h3>
              <div class="dropbox" @dragover="handleDragOver" @drop="handleDrop" @click="triggerFileInput">
                <input type="file" class="input-file" :ref="`${tab}FileInput`" required @change="handleFileUpload"
                  accept=".csv" style="display: none" />
                <img src="/src/assets/ICON-DOWLOADA.jpg" alt="" width="30px" />
                <p>Arraste e solte um arquivo CSV ou clique para selecionar</p>
              </div>
            </form>

            <div v-if="loading">
              <p>Carregando dados...</p>
            </div>

            <v-dialog v-model="showErrorModal" max-width="600">
              <v-card>
                <v-card-title class="text-h6">{{ modalMessage }}</v-card-title>
                <v-card-text>
                  <ul>
                    <li v-for="(error, index) in currentErrors" :key="'modal-erro-' + index">
                      {{ error }}
                    </li>
                    <li v-for="(campo, index) in emptyFields" :key="'modal-vazio-' + index">
                      {{ campo }}
                    </li>
                  </ul>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="showErrorModal = false">Fechar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <div v-if="
              !loading &&
              tableDataByTab[tab] &&
              tableDataByTab[tab].tableData.length
            ">
              <table class="csv-table">
                <thead>
                  <tr>
                    <th v-for="col in tableDataByTab[tab].columns" :key="col">
                      {{ col }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in tableDataByTab[tab].tableData" :key="index">
                    <td v-for="col in tableDataByTab[tab].columns" :key="col">
                      <input v-model="row[col]" class="editable-cell" :class="{ 'input-error': !row[col]?.trim() }"
                        :placeholder="'Vazio'" style="width: 100%; padding: 4px" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button class="form-button" @click="completeTurmas" style="margin-left: 40px">Continuar</button>
            </div>
            <v-card v-if="currentErrors.length > 0 || emptyFields.length > 0" class="pa-4 mb-4" outlined
              color="red lighten-5" style="max-height: 250px; overflow-y: auto;">
              <div v-if="currentErrors.length > 0">
                <strong>Erros encontrados na planilha:</strong>
                <ul>
                  <li v-for="(erro, index) in currentErrors" :key="'erro-' + index">
                    {{ erro }}
                  </li>
                </ul>
              </div>

              <div v-else-if="emptyFields.length > 0">
                <strong>Campos obrigatórios vazios:</strong>
                <ul>
                  <li v-for="(campo, index) in emptyFields" :key="'vazio-' + index">
                    {{ campo }}
                  </li>
                </ul>
              </div>
            </v-card>
          </v-tabs-window-item>
          <v-tabs-window-item value="usuarios">
            <form class="form-disciplinas" action="" enctype="multipart/form-data">
              <h3 class="titulodisciplinas">Usuários</h3>
              <div class="dropbox" @dragover="handleDragOver" @drop="handleDrop" @click="triggerFileInput">
                <input type="file" class="input-file" :ref="`${tab}FileInput`" required @change="handleFileUpload"
                  accept=".csv" style="display: none" />
                <img src="/src/assets/ICON-DOWLOADA.jpg" alt="" width="30px" />
                <p>Arraste e solte um arquivo CSV ou clique para selecionar</p>
              </div>
            </form>

            <div v-if="loading">
              <p>Carregando dados...</p>
            </div>

            <v-dialog v-model="showErrorModal" max-width="600">
              <v-card>
                <v-card-title class="text-h6">{{ modalMessage }}</v-card-title>
                <v-card-text>
                  <ul>
                    <li v-for="(error, index) in currentErrors" :key="'modal-erro-' + index">
                      {{ error }}
                    </li>
                    <li v-for="(campo, index) in emptyFields" :key="'modal-vazio-' + index">
                      {{ campo }}
                    </li>
                  </ul>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="showErrorModal = false">Fechar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <div v-if="
              !loading &&
              tableDataByTab[tab] &&
              tableDataByTab[tab].tableData.length
            ">
              <table class="csv-table">
                <thead>
                  <tr>
                    <th v-for="col in tableDataByTab[tab].columns" :key="col">
                      {{ col }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in tableDataByTab[tab].tableData" :key="index">
                    <td v-for="col in tableDataByTab[tab].columns" :key="col">
                      <input v-model="row[col]" class="editable-cell" :class="{ 'input-error': !row[col]?.trim() }"
                        :placeholder="'Vazio'" style="width: 100%; padding: 4px" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button class="form-button" @click="completeUsuarios" style="margin-left: 40px">Continuar</button>
            </div>
            <v-card v-if="currentErrors.length > 0 || emptyFields.length > 0" class="pa-4 mb-4" outlined
              color="red lighten-5" style="max-height: 250px; overflow-y: auto;">
              <div v-if="currentErrors.length > 0">
                <strong>Erros encontrados na planilha:</strong>
                <ul>
                  <li v-for="(erro, index) in currentErrors" :key="'erro-' + index">
                    {{ erro }}
                  </li>
                </ul>
              </div>

              <div v-else-if="emptyFields.length > 0">
                <strong>Campos obrigatórios vazios:</strong>
                <ul>
                  <li v-for="(campo, index) in emptyFields" :key="'vazio-' + index">
                    {{ campo }}
                  </li>
                </ul>
              </div>
            </v-card>
          </v-tabs-window-item>

          <v-tabs-window-item value="vinculos">
            <form class="form-disciplinas" action="" enctype="multipart/form-data">
              <h3 class="titulodisciplinas">Vínculos</h3>
              <div class="dropbox" @dragover="handleDragOver" @drop="handleDrop" @click="triggerFileInput">
                <input type="file" class="input-file" :ref="`${tab}FileInput`" required @change="handleFileUpload"
                  accept=".csv" style="display: none" />
                <img src="/src/assets/ICON-DOWLOADA.jpg" alt="" width="30px" />
                <p>Arraste e solte um arquivo CSV ou clique para selecionar</p>
              </div>
            </form>

            <div v-if="loading">
              <p>Carregando dados...</p>
            </div>

            <v-dialog v-model="showErrorModal" max-width="600">
              <v-card>
                <v-card-title class="text-h6">{{ modalMessage }}</v-card-title>
                <v-card-text>
                  <ul>
                    <li v-for="(error, index) in currentErrors" :key="'modal-erro-' + index">
                      {{ error }}
                    </li>
                    <li v-for="(campo, index) in emptyFields" :key="'modal-vazio-' + index">
                      {{ campo }}
                    </li>
                  </ul>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="showErrorModal = false">Fechar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <div v-if="
              !loading &&
              tableDataByTab[tab] &&
              tableDataByTab[tab].tableData.length
            ">
              <table class="csv-table">
                <thead>
                  <tr>
                    <th v-for="col in tableDataByTab[tab].columns" :key="col">
                      {{ col }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in tableDataByTab[tab].tableData" :key="index">
                    <td v-for="col in tableDataByTab[tab].columns" :key="col">
                      <input v-model="row[col]" class="editable-cell" :class="{ 'input-error': !row[col]?.trim() }"
                        :placeholder="'Vazio'" style="width: 100%; padding: 4px" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
    <v-alert v-if="errorMessage" type="error" dismissible class="mb-4">
      {{ errorMessage }}
    </v-alert>
  </div>
</template>

<script>
import { parse } from "papaparse";
import { validateDisciplinaCsv } from "../stores/validateDisciplinaCsv";
import { validateTurmaCsv } from "../stores/validateTurmaCsv";
import { validateUsuarioCsv } from '../stores/validadateUsuarioCsv';

export default {
  data() {
    return {
      showErrorModal: false,
      modalMessage: '',
      currentErrors: [],
      emptyFields: [],
      tab: 'periodo',
      loading: false,
      errorMessage: '',
      tableDataByTab: {
        disciplinas: { tableData: [], columns: [] },
        turmas:       { tableData: [], columns: [] },
        usuarios:     { tableData: [], columns: [] }
      },
      completed: {
        periodo: false,
        disciplinas: false,
        turmas: false,
        usuarios: false
      },
      periodoForm: {
        periodoLetivo: '',
        dataInicial: '',
        dataFinal: ''
      },
      periodoError: ''
    };
  },
  computed: {
    isPeriodoValid() {
      const { periodoLetivo, dataInicial, dataFinal } = this.periodoForm;
      const regexPeriodo = /^\d{4}\/[12]$/;
      if (!regexPeriodo.test(periodoLetivo.trim())) return false;
      if (!dataInicial || !dataFinal)               return false;
      const inicio = new Date(dataInicial);
      const fim    = new Date(dataFinal);
      if (inicio > fim)                             return false;
      return true;
    }
  },
  watch: {
    tab() {
      this.currentErrors   = [];
      this.emptyFields     = [];
      this.errorMessage    = '';
      this.showErrorModal  = false;
    },
    tableDataByTab: {
      handler(novoValor) {
        const camposVazios = [];
        for (const [nomeTabela, dados] of Object.entries(novoValor)) {
          dados.tableData.forEach((linha, linhaIndex) => {
            for (const [chave, valor] of Object.entries(linha)) {
              if (!valor || valor.toString().trim() === '') {
                camposVazios.push(
                  `Aba "${nomeTabela}" - Linha ${linhaIndex + 1}: campo "${chave}" está vazio`
                );
              }
            }
          });
        }
        this.emptyFields = camposVazios;
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onPeriodoInput(evt) {
      let v = evt.target.value.replace(/\D/g, '').slice(0, 5);
      if (v.length > 4) {
        v = v.slice(0, 4) + '/' + v.slice(4);
      }
      this.periodoForm.periodoLetivo = v;
    },
    showErrors(errors) {
      this.currentErrors  = errors;
      this.modalMessage   = 'Corrija todos os erros antes de continuar.';
      this.showErrorModal = true;
    },
    triggerFileInput() {
      const refName = `${this.tab}FileInput`;
      const input   = this.$refs[refName];
      if (input) input.click();
    },
    handleDragOver(event) {
      event.preventDefault();
    },
    handleDrop(event) {
      event.preventDefault();
      const droppedFile = event.dataTransfer.files[0];
      if (droppedFile?.type === 'text/csv') {
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
            if (this.tab === 'disciplinas') validation = validateDisciplinaCsv(result);
            if (this.tab === 'turmas')       validation = validateTurmaCsv(result);
            if (this.tab === 'usuarios')     validation = validateUsuarioCsv(result);
            if (!validation.isValid) {
              this.showErrors(validation.errors || [validation.error]);
              this.loading = false;
              return;
            }
            this.tableDataByTab[this.tab].tableData = validation.data;
            this.tableDataByTab[this.tab].columns   = result.meta.fields;
            this.loading = false;
          },
          error: (error) => {
            console.error('CSV Parsing error:', error);
            this.errorMessage = 'Erro ao ler o CSV.';
            this.loading = false;
          }
        });
      };
      reader.readAsText(selectedFile);
    },
    async submitData() {
      const dataToSubmit = this.tableDataByTab[this.tab]?.tableData;
      if (!dataToSubmit?.length) return;
      console.log('Submetendo dados:', dataToSubmit);
      return new Promise((resolve) => setTimeout(resolve, 500));
    },
    completePeriodo() {
      const errors = [];
      if (!/^\d{4}\/[12]$/.test(this.periodoForm.periodoLetivo)) {
        errors.push('Período inválido: use AAAA/1 ou AAAA/2.');
      }
      if (!this.periodoForm.dataInicial || !this.periodoForm.dataFinal) {
        errors.push('Preencha data inicial e final.');
      } else {
        const inicio = new Date(this.periodoForm.dataInicial);
        const fim    = new Date(this.periodoForm.dataFinal);
        if (inicio > fim) errors.push('Data inicial não pode ser depois da data final.');
      }
      if (errors.length) {
        this.periodoError = errors.join(' ');
        this.showErrors(errors);
        return;
      }
      this.periodoError    = '';
      this.completed.periodo = true;
      this.tab              = 'disciplinas';
    },
    async completeDisciplinas() {
      const data = this.tableDataByTab.disciplinas?.tableData;
      if (!data?.length) {
        this.errorMessage = 'Nenhum dado foi carregado para Disciplinas.';
        return;
      }
      if (this.currentErrors.length || this.emptyFields.length) {
        this.modalMessage   = 'Corrija todos os erros antes de prosseguir.';
        this.showErrorModal = true;
        return;
      }
      try {
        await this.submitData();
        this.completed.disciplinas = true;
        this.tab                   = 'turmas';
      } catch (error) {
        console.error('Erro ao submeter Disciplinas:', error);
        this.errorMessage = 'Erro ao submeter os dados de Disciplinas.';
      }
    },
    completeTurmas() {
      this.completed.turmas = true;
      this.tab              = 'usuarios';
    },
    completeUsuarios() {
      this.completed.usuarios = true;
      this.tab                = 'vinculos';
    }
  }
};
</script>

<style>
.input-error {
  border-color: #ef4444 !important;
  background: #fff6f6;
}

.form-button:disabled {
  background: #d1d5db !important;
  color: #888 !important;
  cursor: not-allowed !important;
  border: none;
}
</style>
