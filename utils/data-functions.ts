export const BUSINESS_OPEN = 9;
export const BUSINESS_CLOSE = 18;

export const startOfDay = (d = new Date()) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);

export const clampToBusinessHours = (d: Date) => {
  const h = d.getHours();
  const m = d.getMinutes();
  if (h < BUSINESS_OPEN) {
    d.setHours(BUSINESS_OPEN, 0, 0, 0);
  } else if (h > BUSINESS_CLOSE || (h === BUSINESS_CLOSE && m > 0)) {
    d.setHours(BUSINESS_CLOSE, 0, 0, 0);
  }
  return d;
};

export const minDate = startOfDay(new Date());
