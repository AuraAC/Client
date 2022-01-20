/**
 * Stub for localization context provider. All future related logic should go here (i.e. translation of the UI labels)
 */

import React, {Context} from 'react';

export interface LocalizationContextProps {
  locale: string;
}

export const LocalizationContext: Context<LocalizationContextProps> = React.createContext(null);

export const LocalizationProvider: React.FC = ({children}) => {

  return (
      <LocalizationContext.Provider value={{
        locale: 'en-US'
      }}>
        {children}
      </LocalizationContext.Provider>
  );
};
