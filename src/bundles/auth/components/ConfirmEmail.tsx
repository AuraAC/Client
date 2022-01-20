import React, {useContext, useEffect, useState} from "react";
import {navigate, RouteComponentProps} from '@reach/router';
import {useMutation} from "@apollo/react-hooks";
import {MutationConfirmEmailArgs} from "../../../store/generated-models";
import {gql} from "apollo-boost";
import {FormContent} from "../elements/FormContent";
import {AuthContext} from '../../../core/providers/AuthProvider';
import {Button} from "@material-ui/core";
import styled from "styled-components";

const TextBlockWrap = styled.div`
  text-align: center;
  margin-bottom: 12px;
`;

interface ConfirmEmailProps extends RouteComponentProps {
  token?: string
}

export const ConfirmEmail: React.FC<ConfirmEmailProps> = (props) => {
  const [state, setState] = useState('validating');

  const authContext = useContext(AuthContext);

  const [confirmEmail] = useMutation<{ confirmEmail: boolean }, MutationConfirmEmailArgs>(gql`
      mutation ConfirmEmail(
          $token: String!,
          $recaptcha: String!
      ) {
          confirmEmail (
              token: $token,
              recaptcha: $recaptcha
          )
      }
  `);

  // Check if the confirmation authToken is provided and valid
  useEffect(() => {

  	console.log('>>> ConfirmEmail START');

    if (!!props.token) {
      authContext.updateRecaptcha()
      .then((recaptchaToken) => {
				console.log('>>> sending confirmEmail', props.token, recaptchaToken);
        confirmEmail({
          variables: {
            token: props.token,
            recaptcha: recaptchaToken
          }
        })
        .then((res) => {

					console.log('>>> confirmEmail res', res);

          if (res.data.confirmEmail) {
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
          <TextBlockWrap>
            You need email validation token to continue
          </TextBlockWrap>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate('/').then()}
          >
            Back to the homepage
          </Button>
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
            <TextBlockWrap>
              <p>Can't confirm email.</p>
              <p>Make sure you're using the latest received confirmation email.</p>
            </TextBlockWrap>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate('/').then()}
            >
              Back to the homepage
            </Button>
          </>
      );
    } else if (state === 'confirmed') {
      dialogContent = (
          <>
            <TextBlockWrap>
              <p>Email confirmed successfully</p>
              <p>You can log in now</p>
            </TextBlockWrap>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate('/login').then()}
            >
              Log in
            </Button>
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
