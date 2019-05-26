import { ConnectionStatus } from './enums';
import { ITwitchState } from './twitch/state';


export type ConfigState = Readonly<{
  hasInitialized: boolean;
  completingSetup: boolean;
  connection: ConnectionStatus;
  twitch: ITwitchState;
  appearance: Readonly<{
    decklist: Readonly<{
      width: number;
      tileHeight: number;
    }>;
  }>;
}>;

export const configInitialState: ConfigState = {
  hasInitialized: false,
  completingSetup: false,
  connection: ConnectionStatus.UNKNOWN,
  twitch: { context: null, authorized: null },
  appearance: {
    decklist: {
      width: 260,
      tileHeight: 32,
    },
  },
};
