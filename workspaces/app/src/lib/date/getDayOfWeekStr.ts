const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

export const getDayOfWeekStr = (date: Date): string => {
  const dayOfWeek = date.getDay();
  const dayStr = days[dayOfWeek];
  if (!dayStr) {
    throw new Error('Invalid day of week');
  }
  return dayStr;
};
