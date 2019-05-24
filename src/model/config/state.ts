import { ConnectionStatus } from './enums';


export type ConfigState = Readonly<{
  hasInitialized: boolean;
  completingSetup: boolean;
  connection: ConnectionStatus;
  twitch: Readonly<{
    context: Partial<TwitchExtContext> | null;
    authorized: TwitchExtAuthorized | null;
  }>;
}>;

export const initialState: ConfigState = {
  hasInitialized: false,
  completingSetup: false,
  connection: ConnectionStatus.UNKNOWN,
  twitch: { context: null, authorized: null },
};
