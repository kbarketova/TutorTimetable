export const getInitials = (name: string, lastName?: string): string => {
  if (!lastName) {
    return `${name[0] ?? ''}`.trim();
  }
  return `${name[0] ?? ''} ${lastName[0] ?? ''}`.trim();
};
