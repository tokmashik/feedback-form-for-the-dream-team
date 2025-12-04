export function maskPhone(value) {
  if (typeof value !== 'string') value = String(value ?? '');

  let digits = value.replace(/\D/g, '');

  if (digits.startsWith('7')) digits = digits.slice(1);

  digits = digits.slice(0, 10);

  let res = '+7';

  if (digits.length > 0) res += ' (' + digits.slice(0, 3);
  if (digits.length >= 4) res += ') ' + digits.slice(3, 6);
  if (digits.length >= 7) res += ' ' + digits.slice(6, 8);
  if (digits.length >= 9) res += ' ' + digits.slice(8, 10);

  return res;
}
