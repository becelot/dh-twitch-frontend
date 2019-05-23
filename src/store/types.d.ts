import { ActionType, StateType } from 'typesafe-actions';

declare module 'Types' {
  export type RootAction = ActionType<typeof import('./root-actions').default>;
  export type RootState = StateType<typeof import('./root-reducer').default>;
}

declare module 'typesafe-actions' {
  interface Types {
    RootAction: ActionType<typeof import('./root-actions').default>;
  }
}
