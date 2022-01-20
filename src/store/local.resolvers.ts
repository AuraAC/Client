// import {Resolvers} from 'apollo-client';
import {AppState, MutationUpdateAppStateArgs, Query} from './generated-models';
import {gql, InMemoryCache} from 'apollo-boost';
import {initLocalCache} from './local-cache';

export const localResolvers = {
  Query: {},
  Mutation: {
    updateAppState: (_: any,
                     params: MutationUpdateAppStateArgs,
                     {cache}: { cache: InMemoryCache }
    ): AppState => {
      // console.debug('setAppState mutation', params);
      // get current state from cache

      const currentStateQuery = cache.readQuery<Query>({
        query: gql`
            query {
                appState @client {
                    isFullScreen
                    isProMode
                    isRealTrading
                    isSideBarCollapsed
                }
            }
        `
      }).appState;

      const newState: AppState = {
        ...currentStateQuery,
        ...params
      };

      cache.writeData({data: {appState: newState}});

      return newState;
    },
    processInitLocalCache: (
      _: any,
      params: void,
      {cache}: { cache: InMemoryCache }
    ): boolean => {
      initLocalCache(cache);
      return true;
    }
  }
};
