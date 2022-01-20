export const copyTextToClipboard = (text: string) => {
	try {
		if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
			const textArea = (document.createElement('textArea') as HTMLInputElement);
			textArea.readOnly = true;
			textArea.contentEditable = 'true';
			textArea.value = text;
			document.body.appendChild(textArea);

			const range = document.createRange();
			range.selectNodeContents(textArea);
			const selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
			textArea.setSelectionRange(0, 999999);

			document.execCommand('copy');
			document.body.removeChild(textArea);
			return Promise.resolve();
		} else {
			return navigator.clipboard.writeText(text);
		}
	} catch (err) {
		console.debug("Can't copy to clipboard:", err);
	}
};
