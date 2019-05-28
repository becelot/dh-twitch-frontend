import { ConnectionStatus } from './enums';
import { initialTwitchState, ITwitchState } from './twitch/state';


export type ConfigState = Readonly<{
  state: Readonly<{
    hasInitialized: boolean;
    connection: ConnectionStatus;
    locale: string;
  }>;
  twitch: ITwitchState;
  appearance: Readonly<{
    decklist: Readonly<{
      width: number;
      tileHeight: number;
    }>;
  }>;
}>;

export const configInitialState: ConfigState = {
  state: {
    hasInitialized: false,
    connection: ConnectionStatus.UNKNOWN,
    locale: 'enUS',
  },
  twitch: initialTwitchState,
  appearance: {
    decklist: {
      width: 260,
      tileHeight: 32,
    },
  },
};
