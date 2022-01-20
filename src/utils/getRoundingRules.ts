import config from '../config';
import {Rounding} from './Rounding';

export const getRoundingRules = (
    rounding: Rounding
): {
  precision: number,
  method: 'round' | 'floor'
} => {
  // if precision is specified, just use it. Otherwise try to get the precision set for the symbol. Use default if nothing worked.
  let precision: number = 6; // default
  let method: 'round' | 'floor' = 'round'; // default
  if (!!rounding) {
    if (rounding.precision >= 0) {
      precision = rounding.precision;
    }
    else if (rounding.market) {
      precision = config.markets.hasOwnProperty(rounding.market) ?
          config.markets[rounding.market].pricePrecision :
          config.markets['default'].pricePrecision;
    }
    else if (rounding.symbol) {
      precision = config.symbols.hasOwnProperty(rounding.symbol) ?
          config.symbols[rounding.symbol].amountPrecision :
          config.symbols['default'].amountPrecision;
    }
    method = rounding.method || method;
  }

  return {
    precision: precision,
    method: method
  };
};