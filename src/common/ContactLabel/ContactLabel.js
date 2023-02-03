import { RuxStatus } from '@astrouxds/react';
import { HStack } from '../HStack/HStack';

export const ContactLabel = ({ contact }) => {
  return (
    <HStack spacing={3} className='p-4'>
      <RuxStatus status={contact.contactStatus} />
      <h2>
        {contact.contactName} {contact.contactSatellite} {contact.contactREV}
      </h2>
    </HStack>
  );
};
