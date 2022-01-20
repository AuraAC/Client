import React, {useContext, useEffect, useState} from "react";
import {navigate, RouteComponentProps} from '@reach/router';
import {useMutation} from "@apollo/react-hooks";
import {MutationConfirmDeviceArgs} from "../../../store/generated-models";
import {gql} from "apollo-boost";
import {FormContent} from "../elements/FormContent";
import {SubmitButton} from "../elements/SubmitButton";
import {AuthContext} from '../../../core/providers/AuthProvider';

interface ConfirmDeviceProps extends RouteComponentProps {
  token?: string
}

export const ConfirmDevice: React.FC<ConfirmDeviceProps> = (props) => {
  const [state, setState] = useState('validating');

  const authContext = useContext(AuthContext);

  const [confirmEmail] = useMutation<{ confirmDevice: boolean }, MutationConfirmDeviceArgs>(gql`
      mutation ConfirmDevice(
          $token: String!,
          $recaptcha: String!
      ) {
          confirmDevice (
              token: $token,
              recaptcha: $recaptcha
          )
      }
  `);

  // Check if the confirmation authToken is provided and valid
  useEffect(() => {
    if (!!props.token) {
      authContext.updateRecaptcha()
      .then((recaptchaToken) => {
        confirmEmail({
          variables: {
            token: props.token,
            recaptcha: recaptchaToken
          }
        })
        .then((res) => {
          if (res.data.confirmDevice) {
            setState('confirmed');
          } else {
            setState('error');
          }
        })
        .catch(() => {
          setState('error');
        });
      })
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  /* ### RENDER ### */
  let dialogContent: JSX.Element = null;


  if (!props.token) {
    dialogContent = (
        <>
          <div style={{textAlign: 'center'}}>You need device validation token to continue</div>
          <SubmitButton onClick={() => {
            navigate('/');
          }}>Back to the homepage</SubmitButton>
        </>
    );
  } else {
    if (state === 'validating') {
      dialogContent = (
          <div>Validating confirmation...</div>
      );
    } else if (state === 'error') {
      dialogContent = (
          <>
            <div style={{textAlign: 'center'}}>
              <p>Can't confirm the new device.</p>
              <p>Make sure you're using the latest received confirmation email.</p>
            </div>
            <SubmitButton onClick={() => {
              navigate('/');
            }}>Back to the homepage</SubmitButton>
          </>
      );
    } else if (state === 'confirmed') {
      dialogContent = (
          <>
            <div style={{textAlign: 'center'}}>
              <p>Device confirmed successfully</p>
              <p>You can log in now</p>
            </div>
            <SubmitButton onClick={() => {
              navigate('/login').then();
            }}>Log in</SubmitButton>
          </>
      );
    }
  }

  return (
      <FormContent>
        {dialogContent}
      </FormContent>
  )
};
