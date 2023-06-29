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

  return (
    <div className='breadcrumb-search-wrapper'>
      <RuxBreadcrumb className='Breadcrumb-nav'>
        {matches.map((match, index) => {
          return (
            <RuxBreadcrumbItem
              key={index}
              onClick={() => navigate(match.pathname)}
            >
              {getLastPath(match.pathname) || 'Dashboard'}
            </RuxBreadcrumbItem>
          );
        })}
      </RuxBreadcrumb>
    </div>
  );
};
