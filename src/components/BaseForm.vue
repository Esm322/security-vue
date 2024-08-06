<template>
  <form class="form">
    <label class="form__label">
      <textarea wrap="hard" minlength="20" cols="60" name="description" class="form__description"
        placeholder="Укажите правонарушение" required v-model="setDescription"></textarea>
    </label>
    <button class="form__btn-submit btn-reset">
      Отправить
    </button>
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  description: string
}>();

const emit = defineEmits<{
  (event: 'update:description', value: string): void,
}>();

const setDescription = computed({
  get: (): string => props.description,
  set: (val): void => emit('update:description', val),
});
</script>
