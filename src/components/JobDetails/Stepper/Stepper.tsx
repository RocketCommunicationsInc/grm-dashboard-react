import { RuxIcon } from '@astrouxds/react';
import './Stepper.css';

type PropTypes = {
  status?: string;
  isCompleted: boolean;
};

const Stepper = ({ status, isCompleted }: PropTypes) => {
  const steps = [
    { title: 'Sudmitted' },
    { title: 'Approved' },
    { title: 'Started' },
    { title: 'Stopped' },
    { title: 'Online' },
  ];

  return (
    <div className='stepper-wrapper'>
      <div className={`stepper-item ${status}`}>
        <div className='step-counter'>
          {isCompleted ? <RuxIcon icon='check' size='1.5rem' /> : null}
        </div>
        <div className='step-name'>Submitted</div>
      </div>
      <div className={`stepper-item ${status}`}>
        <div className='step-counter'>
          {isCompleted ? <RuxIcon icon='check' size='1.5rem' /> : null}
        </div>
        <div className='step-name'>Approved</div>
      </div>
      <div className={`stepper-item ${status}`}>
        <div className='step-counter'>
          {isCompleted ? <RuxIcon icon='check' size='1.5rem' /> : null}
        </div>

        <div className='step-name'>Started</div>
      </div>
      <div className={`stepper-item ${status}`}>
        <div className='step-counter'>
          {isCompleted ? <RuxIcon icon='check' size='1.5rem' /> : null}
        </div>

        <div className='step-name'>Stopped</div>
      </div>
      <div className={`stepper-item ${status}`}>
        <div className='step-counter'>
          {isCompleted ? <RuxIcon icon='check' size='1.5rem' /> : null}
        </div>

        <div className='step-name'>Online</div>
      </div>
    </div>
  );
};

export default Stepper;

{
  /* <div className='stepper-wrapper'>
{steps.map(({ title }) => (
  <div className={`stepper-item ${status}`}>
    <div className='step-counter'>
      {isCompleted ? <RuxIcon icon='check' size='1.5rem' /> : null}
    </div>
    <div className='step-title'>{title}</div>
  </div>
))}
</div> */
}
