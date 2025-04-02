import React from "react";
import { Box, Card, Typography, LinearProgress } from "@mui/material";

interface StatisticsChartProps {
  eventCount: number | null;
  userCount: number | null;
  reservationCount: number | null;
}

const FirstStatistics: React.FC<StatisticsChartProps> = ({ eventCount, userCount, reservationCount }) => {
  const maxValue = Math.max(eventCount ?? 0, userCount ?? 0, reservationCount ?? 0, 1); 

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
      <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
        <Typography fontWeight="bold" sx={{ fontSize: "1.7rem", fontFamily: '"Dancing Script", cursive', textAlign: "center" }}>
          Statistiques Générales
        </Typography>

        {/* Ligne pour Événements */}
        <Box sx={{ mt: 2 }}>
          <Typography fontWeight="bold" sx={{ fontSize: "1rem", color: "#ff6384" }}>
            Événements : {eventCount ?? "Chargement..."}
          </Typography>
          <LinearProgress variant="determinate" value={(eventCount ?? 0) / maxValue * 100} sx={{ height: 8, borderRadius: 4, backgroundColor: "#ffc2c2" }} />
        </Box>

        {/* Ligne pour Utilisateurs */}
        <Box sx={{ mt: 2 }}>
          <Typography fontWeight="bold" sx={{ fontSize: "1rem", color: "#36a2eb" }}>
            Utilisateurs : {userCount ?? "Chargement..."}
          </Typography>
          <LinearProgress variant="determinate" value={(userCount ?? 0) / maxValue * 100} sx={{ height: 8, borderRadius: 4, backgroundColor: "#c2e0ff" }} />
        </Box>

        {/* Ligne pour Réservations */}
        <Box sx={{ mt: 2 }}>
          <Typography fontWeight="bold" sx={{ fontSize: "1rem", color: "#ffce56" }}>
            Réservations : {reservationCount ?? "Chargement..."}
          </Typography>
          <LinearProgress variant="determinate" value={(reservationCount ?? 0) / maxValue * 100} sx={{ height: 8, borderRadius: 4, backgroundColor: "#ffeab2" }} />
        </Box>
      </Card>
    </Box>
  );
};

export default FirstStatistics;
