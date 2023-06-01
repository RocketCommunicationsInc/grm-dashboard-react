import { setClassName } from '../../../util';
import './PanelContainer.css';

export const PanelContainer = ({ children, className }) => (
  <section className={setClassName('Panel-container', className)}>
    {children}
  </section>
);
