import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const generatePastelColors = (count: number): string[] => {
  return Array.from({ length: count }, (_, i) => `hsl(${(i * 360) / count}, 80%, 80%)`);
};
  
interface TicketSalesChartProps {
  salesCount: Record<string, number> | null;
}

const TicketSalesChart: React.FC<TicketSalesChartProps> = ({ salesCount }) => {
  if (!salesCount) {
    return <Typography>Chargement des tickets...</Typography>;
  }

  const data = Object.entries(salesCount).map(([name, count]) => ({ name, value: count }));
  const colors = generatePastelColors(data.length);

  return (
<Box
  sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
>
  <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 , height: '97%'}}>
    <Typography
      fontWeight="bold"
      sx={{ fontSize: "1.7rem", fontFamily: '"Dancing Script", cursive', textAlign: "center" }}
    >
      Tickets vendus par type
    </Typography>

    <ResponsiveContainer width="100%" height="82%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={70}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </Card>
</Box>
     
  );
};

export default TicketSalesChart;