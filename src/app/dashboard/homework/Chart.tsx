import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';

function countNumbersInRange(arr: number[]) {
  const result = Array.from({ length: 10 }, (_, index) => {
    const start = index * 10;
    const end = start + 10 === 100 ? 101 : 100;

    const countInRange = arr.filter(num => num >= start && num < end).length;

    return countInRange;
  });

  return result;
}

export default function Chart({ grade }: { grade: number[] }) {
  const [arr, setArr] = useState<number[]>([])

  useEffect(() => {
    setArr(countNumbersInRange(grade))
  }, [grade])

  return (
    <LineChart 
      xAxis={[
        { 
          data: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95], 
          label: 'grade',
          min: 0, 
          max: 100
        }
      ]}
      yAxis={[
        { 
          label: 'number of students',
          min: 0, 
        }
      ]}
      series={[
        {
          data: arr
        }
      ]} 
      width={500}
      height={400}
    />
  )
}