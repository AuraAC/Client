import {InMemoryCache} from 'apollo-boost';

const initialData: { [attribute: string]: any } = {
  appState: {
    __typename: 'AppState',
    isFullScreen: false,
    isProMode: true,
    isRealTrading: true,
    isSideBarCollapsed: false,
    currentMarket: null
  }
};

export const initLocalCache = (cache: InMemoryCache) => {
  // console.debug('initLocalCache');
  cache.writeData({data: initialData});
};
