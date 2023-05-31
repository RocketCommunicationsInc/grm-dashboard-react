import { setClassName } from '../../../util';
import './PanelBody.css';

export const PanelBody = ({ children, className }) => (
  <div className={setClassName('Panel-body', className)}>{children}</div>
);
