export const handleFileChange = (e: any, setter: any, errSetter: any, params?: any) => {
	if (e && e.preventDefault) e.preventDefault();

	let reader = new FileReader();
	let file: any;
	try {
		file = e.target.files[0];
	} catch (er) {
		setter(null);
		return;
	}

	if (params && params.maxSize && file.size > params.maxSize) {  // 5 * 1024 * 1024
		errSetter('Maximum file size is 5 Mb!');
		return;
	}

	errSetter(null);

	reader.onloadend = () => {
		setter({
			info: file,
			data: reader.result
		});
	};

	try {
		reader.readAsDataURL(file)
	} catch (ignored) {
	}
};
