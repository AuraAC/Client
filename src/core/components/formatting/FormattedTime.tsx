import React, {useContext, useMemo} from 'react';
// import {Moment} from 'moment';
import {LocalizationContext} from '../../providers/LocalizationProvider';

interface FormattedTimeProps {
  value: any
}

export const FormattedTime: React.FC<FormattedTimeProps> = ({value}) => {
  const localizationContext = useContext(LocalizationContext);

  const formattedText = useMemo(() => {
    const d = (new Date(value));
    const hh = d.getHours();
    const mm = d.getMinutes();
    const ss = d.getSeconds();
    return (hh > 9 ? hh : '0' + hh) + ':' + (mm > 9 ? mm : '0' + mm) + ':' + (ss > 9 ? ss : '0' + ss);
  }, [value, localizationContext.locale]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {formattedText}
    </>
  );
};
