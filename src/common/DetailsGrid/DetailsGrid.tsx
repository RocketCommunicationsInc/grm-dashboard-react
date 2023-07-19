import { Fragment } from 'react';
import './DetailsGrid.css';

type PropTypes = {
  details: any[];
};

export const DetailsGrid = ({ details }: PropTypes) => {
  return (
    <div className='Details-grid'>
      {details.map((detail: { [key: string]: string }, index: number) => (
        <Fragment key={detail.label + index}>
          <p>{detail.label}</p>
          {detail.node}
        </Fragment>
      ))}
    </div>
  );
};
