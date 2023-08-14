export const setClassName = (defaultClassName: string, className: string) => {
  if (className) return `${defaultClassName} ${className}`;
  return defaultClassName;
};
