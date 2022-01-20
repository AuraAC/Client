import React, {useContext, useEffect, useState} from 'react';
import {Paper, Tab, Tabs} from '@material-ui/core';
import styled from 'styled-components';

const RootComponent = styled(Paper)`
  display: flex;
  flex-direction: column;
`;

interface TabPanelProps {
  tabs: string[];
  width: number;
  height: number;
  top: number;
  left: number;
  variant?: 'scrollable' | 'standard' | 'fullWidth';
  children?: React.ReactNode[];
}

export const TabPanel: React.FC<TabPanelProps> = ({
                                                    tabs,
                                                    width,
                                                    height,
                                                    top,
                                                    left,
                                                    variant,
                                                    children
                                                  }) => {

  const [activeTab, setActiveTab] = useState<number>(0);
  const visibleTab = children[activeTab];

  const processActiveTab = (tab: number) => {
    setActiveTab(tab);
    // if (tabs[0] === 'Buy') {
    //   tradeProContext.setOrder({
    //     type: null,
    //     price: '',
    //     amount: '',
    //     total: ''
    //   });
    // }
  };

  return (
    <RootComponent
      style={{position: 'absolute', width: `${width}px`, height: `${height}px`, top: `${top}px`, left: `${left}px`}}
      elevation={0}>
      <Tabs
        variant={variant}
        value={activeTab}
        onChange={(event: React.ChangeEvent<{}>, value: number) => {
          processActiveTab(value);
        }}
        className={`active-tab-${activeTab}`}
      >
        {tabs.map((tab, i) => <Tab
          key={i}
          label={tab}
          draggable/>)}
      </Tabs>
      {visibleTab}
    </RootComponent>
  );
};
