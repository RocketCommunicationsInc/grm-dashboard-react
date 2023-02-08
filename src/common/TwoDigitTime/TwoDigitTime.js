import { RuxDatetime } from '@astrouxds/react';

export const TwoDigitTime = ({ time }) => (
  <RuxDatetime
    date={new Date(time)}
    hour='2-digit'
    minute='2-digit'
    second='2-digit'
  />
);
