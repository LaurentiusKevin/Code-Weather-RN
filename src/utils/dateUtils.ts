export function convertEpoch(epoch: number): Date {
  const date = new Date();
  date.setUTCSeconds(epoch);

  return date;
}

export function convertDate(epoch: number): string {
  const date = new Date(epoch * 1000);

  return (
    String(date.getDate()).padStart(2, '0') +
    '-' +
    String(date.getMonth()).padStart(2, '0') +
    '-' +
    date.getFullYear()
  );
}

export function convertTime(epoch: number): string {
  const date = new Date(epoch * 1000);

  return (
    String(date.getHours()).padStart(2, '0') +
    ':' +
    String(date.getMinutes()).padStart(2, '0')
  );
}
