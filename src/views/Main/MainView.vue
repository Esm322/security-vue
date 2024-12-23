<template>
  <BaseHeader>
    <BaseDropMenu />
  </BaseHeader>

  <main class="main">
    <div class="container main__container">
      <div class="main__info">
        <InfoSVG />

        <ul class="main__list-info list-reset">
          <li class="main__item-info">
            Укажите точку на карте, где произошло правонарушение
          </li>
          <li class="main__item-info">
            Кнопка SOS служит для незамедлительного реагирования
          </li>
        </ul>

        <SosBtn />
      </div>

      <div class="main__wrapper-map">
        <BaseMapUser />

        <Transition name="fade">
          <BaseForm v-if="coordinates" />
        </Transition>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/useUser';

import BaseMapUser from '@/components/BaseMapUser.vue';
import BaseForm from '@/components/BaseForm.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import BaseDropMenu from '@/components/BaseDropMenu.vue';
import SosBtn from '@/components/SosBtn.vue';
import InfoSVG from '@/components/SVG/InfoSVG.vue';

const store = useUserStore();
const { coordinates } = storeToRefs(store);
</script>
