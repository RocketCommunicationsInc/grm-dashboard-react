import { setClassName } from '../../../util';
import './PanelContainer.scss';

export const PanelContainer = ({ children, className }) => (
  <div className={setClassName('Panel-container', className)}>{children}</div>
);
