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
  ChartOptions,
  ChartData,
} from "chart.js";
import { Card, CardContent, Typography } from "@mui/material";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface RevenueChartProps {
  revenueData: { month: string; revenue: number }[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ revenueData }) => {
  const months = revenueData.map((item) => item.month);
  const revenues = revenueData.map((item) => item.revenue);

  const data: ChartData<"line"> = {
    labels: months,
    datasets: [
      {
        label: "Revenu Mensuel",
        data: revenues,
        borderColor: "#6366F1",
        backgroundColor: (context) => {
          const chart = context.chart;
          if (!chart.chartArea) return "rgba(99, 102, 241, 0.2)";

          const { ctx, chartArea } = chart;
          const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(99, 102, 241, 0.4)");
          gradient.addColorStop(1, "rgba(99, 102, 241, 0.1)");

          return gradient;
        },
        pointBackgroundColor: "#6366F1",
        pointBorderColor: "#FFF",
        pointRadius: 6,
        pointHoverRadius: 8,
        hoverBackgroundColor: "#4338CA",
        borderWidth: 3,
        tension: 0.3,
        fill: true,
      },
    ],
  };
  const maxRevenue = revenues.length > 0 ? Math.max(...revenues) : 0; // Assure qu'il y a une valeur
const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: "#6B7280",
        font: { size: 14, weight: "bold" },
      },
    },
    y: {
      beginAtZero: true,
      suggestedMax: maxRevenue * 1.1,
      grid: {
        color: "#E5E7EB",
        tickBorderDash: [5, 5], 
      },
      ticks: {
        color: "#6B7280",
        font: { size: 12, weight: "bold" },
        maxTicksLimit: 7,
        callback: (value) => {
          if (typeof value === "number") {
            if (value >= 1_000_000) return `${value / 1_000_000}M`;
            if (value >= 1_000) return `${value / 1_000}K`;
          }
          return value;
        },
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: "top",
      labels: {
        color: "#374151",
        font: { size: 14, weight: "bold" },
      },
    },
  },
};  

  return (
    <Card sx={{ p: 3, boxShadow: 5, borderRadius: 3, maxWidth: 850, mx: "auto", backgroundColor: "#F9FAFB" }}>
      <Typography variant="h6" align="center" gutterBottom sx={{ color: "#1F2937", fontWeight: "bold" }}>
        📈 Évolution du Revenu Mensuel
      </Typography>
      <CardContent sx={{ height: 410 }}>
        <Line data={data} options={options} />
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
