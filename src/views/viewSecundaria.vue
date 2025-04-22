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
            <form
              class="form-disciplinas"
              action=""
              enctype="multipart/form-data"
            >
              <h3 class="titulodisciplinas">Disciplinas</h3>
              <div class="dropbox"  
              @dragover.prevent
              @drop.prevent="handleFileDrop">
                <!-- aqui vai ter um v-if e sera passado se o arquivo foi passado, aparecer a tabela, ou o required ja faz essa funcao-->
                <!--usar o CsvUploadView como referencia  -->
                <!-- pode usar o reportValidity()  https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/reportValidity-->
                <input type="file" class="input-file" required @change="handleFileUpload"  accept=".csv" />
                <img src="/src/assets/ICON-DOWLOADA.jpg" alt="" width="30px" />
                <p>Arraste e solte um arquivo CSV ou clique para selecionar</p>
              </div>
            </form>

            <table v-if="tableData.length" >
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

            <button class="form-button" @click.prevent="submitData" style="margin-left: 40px;">
              Importar
            </button>
          </v-tabs-window-item>

          <v-tabs-window-item value="turmas">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima
            ipsum nulla facilis dolorum doloremque quam alias rerum rem. Modi
            molestiae quos repellendus est facilis facere cupiditate, et
            assumenda nisi inventore.
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { ref } from 'vue';
import { parse } from 'papaparse';
import axios from 'axios';

export default {
  data: () => ({
    tab: null,
    file: ref(null),
    tableData: ref([]),
    columns: ref([]),
  }),

  methods: {
    handleFileUpload(event) {
      const selectedFile = event.target.files[0];
      if (!selectedFile) return;
      this.processFile(selectedFile);
    },

    handleFileDrop(event) {
      const droppedFile = event.dataTransfer.files[0];
      if (!droppedFile) return;
      this.processFile(droppedFile);
    },

    processFile(file) {
      this.file = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = e.target.result;
        parse(csv, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            this.tableData = result.data;
            this.columns = result.meta.fields;
          },
        });
      };
      reader.readAsText(file);
    },

    async submitData() {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/import/csv`,
          {
            data: this.tableData,
          }
        );
        alert('Dados importados com sucesso!');
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao importar:', error);
      }
    },
  },
};
</script>
