export const setClassName = (defaultClassName, className) => {
  if (className) return `${defaultClassName} ${className}`;
  return defaultClassName;
};
