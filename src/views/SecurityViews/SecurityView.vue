<template>
  <BaseHeader />

  <main class="main">
    <div class="container security__container">
      <ul class="security__list-tabs list-reset">
        <li class="security__item-tab">
          <a class="security__link-tab" :class="{ 'tab--active': currentTab === UISecurityListWrapper }"
            @click="changeTab(UISecurityListWrapper)">
            Задачи
          </a>
        </li>
        <li class="security__item-tab">
          <a class="security__link-tab" :class="{ 'tab--active': currentTab === UISecurityAnalitics }"
            @click="changeTab(UISecurityAnalitics)">
            Статистика
          </a>
        </li>
      </ul>

      <Transition name="shift" mode="out-in">
        <component :is="currentTab" />
      </Transition>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, markRaw, ref, provide, onUnmounted } from 'vue';

import { useGuardUserStore } from '@/stores/useGuardUser';

import UISecurityListWrapper from '@/components/UI/UISecurityListWrapper.vue';
import UISecurityAnalitics from '@/components/UI/UISecurityAnalitics.vue';
import BaseHeader from '@/components/BaseHeader.vue';

const store = useGuardUserStore();

const currentTab = ref<any>(markRaw<any>(UISecurityListWrapper));

const changeTab = (tab: any) => currentTab.value = markRaw(tab);

provide('tab', currentTab);

const getTasksArr = [store.getTasksData, store.getAllTasksData, store.getImmediateTasksData];

const enumerationTasksFunc = () => {
  getTasksArr.forEach((func) => func());
};

const updateTasks = setInterval(enumerationTasksFunc, 5000)

onMounted(() => {
  store.getTasksData();
  store.getAllTasksData();
  store.getImmediateTasksData();
});

onUnmounted(() => {
  clearInterval(updateTasks);
});
</script>
