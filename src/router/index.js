import { createRouter, createWebHistory } from 'vue-router';
import CsvUploadView from '@/views/CsvUploadView.vue';
import Turma from '@/views/Turma.vue';
import Professores from '@/views/Professores.vue';
import ViculoAluno from '@/views/VinculoAluno.vue';
import VinculoProfessor from '@/views/VinculoProfessor.vue';
import viewPrincipal  from '@/views/viewPrincipal.vue';
import viewSecundaria from '@/views/viewSecundaria.vue';

const routes = [
  { path: '/csv', component: CsvUploadView },

  {path: '/Turma', component: Turma},
  {path: '/Professores', component: Professores},
  {path: '/VinculoAluno', component: ViculoAluno },
  {path: '/VinculoProfessor', component: VinculoProfessor},
  {path: '/', component: viewPrincipal},

  {path: '/secundaria', component: viewSecundaria}

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
