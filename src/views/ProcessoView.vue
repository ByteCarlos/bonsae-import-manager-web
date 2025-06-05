<template>
  <link rel="stylesheet" href="/src/assets/Processos.css" />
  <div class="pagina-processo">
    <header class="cabecalho">
      <img src="/src/assets/academy-2.png" alt="Logo Bonsae" width="110px" />
    </header>

    <div v-if="processo" class="detalhes-processo">
      <RouterLink to="/" class="voltar" id="botaoVoltar">Voltar</RouterLink>
      <h1>Detalhes do Processo</h1>
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

    <div v-if="processo.etapas.length" class="etapas-importacao">
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

    <div v-if="processo.arquivos.length" class="arquivos-envolvidos">
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
            <td><a :href="arquivo.url" class="baixar" download>Baixar</a></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="processo.professorEnrollments.length" class="professores">
      <h2>Professores Envolvidos</h2>
      <table class="tabela-professores">
        <thead>
          <tr>
            <th>Email</th>
            <th>Disciplina</th>
            <th>Turma</th>
            <th>Matrícula</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prof in processo.professorEnrollments" :key="prof._id">
            <td>{{ prof.professorEmail }}</td>
            <td>{{ prof.subjectCode }}</td>
            <td>{{ prof.classCode }}</td>
            <td>{{ prof.registrationNumber }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="processo.studentEnrollments.length" class="alunos">
      <h2>Alunos Matriculados</h2>
      <table class="tabela-alunos">
        <thead>
          <tr>
            <th>Email</th>
            <th>Disciplina</th>
            <th>Turma</th>
            <th>Matrícula</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="aluno in processo.studentEnrollments" :key="aluno._id">
            <td>{{ aluno.studentEmail }}</td>
            <td>{{ aluno.subjectCode }}</td>
            <td>{{ aluno.classCode }}</td>
            <td>{{ aluno.registrationNumber }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="processo.subjects.length" class="disciplinas">
      <h2>Disciplinas</h2>
      <table class="tabela-disciplinas">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Período</th>
            <th>Data Início</th>
            <th>Data Fim</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="disc in processo.subjects" :key="disc._id">
            <td>{{ disc.code }}</td>
            <td>{{ disc.name }}</td>
            <td>{{ disc.category }}</td>
            <td>{{ disc.periodId }}</td>
            <td>{{ formatarData(disc.startDate) }}</td>
            <td>{{ formatarData(disc.endDate) }}</td>
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
    const processo = ref({
      etapas: [],
      arquivos: [],
      professorEnrollments: [],
      studentEnrollments: [],
      users: [],
      classes: [],
      subjects: []
    })

    const carregarDetalhes = async () => {
      try {
        const id = route.params.id
        const res = await api.get(`/process/${id}`)

        processo.value = {
          id: res.data.process._id,
          status: res.data.process.currentStatus,
          periodoLetivo: res.data.schoolPeriod.name,
          dataInicio: res.data.schoolPeriod.startDate,
          dataFim: res.data.schoolPeriod.endDate,
          etapas: res.data.etapas ?? [],
          arquivos: res.data.arquivos ?? [],
          professorEnrollments: res.data.professorEnrollments ?? [],
          studentEnrollments: res.data.studentEnrollments ?? [],
          users: res.data.users ?? [],
          classes: res.data.classes ?? [],
          subjects: res.data.subjects ?? []
        }
      } catch (err) {
        console.error('Erro ao buscar detalhes do processo:', err)
      }
    }

    const formatarData = (data) => {
      if (!data) return '-'
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
