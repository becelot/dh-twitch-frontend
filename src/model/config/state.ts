import { ConnectionStatus } from './enums';
import { initialTwitchState, ITwitchState } from './twitch/state';


export type ConfigState = Readonly<{
  state: Readonly<{
    hasInitialized: boolean;
    completingSetup: boolean;
    connection: ConnectionStatus;
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
    completingSetup: false,
    connection: ConnectionStatus.UNKNOWN,
  },
  twitch: initialTwitchState,
  appearance: {
    decklist: {
      width: 260,
      tileHeight: 32,
    },
  },
};
