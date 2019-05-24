

export type ITwitchState = Readonly<{
  context: Partial<TwitchExtContext> | null;
  authorized: TwitchExtAuthorized | null;
}>;

export const initialTwitchState: ITwitchState = {
  context: null,
  authorized: null,
};
