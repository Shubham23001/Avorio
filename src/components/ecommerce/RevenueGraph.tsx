import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const getLast30Days = () => {
  const dates = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(`${d.getDate()}/${d.getMonth() + 1}`);
  }
  return dates;
};

const data = {
  labels: getLast30Days(),
  datasets: [
    {
      label: "Revenue",
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10000)),
      borderColor: "#6366f1",
      backgroundColor: "rgba(99,102,241,0.1)",
      tension: 0.4,
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Revenue - Last 30 Days",
    },
  },
};

const RevenueGraph: React.FC = () => {
  return <Line data={data} options={options} />;
};

export default RevenueGraph;
