/* @flow */
/* eslint-disable camelcase */

import { type ____DangerouslyImpreciseStyleProp_Internal } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import type { WorkoutSetSchemaType } from './database/types';

// Shared types
export type StylePropType = ____DangerouslyImpreciseStyleProp_Internal;

export type NavigateType = (
  route: string,
  params?: { [key: string]: mixed }
) => void;

// TODO replace this type for flow-typed react-navigation 2
export type NavigationType = {
  addListener: (
    type: 'willBlur',
    () => void
  ) => {
    remove: () => void,
  },
  push: (route: string, params?: { [key: string]: mixed }) => void,
  navigate: NavigateType,
  // eslint-disable-next-line flowtype/no-weak-types
  setParams: (params: { [key: string]: any }) => void,
  goBack: (routeKey?: ?string) => boolean,
  dispatch: (() => void) => void,
};

export type RouteType<T> = {
  params: T,
};

export type DispatchType<T> = {
  type: string,
  payload: T,
};

export type CategoryType = {|
  id: string,
  name: string,
|};

export type ExerciseLog = {|
  sets: Array<WorkoutSetSchemaType>,
|};

export interface RealmResults<T> extends Array<T> {
  addListener: (
    fn: (
      data: RealmResults<T>,
      changes: {
        insertions: number[],
        modifications: number[],
        deletions: number[],
      }
    ) => void
  ) => void;
  removeAllListeners: () => void;
}
