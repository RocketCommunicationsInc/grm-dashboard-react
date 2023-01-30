import { RuxInput, RuxOption, RuxSelect } from '@astrouxds/react';

const DetailsGrid = ({ details, isEditing }) => {
  if (isEditing) {
    return (
      <>
        {details.map((detail) => {
          if (detail.options) {
            return (
              <RuxSelect value={detail.value} label={detail.label} size='small'>
                {detail.options.map((option) => (
                  <RuxOption value={option} label={option} />
                ))}
              </RuxSelect>
            );
          } else {
            return (
              <RuxInput
                key={detail.label + detail.value}
                label={detail.label}
                value={detail.value}
                size='small'
              />
            );
          }
        })}
      </>
    );
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
