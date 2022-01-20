import {Rounding} from './Rounding';
import {toFixed} from "./toFixed";
import {getRoundingRules} from './getRoundingRules';

export const getRoundedValue = (
  value: any,
  rounding: Rounding,
): string => {
  const rules = getRoundingRules(rounding);
  return toFixed(value, rules.precision, rules.method);
};
