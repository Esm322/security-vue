import type { LngLat } from '@yandex/ymaps3-types';

export interface IUsers {
  id: number,
  email: string,
  fullname: string,
  password: string
}

export interface IGuards {
  id: number,
  guardLogin: string,
  guardFullname: string,
  password: string
}

export interface ITask {
  id: number,
  taskDate: Date,
  coordinates: ICoords[],
  taskDescription: string,
}

export interface ICoords {
  coordinates: LngLat,
  screenCoordinates: number[],
}
