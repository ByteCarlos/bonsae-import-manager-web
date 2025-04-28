import { createRouter, createWebHistory } from 'vue-router';
import CsvUploadView from '@/views/CsvUploadView.vue';
import viewPrincipal  from '@/views/viewPrincipal.vue';
import viewSecundaria from '@/views/viewSecundaria.vue';

const routes = [
  { path: '/csv', component: CsvUploadView },
  {path: '/', component: viewPrincipal},

  {path: '/secundaria', component: viewSecundaria}

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
