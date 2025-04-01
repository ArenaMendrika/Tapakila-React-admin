import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, Card } from "@mui/material";

interface Top3EventsChartProps {
  top3Data: { eventName: string; reservationCount: number }[];
}

const Top3EventsChart: React.FC<Top3EventsChartProps> = ({ top3Data }) => {
    return (
      <Box sx={{ 
        width: "100%", 
        height: 210, 
        display: 'flex', 
        justifyContent: "center", 
        alignItems: "center",
      }}>
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, width: '100%', height: '100%'}}>
        <ResponsiveContainer width="100%" height="100%" style={{marginLeft: '-30px', display: 'flex', 
        justifyContent: "center", 
        alignItems: "center"}}>
          <BarChart data={top3Data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        </Card>
      </Box>
    );
  };
  

export default Top3EventsChart;
