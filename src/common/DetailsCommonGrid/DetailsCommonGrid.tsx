import { ReactNode } from 'react';
import { setClassName } from '../../util';
import './DetailsCommonGrid.css';

// Declaring type of props - see "Typing Component Props" for more examples
type DetailsCommonGridTypes = {
  children: ReactNode;
  className?: string;
};

export const DetailsCommonGrid = ({
  children,
  className,
}: DetailsCommonGridTypes) => (
  <div className={setClassName('Details-common-grid', className)}>
    {children}
  </div>
);
