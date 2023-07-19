import { RuxDatetime } from '@astrouxds/react';

type PropTypes = {
  time: any;
};

export const TwoDigitTime = ({ time }: PropTypes) => (
  <RuxDatetime
    date={new Date(time)}
    hour='2-digit'
    minute='2-digit'
    second='2-digit'
  />
);
