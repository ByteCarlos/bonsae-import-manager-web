import { createRouter, createWebHistory } from 'vue-router';
import CsvUploadView from '@/views/CsvUploadView.vue';
import viewPrincipal  from '@/views/viewPrincipal.vue';
import viewSecundaria from '@/views/viewSecundaria.vue';
import ProcessoView from '@/views/ProcessoView.vue';

const routes = [
  { path: '/csv', component: CsvUploadView },
  {path: '/', component: viewPrincipal},

  {path: '/secundaria', component: viewSecundaria},
  {path: '/detalhes', component: ProcessoView}

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
