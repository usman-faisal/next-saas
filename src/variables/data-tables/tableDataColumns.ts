export type RowObj = {
  id: number;
  title: string;
  description: string;
  reference: string;
  impact: string;
  severity_score: string;
};

const tableDataColumns: RowObj[] = [
  {
    id: 1,
    title: 'lorem ipsum dolor sit amet',
    description: 'lorem ipsum dolor sit amet',
    reference: 'lorem ipsum dolor sit amet',
    impact: 'lorem ipsum dolor sit amet',
    severity_score: '2',
  },
  {
    id: 2,
    title: 'lorem ipsum dolor sit amet',
    description: 'lorem ipsum dolor sit amet',
    reference: 'lorem ipsum dolor sit amet',
    impact: 'lorem ipsum dolor sit amet',
    severity_score: '2',
  },
  {
    id: 3,
    title: 'lorem ipsum dolor sit amet',
    description: 'lorem ipsum dolor sit amet',
    reference: 'lorem ipsum dolor sit amet',
    impact: 'lorem ipsum dolor sit amet',
    severity_score: '2',
  },
];

export default tableDataColumns;
