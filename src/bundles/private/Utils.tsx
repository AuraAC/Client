export function formatDate(gDate: string, needTime = true, isShortMonth = true) {
  const monthFull = [
    "January", "February", "March", "April", "May", "June",
    "July","August", "September", "October", "November", "December"
  ];

  const monthShort = [
    "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"
  ];

  const date = new Date(gDate);

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();

  return day + ' ' + (isShortMonth ? monthShort[month] : monthFull[month])  + ' ' + year +
    (needTime ? ' ' + (hour > 9 ? '' : '0') + hour + ':' + (minute > 9 ? '' : '0') + minute : '');
}
