import React, {useContext, useMemo} from 'react';
import {LocalizationContext} from '../../providers/LocalizationProvider';

interface FormattedPercentProps {
  value: any
}

export const FormattedPercent: React.FC<FormattedPercentProps> = ({value}) => {
  const localizationContext = useContext(LocalizationContext);

  const formattedText = useMemo(() => {
    let val = value;

    if ((typeof val) !== 'number') {
      val = parseFloat(val);
    }

    if (isNaN(val)) return '';

    val = val * 100;

    return val.toFixed(2);
  }, [value, localizationContext.locale]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {formattedText}
    </>
  );

};
