export const GLOBAL_PRECISION = 2;

export function round(a: number, b: number) {
	return Math.round(a * Math.pow(10, b)) / Math.pow(10, b);
}
