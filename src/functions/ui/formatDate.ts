import moment from 'moment';

export const formatDate = (d: string | Date) =>
  moment(d).format('D MMM');
