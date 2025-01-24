import type { HideOutsideRule, LngLat } from '@yandex/ymaps3-types';

export interface IUsers {
  id: number,
  email: string,
  phone: string,
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
  task_id: number,
  task_date: string,
  task_userPhone: string,
  task_userFullname: string,
  task_description: string,
  task_status: boolean,
  task_title: string,
  coordinates: LngLat,
  screencoordinates: number[],
}

export interface IImmediateTask {
  task_id: number,
  task_date: string,
  task_userPhone: string,
  task_userFullname: string,
  task_status: boolean,
  task_title: string,
  coordinates: LngLat,
}

export interface ICoords {
  coordinates: LngLat,
  screenCoordinates: number[],
}

export interface IPosition {
  coordinates: LngLat
};

export interface ICoordinates {
  coordinates: LngLat
  screencoordinates?: number[],
  source?: string;
  zIndex?: number;
  properties?: Record<string, unknown>;
  id?: string;
  disableRoundCoordinates?: boolean;
  hideOutsideViewport?: HideOutsideRule,
}
