import { createRouter, createWebHistory } from 'vue-router'

import { storeToRefs } from 'pinia';

import { useSecurityStore } from '@/stores/useSecurity';

import PreMainView from '@/views/PreMainView.vue';
import MainView from '@/views/Main/MainView.vue';
import SecurityView from '@/views/SecurityViews/SecurityView.vue';
import TaskView from '@/views/SecurityViews/TaskView.vue';
import ProfileView from '@/views/Main/ProfileView.vue';

import BaseFormLogin from '@/components/BaseFormLogin.vue';
import BaseFormRegistration from '@/components/BaseFormRegistration.vue';
import BaseFormGuardLogin from '@/components/BaseFormGuardLogin.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'premain',
      component: PreMainView,
      path: '/',
      children: [
        {
          name: 'login',
          component: BaseFormLogin,
          path: ''
        },
        {
          name: 'registration',
          component: BaseFormRegistration,
          path: ''
        },
        {
          name: 'guard-login',
          component: BaseFormGuardLogin,
          path: ''
        }
      ],
    },
    {
      name: 'Main',
      component: MainView,
      path: '/main',
      meta: {
        needAuth: true
      }
    },
    {
      name: 'Profile',
      component: ProfileView,
      path: '/profile'
    },
    {
      name: 'Security',
      component: SecurityView,
      path: '/security',
       meta: {
        needAuth: true
      }
    },
    {
      name: 'Task',
      component: TaskView,
      path: '/task:id'
    }
  ]
})

router.beforeEach((to, from) => {
  const store = useSecurityStore();
  const { isAuth } = storeToRefs(store);

  if (!isAuth.value && to.meta.needAuth) {
    return { name: 'login' }
  }
})

export default router
