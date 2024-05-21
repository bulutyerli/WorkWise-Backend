import { AnnualTable } from '../types/types';

export function totalAnnualLeave(data: AnnualTable[]) {
  let total = 0;
  data.map((item: AnnualTable) => {
    const startDate = new Date(item.starting_date).getTime();
    const endDate = new Date(item.end_date).getTime();
    const difference = endDate - startDate;
    total += difference;
  });
  return Math.round(total / (1000 * 3600 * 24)) + 1;
}
