import './DetailsGrid.scss';

export const DetailsGrid = ({ details }) => {
  return (
    <div className='Details-grid'>
      {details.map((detail) => (
        <div key={detail.id} className='Details-grid__item'>
          <div>{detail.label}</div>
          <div>{detail.node}</div>
        </div>
      ))}
    </div>
  );
};
