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
          <th>Período Letivo</th>
          <th>Data de Início</th>
          <th>Data de Término</th>
          <th>Status</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="processo in processos" :key="processo._id">
          <td>{{ processo.idProcesso }}</td>
          <td>{{ processo.periodoLetivo }}</td>
          <td>{{ formatarData(processo.dataInicio) }}</td>
          <td>
            {{
              processo.dataTermino ? formatarData(processo.dataTermino) : "-"
            }}
          </td>
          <td>
            <span :class="['status', processo.status.toLowerCase()]">{{
              processo.status
            }}</span>
          </td>
          <td>
            <button v-if="processo.status === 'Pendente'" class="botaoTabela">
              Abortar
            </button>
            <button v-if="processo.status === 'Pendente'" class="botaoTabela">
              Continuar
            </button>
            <RouterLink v-else to="/detalhes" class="botaoTabela"
              >Visualizar</RouterLink
            >
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
    }
  },
  methods: {
    async carregarProcessos() {
      try {
        const resposta = await api.get('/process')
        this.processos = resposta.data
      } catch (erro) {
        console.error('Erro ao carregar processos:', erro)
      }
    },
    formatarData(dataISO) {
      const data = new Date(dataISO)
      return data.toLocaleDateString('pt-BR')
    }
  },
  mounted() {
    this.carregarProcessos()
  }
}
</script>
