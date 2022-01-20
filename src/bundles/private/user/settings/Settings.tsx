import React, {useState} from 'react';
import {RouteComponentProps} from '@reach/router';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {PageWrap} from '../../components/common/Pages';
import {ChangePassword} from './ChangePassword';
import {Security} from './Security';

interface SettingsProps extends RouteComponentProps {
	tabNo?: string;
}

export const Settings: React.FC<SettingsProps> = (props) => {

	const [selectedTab, setSelectedTab] = useState(props.tabNo ? parseInt(props.tabNo) : 0);

	return (
		<PageWrap>
			<Tabs
				value={selectedTab}
				indicatorColor="primary"
				textColor="primary"
				variant="scrollable"
				scrollButtons="auto"
				onChange={(event: React.ChangeEvent<{}>, newValue: number) => setSelectedTab(newValue)}
			>
				<Tab label="Change Password"/>
				<Tab label="Security"/>
			</Tabs>
			<div style={{padding: '16px 0 0 0', height: 'calc(100% - 48px)'}}>
				{selectedTab === 0 && <ChangePassword/>}
				{selectedTab === 1 && <Security/>}
			</div>
		</PageWrap>
	)
};
