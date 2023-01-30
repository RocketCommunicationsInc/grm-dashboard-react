import { Fragment } from 'react';
import './BreadcrumbNav.scss';

export const BreadcrumbNav = ({ links }) => (
  <nav className='Breadcrumb-nav'>
    {links.map(({ href, title }, i) => {
      const last = links.length === i + 1;

      return (
        <Fragment key={title + i}>
          {!last ? (
            <>
              <a href={href}>{title}</a>
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
