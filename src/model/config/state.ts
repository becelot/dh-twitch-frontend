import { ConnectionStatus } from './enums';
import { ITwitchState } from './twitch/state';


export type ConfigState = Readonly<{
  hasInitialized: boolean;
  completingSetup: boolean;
  connection: ConnectionStatus;
  twitch: ITwitchState;
}>;

export const configInitialState: ConfigState = {
  hasInitialized: false,
  completingSetup: false,
  connection: ConnectionStatus.UNKNOWN,
  twitch: { context: null, authorized: null },
};
