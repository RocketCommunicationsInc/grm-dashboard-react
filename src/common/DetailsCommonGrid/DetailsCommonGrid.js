import { setClassName } from '../../util';
import './DetailsCommonGrid.scss';

export const DetailsCommonGrid = ({ children, className }) => (
  <div className={setClassName('Details-common-grid', className)}>
    {children}
  </div>
);
