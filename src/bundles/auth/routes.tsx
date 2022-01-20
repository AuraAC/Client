import React from "react";
import {Login} from "./components/Login";
import {Signup} from "./components/Signup";
import {ForgotPassword} from "./components/ForgotPassword";
import {ConfirmEmail} from "./components/ConfirmEmail";
import {ConfirmDevice} from "./components/ConfirmDevice";
import {SetPassword} from './components/SetPassword';
import {Redirect, RouteComponentProps} from "@reach/router";

const Default: React.FC<RouteComponentProps> = () => {
	return <Redirect to={'./login'} />
};

export const routes = [
  <Login key="login" path="login"/>,
  <Signup key="signup" path="signup"/>,
  <ForgotPassword key="forgot-password" path="forgot-password"/>,
  <SetPassword key="new-password" path="new-password"/>,
  <SetPassword key="new-password" path="new-password/:token"/>,
  <ConfirmEmail key="confirm-email" path="confirm-email"/>,
  <ConfirmEmail key="confirm-email" path="confirm-email/:token"/>,
  <ConfirmDevice key="confirm-email" path="confirm-device"/>,
  <ConfirmDevice key="confirm-email" path="confirm-device/:token"/>,

	<Default key="default" path="def" />,
	<Redirect noThrow default key="default" from="/" to="/login" />
];
