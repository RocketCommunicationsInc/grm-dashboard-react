import { Fragment } from 'react';
import './DetailsGrid.scss';

export const DetailsGrid = ({ details }) => {
  return (
    <div className='Details-grid'>
      {details.map((detail, index) => (
        <Fragment key={detail.label + index}>
          <p>{detail.label}</p>
          {detail.node}
        </Fragment>
      ))}
    </div>
  );
};
