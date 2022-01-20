import React from "react";
import styled from "styled-components";
import {ReactComponent as ClipIcon} from "../../../../assets/clip.svg";
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import {Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const Control = styled.div`
`;

const HiddenInput = styled.input`
  display: none;  
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
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

const TypographyError = styled(Typography)`
  color: #B00020;
`;

interface ClassProps {
	label?: string;
	onChange?: (e: any, info?: any) => void;
	errText?: string | null;
	variant?: 'text' | 'outlined' | 'contained';
	buttonStyle?: any;
}

type ClassState = {
	fileName: string | null,
	imgWidth: number | null,
	imgHeight: number | null
};

export class SimpleFileUploaderImg extends React.Component<ClassProps, ClassState> {
	private fileInputRef: any;

	constructor(props: ClassProps) {
		super(props);
		this.state = {
			fileName: '',
			imgWidth: null,
			imgHeight: null
		};
		this.fileInputRef = React.createRef();
		this._handleChange = this._handleChange.bind(this);
		this._handleClick = this._handleClick.bind(this);
		this._cancelClick = this._cancelClick.bind(this);
	}

	private _lmgSizeSync = async (file: any) => {
		return new Promise((resolve, reject) => {
			const _URL = window.URL || window.webkitURL;
			let img = new Image();
			const objectUrl = _URL.createObjectURL(file);
			img.onload = async () => {
				const width = img.width;
				const height = img.height;
				_URL.revokeObjectURL(objectUrl);
				resolve({width: width, height: height});
			};
			img.onerror = async () => {
				resolve({width: -1, height: -1});
			};
			img.src = objectUrl;
		});
	};

	private _handleChange = async (e: any) => {
		e.persist();
		try {
			let fileName = '';
			let imgWidth = null;
			let imgHeight = null;

			try {
				fileName = e.target.files[0].name;
			} catch (ignored) {
			}

			try {
				const imgSizeSync: any = await this._lmgSizeSync(e.target.files[0])
				imgWidth = imgSizeSync.width;
				imgHeight = imgSizeSync.height;
			} catch (ignored) {
			}

			this.setState({
				fileName: fileName,
				imgWidth: imgWidth,
				imgHeight: imgHeight
			});
			if (this.props.onChange) {
				this.props.onChange(e, {imgWidth: imgWidth, imgHeight: imgHeight});
			}
		} catch (ex) {
			this.setState({
				fileName: '',
				imgWidth: null,
				imgHeight: null
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

	render() {
		return (
			<Control>
				<HiddenInput
					type="file"
					ref={ref => this.fileInputRef = ref}
					onChange={(e) => this._handleChange(e)}
				/>
				{this.props.errText
					?
					<FileInfo>
						<StyledErrorIcon/>
						<TypographyError variant={'caption'}>{this.props.errText}</TypographyError>
					</FileInfo>
					: this.state.fileName
						?
						<FileInfo>
							<StyledClipIcon/>
							<Typography variant={'h6'}>{this.state.fileName}</Typography>
							<CancelButton
								onClick={() => this._cancelClick()}
							>
								<StyledCancelIcon/>
							</CancelButton>
						</FileInfo>
						: null
				}
				<Button
					variant={this.props.variant ? this.props.variant : 'contained'}
					color="primary"
					size={"large"}
					style={this.props.buttonStyle}
					onClick={this._handleClick}
				>
					{this.props.label ? this.props.label : 'upload'}
				</Button>

			</Control>
		)
	}
}
