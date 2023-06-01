import { setClassName } from '../../util';
import './DetailsCommonGrid.css';

export const DetailsCommonGrid = ({ children, className }) => (
  <div className={setClassName('Details-common-grid', className)}>
    {children}
  </div>
);
