const OPTIONS_DT: Intl.DateTimeFormatOptions = {
	// day: "numeric", month: "numeric", year: "numeric",
	day: "2-digit", month: "2-digit", year: "numeric",
	hour: "2-digit", minute: "2-digit"
};

const OPTIONS_D: Intl.DateTimeFormatOptions = {
	day: "2-digit", month: "2-digit", year: "numeric"
};

export const formatValue = (value: any) => {
	if (typeof value === 'number') return value;

	if (typeof value === 'boolean') return value ? 'Y' : 'N';

	if (Array.isArray(value)) return value.join(', ');

	// const pDate = Date.parse(value);
	// if (pDate) {
	// 	const date = new Date(pDate);
	// 	return new Intl.DateTimeFormat('de-DE', OPTIONS_DT).format(date);
	// }

	if (typeof value === 'string' && value.length === 24 && value.substr(23, 1) === 'Z') {
		const date = new Date(value);
		return new Intl.DateTimeFormat('de-DE', OPTIONS_DT).format(date);
	}

	return value;
};

export const formatDateTime = (value: any) => {
	const pDate = Date.parse(value);
	if (pDate) {
		const date = new Date(pDate);
		// return date.toLocaleDateString("en-GB", OPTIONS_DT);
		// return date.toLocaleString('en-GB')
		// return new Intl.DateTimeFormat().format(date);
		return new Intl.DateTimeFormat('de-DE', OPTIONS_DT).format(date);
	}

	return value;
};

export const formatDate = (value: any) => {
	const pDate = Date.parse(value);
	if (pDate) {
		const date = new Date(pDate);
		return new Intl.DateTimeFormat('de-DE', OPTIONS_D).format(date);
	}

	return value;
};

export const formatAmount = (value: any, rnd?: number) => {
	const round = rnd ? rnd : 2;
	try {
		return new Intl.NumberFormat('en-EN', {
			minimumFractionDigits: round,
			maximumFractionDigits: round
		}).format(value);
	} catch {}

	return value;
};


