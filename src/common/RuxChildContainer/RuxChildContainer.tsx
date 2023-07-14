import { setClassName } from '../../util';
import './RuxChildContainer.css';
import { RuxContainer } from '@astrouxds/react';

type PropTypes = {
  children: React.ReactElement[];
  className: string;
};

export const RuxChildContainer = (props: any) => {
  const { children, className }: PropTypes = props;
  return (
    <RuxContainer className={setClassName('child-container', className)}>
      {children}
    </RuxContainer>
  );
};
