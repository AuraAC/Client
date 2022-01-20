import React from 'react';
import {ProtectedPage} from './bundles/common/components/ProtectedPage';
import {Auth} from './bundles/auth/components/Auth';
import {Sandbox} from './bundles/sandbox/Sandbox';
import {Private} from './bundles/private/Private';

export const routes = [
  <Auth key="auth" path="/"/>,
  <Auth key="auth" path="/*"/>,
  <ProtectedPage key="private" path="/private/*" pageComponent={<Private/>} />,
  // <ProtectedPage key="admin" path="/admin" requireRole={UserRoles.administrator} pageComponent={<Admin/>} />,
  <Sandbox key="sandbox" path="/sandbox"/>,
];
