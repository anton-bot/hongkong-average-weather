import moment from 'moment';

export function getTomorrowMmDd(): string {
  return moment.utc().add(8, 'hours').add(1, 'day').format('MMDD');
}
