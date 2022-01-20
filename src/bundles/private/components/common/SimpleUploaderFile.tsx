import React from "react";
import styled from "styled-components";
import {ReactComponent as ClipIcon} from "../../../../assets/clip.svg";
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import {Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const Control = styled.div`
 display: flex;
 align-items: center;
`;

const HiddenInput = styled.input`
  display: none;  
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  // margin-bottom: 10px;
  margin-left: 20px;
`;

const StyledClipIcon = styled(ClipIcon)`
  margin-right: 10px;
`;

const CancelButton = styled(IconButton)`
  padding: 0;
  margin: 0 0 0 8px;
`;

const StyledCancelIcon = styled(CancelIcon)`  
  width: 12px;
  height: 12px;
`;

const StyledErrorIcon = styled(ErrorIcon)`  
  width: 20px;
  height: 20px;  
  color: #B00020;
  margin-right: 10px;
`;

const ErrorText = styled(Typography)`
  color: #B00020;
`;

interface ClassProps {
  label?: string;
  onChange?: (e: any, info?: any) => void;
  errText?: string|null;
  variant?: 'text' | 'outlined' | 'contained';
  buttonStyle?: any;
}

type ClassState = {
  fileName: string | null,
};

export class SimpleFileUploader extends React.Component<ClassProps, ClassState> {
  private fileInputRef: any;

  constructor(props: ClassProps) {
    super(props);
    this.state = {
      fileName: ''
    };
    this.fileInputRef = React.createRef();
    this._handleChange = this._handleChange.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._cancelClick = this._cancelClick.bind(this);
    this.clear = this.clear.bind(this);
  }

  private _handleChange = async (e: any) => {
    e.persist();
    try {
      let fileName = '';

      try {
        fileName = e.target.files[0].name;
      } catch (ignored) {}

      this.setState({
        fileName: fileName,
      });

      if (this.props.onChange) {
        this.props.onChange(e);
      }
    } catch (ex) {
      this.setState({
        fileName: ''
      });
    }
  };

  private _handleClick() {
    this.fileInputRef.click();
  };

  private _cancelClick() {
    this.setState({fileName: null});
    if (this.props.onChange) {
      this.props.onChange(null);
    }
  };

  public clear() {
		this.setState({fileName: null});
	}

  render() {
    return (
      <Control>
        <HiddenInput
          type="file"
          ref={ref => this.fileInputRef = ref}
          onChange={(e) => this._handleChange(e)}
        />
        <Button
          variant={this.props.variant ? this.props.variant : 'contained'}
          color="primary"
          size={"large"}
          style={this.props.buttonStyle}
          onClick={this._handleClick}
        >
          {this.props.label ? this.props.label : 'upload'}
        </Button>
				{ this.props.errText ? (
					<FileInfo>
						<StyledErrorIcon />
						<ErrorText variant={'caption'}>{this.props.errText}</ErrorText>
					</FileInfo>
				) : this.state.fileName ? (
					<FileInfo>
						<StyledClipIcon/>
						<Typography variant={'h6'}>{this.state.fileName}</Typography>
						<CancelButton
							onClick={() => this._cancelClick()}
						>
							<StyledCancelIcon/>
						</CancelButton>
					</FileInfo>
				) : null }

      </Control>
    )
  }
}
