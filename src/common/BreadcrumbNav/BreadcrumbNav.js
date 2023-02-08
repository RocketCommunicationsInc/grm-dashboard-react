import { RuxBreadcrumb, RuxBreadcrumbItem } from '@astrouxds/react';

import { useAppContext } from '../../providers/AppProvider';
import './BreadcrumbNav.scss';

export const BreadcrumbNav = () => {
  const { state, dispatch } = useAppContext();

  const handleClick = (e, page) => {
    e.preventDefault();

    dispatch({ type: 'SET_PAGE', payload: page });
  };

  return (
    <RuxBreadcrumb className='Breadcrumb-nav'>
      {state.links.map(({ href, page, title }, i) => {
        const isLast = state.links.length === i + 1;

        return (
          <RuxBreadcrumbItem
            key={page}
            onClick={isLast ? undefined : (e) => handleClick(e, page)}
            href={isLast ? undefined : href}
          >
            {title}
          </RuxBreadcrumbItem>
        );
      })}
    </RuxBreadcrumb>
  );
};
