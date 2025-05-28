<template>
  <link rel="stylesheet" href="/src/assets/Processos.css" />
  <div class="pagina-processo">
    
    <header class="cabecalho">
      <img src="/src/assets/academy-2.png" alt="Logo Bonsae" width="110px" />
    </header>

    
     <div class="detalhes-processo">
      <RouterLink to="/" class="voltar" id="botaoVoltar">
        Voltar
      </RouterLink>
      <h1>Detalhes do Processo - ID {{ processo.id }}</h1>
      <p>Importação de Dados do Período Letivo {{ processo.periodoLetivo }}</p>

      <div class="resumo-processo">
        <div class="card">
          <h3>Período Letivo</h3>
          <p>{{ processo.periodoLetivo }}</p>
        </div>
        <div class="card">
          <h3>Data de Início</h3>
          <p>{{ formatarData(processo.dataInicio) }}</p>
        </div>
        <div class="card">
          <h3>Data de Término</h3>
          <p>{{ formatarData(processo.dataFim) }}</p>
        </div>
        <div class="card status">
          <h3>Status</h3>
          <p class="concluido">{{ processo.status }}</p>
        </div>
      </div>
    </div>

    <div class="etapas-importacao">
      <h2>Etapas da Importação</h2>
      <table class="tabela-etapas">
        <thead>
          <tr>
            <th>Etapa</th>
            <th>Status</th>
            <th>Início</th>
            <th>Fim</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(etapa, index) in processo.etapas" :key="index">
            <td>{{ etapa.nome }}</td>
            <td :class="etapa.status.toLowerCase()">{{ etapa.status }}</td>
            <td>{{ formatarData(etapa.inicio) }}</td>
            <td>{{ formatarData(etapa.fim) }}</td>
            <td>{{ etapa.observacoes }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="arquivos-envolvidos">
      <h2>Arquivos Envolvidos</h2>
      <table class="tabela-arquivos">
        <thead>
          <tr>
            <th>Nome do Arquivo</th>
            <th>Data de Upload</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(arquivo, index) in processo.arquivos" :key="index">
            <td>{{ arquivo.nome }}</td>
            <td>{{ formatarData(arquivo.upload) }}</td>
            <td>
              <a :href="arquivo.url" class="baixar" download>Baixar</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const processo = ref(null)

    const carregarDetalhes = async () => {
      try {
        const id = route.params.id
        const res = await api.get(`/process/${id}`)
        processo.value = res.data
      } catch (err) {
        console.error('Erro ao buscar detalhes do processo:', err)
      }
    }

    const formatarData = (data) => {
      return new Date(data).toLocaleDateString('pt-BR')
    }

    onMounted(() => {
      carregarDetalhes()
    })

    return {
      processo,
      formatarData
    }
  }
}
</script>