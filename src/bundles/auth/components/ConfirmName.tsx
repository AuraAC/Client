import React, { useContext, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { FormContent } from "../elements/FormContent";
import { WelcomeText } from "../elements/WelcomeText";
import { AuthContext } from "../../../core/providers/AuthProvider";
import TextField from "@material-ui/core/TextField";
import { Button, FormControlLabel } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";

export interface ConfirmNameProps extends RouteComponentProps {
  name: string;
  token: string;
}

export const ConfirmName: React.FC<ConfirmNameProps> = (props) => {
  const [name, setName] = useState(props.name);
  const [termsOfUse, setTermsOfUse] = useState(true);

  const authContext = useContext(AuthContext);

  // const [confirmName] = useMutation<
  //   { confirmName: LoginResult },
  //   MutationConfirmNameArgs
  // >(gqlConfirmName);

  const onFormSubmit = (e: any) => {
    e.preventDefault();

    if (!termsOfUse) {
      authContext.showMessage(
        "error",
        "You need to agree with the terms and conditions"
      );
      return;
    }

    authContext
      .updateRecaptcha()
      .then((recaptchaToken) => {
        // confirmName({
        //   variables: {
        //     token: props.token,
        //     name: name,
        //     recaptcha: recaptchaToken,
        //   },
        // })
        //   .then((res) => {
        //     const loginData = res.data.confirmName;
        //     authContext.login(loginData);
        //   })
        //   .catch((error) => {
        //     authContext.showMessage("error", "Unknown error occurred");
        //   });
      })
      .catch(() => {
        console.warn("gr promise error");
      });
  };

  return (
    <>
      <WelcomeText>
        Please update your name if needed and agree with terms and conditions
      </WelcomeText>

      <form onSubmit={onFormSubmit} autoComplete="new-password">
        <FormContent>
          <TextField
            variant="outlined"
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <FormControlLabel
            style={{ marginTop: "12px", marginBottom: "12px" }}
            control={
              <Checkbox
                checked={termsOfUse}
                onChange={(e) => setTermsOfUse(e.target.checked)}
                color="primary"
              />
            }
            label={
              <span>
                I agree to the{" "}
                <a style={{ textDecoration: "underline" }} href="/home/legal">
                  terms and conditions
                </a>
              </span>
            }
          />

          {/*<SubmitButton type="submit" disabled={requestIsProcessing}>{true ? 'Continue' : 'Signing up...'}</SubmitButton>*/}
          <Button
            type="submit"
            // style={{marginTop: '24px', minWidth: '100px'}}
            variant="contained"
            color="primary"
            disabled={!termsOfUse || !name}
            fullWidth
            // onClick={() => setModalMessage(null)}
          >
            Continue
          </Button>

          {/*<SubmitButton*/}
          {/*	type="submit"*/}
          {/*	disabled={!termsOfUse || !name}*/}
          {/*>*/}
          {/*	Continue*/}
          {/*</SubmitButton>*/}
        </FormContent>
      </form>
    </>
  );
};
