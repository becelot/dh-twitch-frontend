import { CardData } from 'hearthstonejson-client';

export type HearthDB = {
  [id: number]: CardData;
};

export enum HearthstoneDbState {
  UNKNOWN,
  PENDING,
  LOADED,
  ERROR,
}

export type IHearthstoneDb = Readonly<{
  status: HearthstoneDbState;
  error?: string;
  cards: HearthDB;
}>;

export const initialHsState: IHearthstoneDb = {
  status: HearthstoneDbState.UNKNOWN,
  cards: {},
};

