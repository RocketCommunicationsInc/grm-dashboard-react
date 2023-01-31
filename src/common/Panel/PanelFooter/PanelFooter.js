import { setClassName } from '../../../util';
import './PanelFooter.scss';

export const PanelFooter = ({ children, className }) => (
  <footer className={setClassName('Panel-footer', className)}>
    {children}
  </footer>
);
