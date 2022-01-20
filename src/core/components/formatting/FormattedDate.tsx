import React, {useContext, useMemo} from 'react';
// import {Moment} from 'moment';
import {LocalizationContext} from '../../providers/LocalizationProvider';

interface FormattedDateProps {
  value: any
}

export const FormattedDate: React.FC<FormattedDateProps> = ({value}) => {
  const localizationContext = useContext(LocalizationContext);

  const formattedText = useMemo(() => {
    return '#date#';
  }, [value, localizationContext.locale]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
      <>
        {formattedText}
      </>
  );
};
