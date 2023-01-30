import { setClassName } from '../../../util';
import './PanelSubContainer.scss';

export const PanelSubContainer = (props) => {
  const { children, bodyClassName, containerClassName, heading } = props;

  return (
    <div className={setClassName('Panel-sub-container', containerClassName)}>
      {heading && <h3>{heading}</h3>}
      <div className={setClassName('Panel-sub-container__body', bodyClassName)}>
        {children}
      </div>
    </div>
  );
};
