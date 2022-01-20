import React, {useContext, useMemo} from 'react';
import {LocalizationContext} from '../../providers/LocalizationProvider';
import {toFixed} from '../../../utils/toFixed';
import {getRoundingRules} from '../../../utils/getRoundingRules';
import {Rounding} from '../../../utils/Rounding';

interface FormattedNumberProps {
  value: any,
  rounding?: Rounding,
}

export const FormattedNumber: React.FC<FormattedNumberProps> = ({value, rounding}) => {
  const localizationContext = useContext(LocalizationContext);

  const formattedText = useMemo(() => {
    const rules = getRoundingRules(rounding);
    return toFixed(value, rules.precision, rules.method);
  }, [value, rounding, localizationContext.locale]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
      <>
        {formattedText}
      </>
  );

};
