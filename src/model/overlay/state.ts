

export interface IDeck {
  name: string;
  code: string;
}

export interface IRootDeck extends IDeck {
  versions: ReadonlyArray<Readonly<IDeck>>;
}

export enum OverlayState {
  UNKNOWN,
  IDLE,
  REQUEST_PENDING,
  REQUEST_ERROR,
}

export type IOverlayState = Readonly<{
  status: OverlayState;
  error: string;
  currentDeckIndex: number;
  hasNext: boolean;
  hasPrevious: boolean;
  recentDecks: ReadonlyArray<IRootDeck>;
  allDecks: ReadonlyArray<IRootDeck>;
}>;

export const initialOverlayState: IOverlayState = {
  status: OverlayState.UNKNOWN,
  error: '',
  currentDeckIndex: 0,
  hasNext: false,
  hasPrevious: false,
  recentDecks: [],
  allDecks: [],
};
