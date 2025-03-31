import { useGetIdentity } from "react-admin";
import { Box, Typography, Avatar, Card, CardContent } from "@mui/material";

const Dashboard: React.FC = () => {
  const { data: identity, isLoading } = useGetIdentity();
  // const dataProvider = useDataProvider();
  
  // useEffect(() => {
  //  fetch("http://localhost:8080/stats/events/count", {
    //  headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
    //})
    //  .then(res => res.json())
     // .then(data => setEventCount(data.count)) // Assure-toi que l'API renvoie { count: 42 }
     // .catch(error => console.error("Erreur lors de la récupération des événements:", error));
 // }, []);

  return (
    <Box sx={{ minHeight: "100vh", padding: 3, backgroundColor: "#f4f6f8", border: '1px solid red', display:'flex', flexDirection: 'column' }}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
        <Card
          sx={{
            flex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 3,
            borderRadius: 3,
            border: '1px solid red',
            minHeight: 150,
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight="bold" sx={{fontSize: '2.8rem', fontFamily: '"Dancing Script", cursive'}}>
              Bonjour, {isLoading ? "..." : identity?.username} !
            </Typography>
            <Typography variant="body1" sx={{fontSize: '1rem', fontFamily: '"Poppins", "Roboto", "Arial", sans-serif'}}>Aujourd’hui, c’est toi qui fais le show</Typography>
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
              <Typography variant="h6" fontWeight="bold" sx={{fontFamily: '"Poppins", "Roboto", "Arial", sans-serif'}}>{identity?.username}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{fontFamily: '"Poppins", "Roboto", "Arial", sans-serif'}}>{identity?.role}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{fontFamily: '"Poppins", "Roboto", "Arial", sans-serif'}}>{identity?.email}</Typography>
            </Box>
          </Box>
        </Card>
      </Box>
      <Box sx={{ display: 'flex', gap: 3, flexDirection: 'row', justifyContent: 'center', padding: 3, border: '1px solid red' }}>
      <Box sx={{ border: '1px solid pink', display: 'flex', justifyContent: 'center' }}>
  <Card sx={{ width: '80%', p: 3, borderRadius: 3, boxShadow: 3 }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 3 }}>
      <Box>
      <Typography fontWeight="bold" sx={{fontSize: '1.7rem', fontFamily: '"Dancing Script", cursive'}}>Événements : </Typography>
            <Typography variant="body2" color="textSecondary">
             {/* {eventCount} */} événements disponibles 
            </Typography>
      </Box>

      <Box>
        <Typography fontWeight="bold" sx={{fontSize: '1.7rem', fontFamily: '"Dancing Script", cursive'}}>Utilisateurs : </Typography>
        <Typography variant="body2" color="textSecondary">Supervise les utilisateurs et leurs actions.</Typography>
      </Box>

      <Box>
        <Typography fontWeight="bold" sx={{fontSize: '1.7rem', fontFamily: '"Dancing Script", cursive'}}>Réservations</Typography>
        <Typography variant="body2" color="textSecondary">Accède aux réservations en un instant.</Typography>
      </Box>
    </Box>
  </Card>
</Box>

        <Box sx={{border: '1px solid red'}}>

        </Box>
</Box>
    </Box>
  );
};
export default Dashboard;