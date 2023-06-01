import { setClassName } from '../../../util';
import './PanelFooter.css';

export const PanelFooter = ({ children, className }) => (
  <footer className={setClassName('Panel-footer', className)}>
    {children}
  </footer>
);
