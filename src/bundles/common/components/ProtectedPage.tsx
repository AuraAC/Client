import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../../core/providers/AuthProvider';
import {Redirect, RouteComponentProps} from '@reach/router';
// import {UserRole} from "../../../store/generated-models";

interface ProtectedContentProps extends RouteComponentProps {
	pageComponent: any;
	requireRole?: string
}

// export const ProtectedPage: React.FC<ProtectedContentProps> = ({pageComponent, requireRole}) => {
export const ProtectedPage: React.FC<ProtectedContentProps> = ({pageComponent}) => {
	const authContext = useContext(AuthContext);

	const [authState, setAuthState] = useState<'loading' | 'allowed' | 'rejected'>('loading');

	useEffect(() => {
		if (authContext.isInitialized) {
			if (
				authContext.user && authContext.user.userId
				// && (!requireRole || (authContext.user.roles && authContext.user.roles.includes(requireRole)))
			) {
				setAuthState('allowed');
			} else {
				setAuthState('rejected');
			}
		} else {
			setAuthState('loading');
		}
	// }, [authContext.user, requireRole, authContext.isInitialized]); // eslint-disable-line react-hooks/exhaustive-deps
	}, [authContext.user, authContext.isInitialized]); // eslint-disable-line react-hooks/exhaustive-deps

	if (authState === 'loading') {
		return null;
	}

	if (authState === 'allowed') {
		return <>{pageComponent}</>;
	}

	return <Redirect from="" to="/" noThrow/>;

};
