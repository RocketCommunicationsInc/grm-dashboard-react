import { RuxInput } from '@astrouxds/react';

const DetailsGrid = ({ details, isEditing }) => {
  if (isEditing) {
    return <></>;
  }

  return (
    <>
      {details.map((detail) => (
        <RuxInput
          key={detail.label + detail.value}
          label={detail.label}
          value={detail.value}
          readonly
          size='small'
        />
      ))}
    </>
  );
};

export default DetailsGrid;
