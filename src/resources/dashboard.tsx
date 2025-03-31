import { useGetIdentity } from "react-admin";
import { Box, Typography, Avatar, Card } from "@mui/material";
import { useState, useEffect } from "react";
import StatisticsChart from "../components/StatisticsChart";
import FirstStatistics from "../components/FirstStatisctics";
import TicketSalesChart from "../components/StatisticsChart";
import RevenueChart from "../components/RevenueChart";

const Dashboard: React.FC = () => {
  const { data: identity, isLoading } = useGetIdentity();
  const [eventCount, setEventCount] = useState<number | null>(null);
  const [userCount, setUserCount] = useState<number | null>(null);
  const [reservationCount, setReservationCount] = useState<number | null>(null);
  const [salesCount, setSalesCount] = useState<{ [key: string]: number } | null>(null);
  const [revenueData, setRevenueData] = useState<{ month: string; revenue: number }[]>([]);


  useEffect(() => {
    fetch("http://localhost:8080/events/count/published", {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    })
      .then((res) => res.json())
      .then((data) => setEventCount(data))
      .catch((error) => console.error("Erreur lors de la récupération des événements:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/users/count", {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    })
      .then((res) => res.json())
      .then((data) => setUserCount(data))
      .catch((error) => console.error("Erreur lors de la récupération des utilisateurs:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/reservations/sales/total", {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    })
      .then((res) => res.json())
      .then((data) => setReservationCount(data))
      .catch((error) => console.error("Erreur lors de la récupération des réservations:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/reservations/sales/by-type", {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    })
      .then((res) => res.json())
      .then((data) => setSalesCount(data))
      .catch((error) => console.error("Erreur lors de la récupération des nombres:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/reservations/revenue/monthly", {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((item: { month: string; revenue: number }) => ({
          month: item.month,
          revenue: Number(item.revenue),
        }));
        setRevenueData(formattedData);
      })
      .catch((error) => console.error("Erreur lors de la récupération des revenus mensuels:", error));
  }, []);
  

  return (
    <Box sx={{ minHeight: "100vh", padding: 3, backgroundColor: "#f4f6f8", display: "flex", flexDirection: "column" }}>
    <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
      <Card
        sx={{
          flex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 3,
          borderRadius: 3,
          minHeight: 150,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "2.8rem", fontFamily: '"Dancing Script", cursive' }}>
            Bonjour, {isLoading ? "..." : identity?.username} !
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1rem", fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }}>
            Aujourd’hui, c’est toi qui fais le show
          </Typography>
        </Box>
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
            <Typography variant="h6" fontWeight="bold">{identity?.username}</Typography>
            <Typography variant="body2" color="textSecondary">{identity?.role}</Typography>
            <Typography variant="body2" color="textSecondary">{identity?.email}</Typography>
          </Box>
        </Box>
      </Card>
    </Box>

    <Box sx={{  display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
      <Box sx={{ display: "flex", justifyContent: "center", padding: 3, alignItems: 'center' }}>
        <FirstStatistics eventCount={eventCount} userCount={userCount} reservationCount={reservationCount} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: 3 }}>
        <TicketSalesChart salesCount={salesCount} />
      </Box>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
      <Box sx={{ display: "flex", justifyContent: "center", padding: 3, alignItems: 'center' }}>
        <FirstStatistics eventCount={eventCount} userCount={userCount} reservationCount={reservationCount} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: 3 }}>
        <TicketSalesChart salesCount={salesCount} />
      </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", padding: 3 }}>
        <RevenueChart revenueData={revenueData} />
      </Box>
    </Box>
  </Box>
  );
};

export default Dashboard;
