import { ref, computed, onBeforeMount } from 'vue';

import type { IPosition } from '@/interfaces/dataInterfaces';
import type { LngLat } from '@yandex/ymaps3-types';

export default function useCurrentPosition() {
  const currPosition = ref<IPosition[] | null>([]);

  const getPosition = (): void => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      currPosition.value = [
        {
          coordinates: [
            longitude,
            latitude,
          ]
        }
      ];
    })
  };

  const cashedPosition = computed((): LngLat => {
    return currPosition.value ? currPosition.value?.flatMap((item) => item.coordinates) as LngLat : [38.9059877160469, 45.09556471071164] as LngLat;
  })

  onBeforeMount(() => {
    getPosition();
  })

  return {
    currPosition,
    cashedPosition,
  };
}
