import { RuxBreadcrumb, RuxBreadcrumbItem } from '@astrouxds/react';
import { useMatches, useNavigate } from 'react-router-dom';
import './BreadcrumbNav.css';
import { capitalize } from '../../util/util';

const getLastPath = (pathname) => {
  const index = pathname.lastIndexOf('/');
  const lastPath = pathname.substring(index + 1);

  return lastPath.length === 36 ? lastPath : capitalize(lastPath);
};

export const BreadcrumbNav = () => {
  const navigate = useNavigate();
  const matches = useMatches();

  const filteredMatches = matches.filter((match) => {
    return match.pathname === '/' || match.pathname.at(-1) !== '/';
  });
  console.log(matches);
  if (matches.length === 0) return null;
  return (
    <div className='breadcrumb-search-wrapper'>
      <RuxBreadcrumb className='Breadcrumb-nav'>
        {filteredMatches.map((match, index) => {
          return (
            <RuxBreadcrumbItem
              key={index}
              onClick={() => navigate(match.pathname)}
            >
              {match.pathname === '/'
                ? 'Dashboard'
                : getLastPath(match.pathname)}
            </RuxBreadcrumbItem>
          );
        })}
      </RuxBreadcrumb>
    </div>
  );
};
