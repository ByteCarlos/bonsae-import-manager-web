<template>
  <link rel="stylesheet" href="/src/assets/principal.css" />
  <div class="pagina">
    <link rel="stylesheet" href="/src/assets/header.css" />
    <header class="cabecalho">
      <img src="/src/assets/academy-2.png" alt="Logo Bonsae" width="110px" />
    </header>

    <div class="topo-conteudo">
      <div>
        <h1>Importação de Dados - Controle de Processo</h1>
        <p>Gerencie e controle suas importações de dados de forma eficiente.</p>
      </div>
      <RouterLink to="/secundaria" class="botao" id="botaoNovoProcesso">
        Novo Processo
      </RouterLink>
    </div>

    <table class="tabela-processos">
      <thead>
        <tr>
          <th>ID do Processo</th>
          <th>Status Atual</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="processo in processos" :key="processo._id">
          <td>{{ processo.processId }}</td>
          <td>
            <span :class="['status', processo.currentStatus?.toLowerCase()]">
              {{ formatarStatus(processo.currentStatus) }}
            </span>
          </td>
          <td>
            <RouterLink to="/detalhes" class="botaoTabela">
              Visualizar
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      processos: []
    };
  },
  methods: {
    async carregarProcessos() {
      try {
        // const resposta = await api.get("/process");
        this.processos = resposta.data;
      } catch (erro) {
        console.error("Erro ao carregar processos:", erro);
      }
    },
    formatarStatus(status) {
      switch ((status || "").toUpperCase()) {
        case "INICIADO":
          return "Iniciado";
        case "PENDENTE":
          return "Pendente";
        case "CONCLUIDO":
        case "CONCLUÍDO":
          return "Concluído";
        default:
          return "Indefinido";
      }
    }
  },
  mounted() {
    this.carregarProcessos();
  }
};
</script>

<style scoped>
.status {
  padding: 0.3em 0.6em;
  border-radius: 4px;
  font-weight: 600;
  color: white;
  text-transform: capitalize;
}

.status.iniciado {
  background-color: #2a9d8f;
  /* verde-azulado */
}

.status.pendente {
  background-color: #e9c46a;
  /* amarelo */
  color: #333;
}

.status.concluido {
  background-color: #264653;
  /* azul escuro */
}
</style>
s