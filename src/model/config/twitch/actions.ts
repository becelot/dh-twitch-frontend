import { createCustomAction } from 'typesafe-actions';


const twitchActions = {
  setTwitchExtAuthorized: createCustomAction('SET_TWITCH_EXT_AUTHORIZATION', type => {
    return (authorized: TwitchExtAuthorized) => ({ type, authorized: authorized });
  }),
  setTwitchExtContext: createCustomAction('SET_TWITCH_EXT_CONTEXT', type => {
    return (context: Partial<TwitchExtContext>) => ({type, context});
  }),
};

export default twitchActions;
