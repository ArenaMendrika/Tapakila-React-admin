import React from "react";
import { Box, Typography, Avatar, Card, CardContent } from "@mui/material";

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ minHeight: "100vh", padding: 3, backgroundColor: "#f4f6f8" }}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
        <Card
          sx={{
            flex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 3,
            borderRadius: 3,
            background: "linear-gradient(135deg, #4c79ff, #67cfff)",
            color: "white",
            minHeight: 150,
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Good Day, Dr. Nicholls!
            </Typography>
            <Typography variant="body1">Have a Nice Monday!</Typography>
          </Box>
          <img src="/doctor-illustration.png" alt="Doctor" style={{ width: 120, height: "auto" }} />
        </Card>

        <Card
          sx={{
            flex: 1,
            borderRadius: 3,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: 150,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar src="/doctor-avatar.jpg" sx={{ width: 64, height: 64 }} />
            <Box>
              <Typography variant="h6" fontWeight="bold">Dr. Alisha Nicholls</Typography>
              <Typography variant="body2" color="textSecondary">DERMATOLOGIST</Typography>
              <Typography variant="body2" color="textSecondary">Berlin, Germany</Typography>
            </Box>
          </Box>
          <CardContent sx={{ paddingTop: 1 }}>
            <Typography variant="body2"><strong>Date Birth:</strong> 17.07.86</Typography>
            <Typography variant="body2"><strong>Blood Type:</strong> A(II) Rh+</Typography>
            <Typography variant="body2"><strong>Working Hours:</strong> 9pm - 5am</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;