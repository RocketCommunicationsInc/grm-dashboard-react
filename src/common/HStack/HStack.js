import './HStack.scss';

export const HStack = ({ children, className, spacing, ...props }) => {
  const hStack = 'H-stack';
  let hStackClassName = hStack;

  if (className) {
    hStackClassName = `${hStack} ${className}`;
  }

  if (spacing) {
    hStackClassName = `${hStack} ${hStack}__spacing-${spacing}`;
  }

  if (className && spacing) {
    hStackClassName = `${hStack} ${hStack}__spacing-${spacing} ${className}`;
  }

  return (
    <div {...props} className={hStackClassName}>
      {children}
    </div>
  );
};
