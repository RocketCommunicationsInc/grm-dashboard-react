import { RuxBreadcrumb, RuxBreadcrumbItem } from '@astrouxds/react';
import { useMatches, useNavigate } from 'react-router-dom';
import './BreadcrumbNav.css';
import { capitalize } from '../../util/util';

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
              onClick={() => navigate(`/${match.handle?.crumb || ''}`)}
            >
              {capitalize(match.handle?.crumb || 'Dashbaord')}
            </RuxBreadcrumbItem>
          );
        })}
      </RuxBreadcrumb>
    </div>
  );
};
