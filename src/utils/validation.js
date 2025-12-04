export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isFullNameValid(fullName) {
  const parts = fullName.trim().split(/\s+/);
  return (
    parts.length === 3 &&
      parts.every((w) => /^[A-Za-zА-Яа-яЁё-]{2,}$/.test(w))
  );
}

export function isValidPhone(phone) {
  const pattern = /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/;
  return pattern.test(phone);
}
