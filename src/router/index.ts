import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/router/routes';
import { authGuard } from '@/router/authGuard';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(authGuard);

export default router;
