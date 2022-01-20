import React, {useContext, useMemo} from 'react';
// import {Moment} from 'moment';
import {LocalizationContext} from '../../providers/LocalizationProvider';

interface FormattedDateTimeProps {
  value: any
}

export const FormattedDateTime: React.FC<FormattedDateTimeProps> = ({value}) => {
  const localizationContext = useContext(LocalizationContext);

  const formattedText = useMemo(() => {
    return value;
  }, [value, localizationContext.locale]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {formattedText}
    </>
  );
};
