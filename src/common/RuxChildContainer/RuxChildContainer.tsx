import { setClassName } from '../../util';
import './RuxChildContainer.css';
import { RuxContainer } from '@astrouxds/react';

type PropTypes = {
  children: any;
  className: string;
  heading: string;
};

export const RuxChildContainer = (props: any) => {
  console.log(props);
  const { children, className, heading }: PropTypes = props;

  return (
    <RuxContainer className={setClassName('child-container', className)}>
      {heading && <h3>{heading}</h3>}
      <div className='child-container__body'>{children}</div>
    </RuxContainer>
  );
};
