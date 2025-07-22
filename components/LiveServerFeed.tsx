'use client';

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import styles from './LiveServerFeed.module.css';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const generateRandomData = () =>
  Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));

const createChartData = (label: string) => ({
  labels: Array.from({ length: 20 }, (_, i) => `${i}s`),
  datasets: [
    {
      label: `${label} CPU %`,
      data: generateRandomData(),
      borderColor: '#4ADE80',
      backgroundColor: 'rgba(74, 222, 128, 0.1)',
      tension: 0.3,
    },
  ],
});

const LiveServerFeed = () => {
  const [data1, setData1] = useState(createChartData('Server 1'));
  const [data2, setData2] = useState(createChartData('Server 2'));
  const [data3, setData3] = useState(createChartData('Server 3'));

  useEffect(() => {
    const interval = setInterval(() => {
      setData1(createChartData('Server 1'));
      setData2(createChartData('Server 2'));
      setData3(createChartData('Server 3'));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.feedContainer}>
      <h3 className={styles.title}> Live System Performance (Mocked)</h3>
      <div className={styles.charts}>
        <div className={styles.chart}>
          <Line data={data1} />
        </div>
        <div className={styles.chart}>
          <Line data={data2} />
        </div>
        <div className={styles.chart}>
          <Line data={data3} />
        </div>
      </div>
    </div>
  );
};

export default LiveServerFeed;
