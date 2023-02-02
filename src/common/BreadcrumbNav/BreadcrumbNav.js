import { Fragment } from 'react';

import { useAppContext } from '../../providers/AppProvider';
import './BreadcrumbNav.scss';

export const BreadcrumbNav = () => {
  const { state, dispatch } = useAppContext();

  const handleClick = (e, page) => {
    e.preventDefault();

    dispatch({ type: 'SET_PAGE', payload: page });
  };

  return (
    <nav className='Breadcrumb-nav'>
      {state.links.map(({ href, page, title }, i) => {
        const last = state.links.length === i + 1;

        return (
          <Fragment key={href + title}>
            {!last ? (
              <>
                <a href={href} onClick={(e) => handleClick(e, page)}>
                  {title}
                </a>
                <span> / </span>
              </>
            ) : (
              <span>{title}</span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
};
