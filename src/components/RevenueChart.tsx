import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Enregistre les composants nécessaires de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface RevenueChartProps {
  revenueData: { month: string; revenue: number }[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ revenueData }) => {
    // Vérifier les données reçues
    console.log("Données de revenu reçues :", revenueData);
  
    // Préparer les labels et les données du graphique
    const months = revenueData.map((item) => item.month);
    const revenues = revenueData.map((item) => item.revenue);
  
    const data = {
      labels: months,
      datasets: [
        {
          label: "Revenu Mensuel",
          data: revenues,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          fill: true,
        },
      ],
    };
  
    const options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  
    return <Line data={data} options={options} />;
  };
  

export default RevenueChart;
