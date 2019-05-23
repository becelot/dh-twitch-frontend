import { ConnectionStatus } from './enums';


export type ConfigState = Readonly<{
  hasInitialized: boolean;
  connection: ConnectionStatus;
}>;

export const initialState: ConfigState = {
  hasInitialized: true,
  connection: ConnectionStatus.UNKNOWN,
};
