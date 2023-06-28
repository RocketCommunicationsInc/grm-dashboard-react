import { RuxTableHeaderCell, RuxIcon } from '@astrouxds/react';
import type { ColumnDef, UpdatedContact } from './Table';

type PropTypes = {
  columnDefinition: ColumnDef;
  handleClick: React.MouseEventHandler<HTMLElement>;
  sortDirection: 'ASC' | 'DESC';
  sortProp: keyof UpdatedContact;
};

const TableHeaderCell = ({
  columnDefinition,
  handleClick,
  sortDirection,
  sortProp,
}: PropTypes) => {
  return (
    <RuxTableHeaderCell
      data-sortprop={columnDefinition.property}
      onClick={handleClick}
    >
      {columnDefinition.label}
      <RuxIcon
        icon={sortDirection === 'ASC' ? 'arrow-drop-down' : 'arrow-drop-up'}
        size='small'
        className={
          sortProp === columnDefinition.property ? 'visible' : 'hidden'
        }
      />
    </RuxTableHeaderCell>
  );
};

export default TableHeaderCell;
