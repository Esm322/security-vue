import { ref } from 'vue';

import type { IPosition } from '@/interfaces/dataInterfaces';

export default function useCurrentPosition() {
  const currPosition = ref<IPosition[] | null>([]);

  const getPosition = () => {
    navigator.geolocation.getCurrentPosition(position => {
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

  return {
    currPosition,
    getPosition,
  };
}
