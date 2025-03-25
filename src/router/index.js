import { createRouter, createWebHistory } from 'vue-router';
import CsvUploadView from '@/views/CsvUploadView.vue';

const routes = [
  { path: '/', component: CsvUploadView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
