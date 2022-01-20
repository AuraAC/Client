// A better implementation of toFixed,
// taken from https://github.com/openexchangerates/accounting.js/blob/master/accounting.js (simplified)
// Why it's better? Try toFixed(1.5, 1) vs (1.5).toFixed(1) and toFixed(2.5, 1) vs (2.5).toFixed(1)

export const toFixed = (
    value: any,
    precision: number,
    method: 'round' | 'floor'
): string => {
  if ((typeof value) !== 'number') {
    value = parseFloat(value);
    if (isNaN(value)) {
      return '#';
    }
  }

  if (precision < 0 || precision > 12) {
    console.warn('unsupported number format presision: ', precision);
  }

  const exponentialForm = Number(value + 'e' + precision);
  const rounded = method === 'floor' ? Math.floor(exponentialForm) : Math.round(exponentialForm);
  const finalResult = Number(rounded + 'e-' + precision).toFixed(precision);

  return finalResult;
};
