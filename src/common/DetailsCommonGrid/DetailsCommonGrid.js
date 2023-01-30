import './DetailsCommonGrid.scss';

export const DetailsCommonGrid = ({ children, className, ...props }) => (
  <div className={`Details-common-grid ${className}`} {...props}>
    {children}
  </div>
);
