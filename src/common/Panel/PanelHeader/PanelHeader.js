import { setClassName } from '../../../util';
import './PanelHeader.css';

export const PanelHeader = ({ className, heading }) => (
  <header className={setClassName('Panel-header', className)}>
    <h2>{heading}</h2>
  </header>
);
