import React from 'react';

interface TabContentProps {
  children?: React.ReactNode;
}

export const TabContent: React.FC<TabContentProps> = ({children, ...other}) => {

  return (
      <>
      {children}
      </>
  );
};
