import { createRouter, createWebHistory } from 'vue-router'

import PreMainView from '@/views/PreMainView.vue';
import MainView from '@/views/Main/MainView.vue';
import SecurityView from '@/views/SecurityViews/SecurityView.vue';
import TaskView from '@/views/SecurityViews/TaskView.vue';
import ImmediateTaskView from '@/views/SecurityViews/ImmediateTaskView.vue';
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
    },
    {
      name: 'Task',
      component: TaskView,
      path: '/task/:id'
    },
    {
      name: 'ImmediateTask',
      component: ImmediateTaskView,
      path: '/immediate_task/:id'
    }
  ]
})

export default router
