import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import IconCookie from "../../assets/cookie-icon.svg";
import IconTooltip from "../../assets/tooltip-icon.svg";
import { createStyles, Theme } from "@material-ui/core/styles";

interface CookiesPromptProps {
  isOpen: boolean;
  handleClose?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      height: "auto",
      minHeight: "340px",
      width: "95vw",
      maxWidth: "580px !important",
      display: "flex",
      justifyContent: "center",
      [theme.breakpoints.up("sm")]: {
        padding: "5px 30px",
      },
      [theme.breakpoints.down("xs")]: {
        padding: "30px 10px",
        alignItems: "center",
      },
      border: "1px solid #C1E5EF",
      borderRadius: "15px",
      margin: "10px !important",
    },
    tooltip: {
      fontSize: "14px",
      fontWeight: "normal",
    },
    actions: {
      justifyContent: "flex-start",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        "& > *": {
          margin: "5px !important",
        },
      },
    },
  })
);

const StyledDialogTitle = styled.div`
  font-weight: bold;
  font-size: 30px;
  padding: 8px;
`;

const CookieIcon = styled.img.attrs({ src: IconCookie })`
  width: 150px;
  height: 150px;
`;

const TooltipIcon = styled.img.attrs({ src: IconTooltip })`
  width: 20px;
  height: 20px;
  font-size: 14px;
  font-weight: normal;
`;

const DialogContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CookiesPrompt = ({ isOpen, handleClose }: CookiesPromptProps) => {
  const [isManaging, setManaging] = useState(false);

  const theme = useTheme();
  const media = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles();

  return (
    <Dialog
      classes={{
        paper: classes.paper,
      }}
      open={isOpen}
    >
      {media ? "" : <CookieIcon />}
      <StyledDialogTitle>Cookies</StyledDialogTitle>

      <DialogContent
        style={{
          padding: "8px",
          height: "fit-content",
          flex: "none",
        }}
      >
        <DialogContentWrapper>
          <DialogContentText
            style={{
              fontSize: "18px",
              width: media ? "330px" : "100%",
              textAlign: "justify",
            }}
            id="alert-dialog-description"
          >
            website uses cookies to provide you with the best user experience.{" "}
            {isManaging
              ? ""
              : "By clicking “I accept”, you consent to the use of all cookies."}
            Read more about the{" "}
            <a
              style={{ color: "rgba(0,0,0,0.60)", textDecoration: "underline" }}
              href="/home/legal"
            >
              principles of using cookies.
            </a>
          </DialogContentText>
          {media ? <CookieIcon /> : ""}
        </DialogContentWrapper>
        {isManaging ? (
          <FormGroup>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FormControlLabel
                control={<Checkbox disabled checked />}
                style={{
                  marginRight: "5px",
                  wordBreak: "break-word",
                  maxWidth: "90%",
                }}
                label="Cookies necessary for the operation of the site"
              />
              <Tooltip
                classes={{
                  tooltip: classes.tooltip,
                }}
                enterTouchDelay={0}
                leaveTouchDelay={4000}
                title={
                  "Cookies necessary for the operation of the site help us make the website more usable by activating basic features such as page navigation and accessing the secure parts of it. This website cannot function properly without  these cookies. As these cookies are required for the secure provision of services, the visitor does not have the option to opt out."
                }
              >
                <TooltipIcon />
              </Tooltip>
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                style={{ marginRight: "5px" }}
                label="Functional cookies"
              />
              <Tooltip
                classes={{
                  tooltip: classes.tooltip,
                }}
                enterTouchDelay={0}
                leaveTouchDelay={4000}
                title={
                  "Functional cookies allow websites to remember the user’s site preferences and choices they make on the site including username, region, and language."
                }
              >
                <TooltipIcon />
              </Tooltip>
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                style={{ marginRight: "5px" }}
                label="Statictical cookies"
              />
              <Tooltip
                classes={{
                  tooltip: classes.tooltip,
                }}
                enterTouchDelay={0}
                leaveTouchDelay={4000}
                title={
                  "Statistical cookies help us understand how a particular visitor uses the website. This gives us information on how many people visit the page in a given period of time, how different pages are navigated and clicked on."
                }
              >
                <TooltipIcon />
              </Tooltip>
            </div>
          </FormGroup>
        ) : (
          ""
        )}
      </DialogContent>
      <DialogActions classes={{ root: classes.actions }}>
        <Button
          style={{ padding: "20px" }}
          onClick={handleClose}
          size="large"
          variant="contained"
          color="primary"
        >
          I accept
        </Button>
        {isManaging ? (
          ""
        ) : (
          <Button
            style={{ padding: "20px", marginLeft: "20px" }}
            onClick={() => setManaging(true)}
            size="large"
            variant="contained"
          >
            Manage settings →
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CookiesPrompt;
