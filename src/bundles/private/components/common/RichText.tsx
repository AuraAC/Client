import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ClassProps {
	text: string;
	onChange: (text: any) => void;
}

export class RichText extends React.Component<ClassProps> {

	constructor(props: ClassProps) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	private handleChange(value: string) {
		this.props.onChange(value);
	}

	render() {
		return (
			<ReactQuill
				theme="snow"
				value={this.props.text}
				onChange={this.handleChange}
			/>
		)
	}
}
