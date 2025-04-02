import { useState } from "react";
import { Drawer, List, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DraftsIcon from "@mui/icons-material/Drafts";
import { useNavigate } from "react-router-dom";
import { border, color, height, styled } from "@mui/system";

const SidebarItem = styled("div")<{ active: boolean }>(({ active }) => ({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  textAlign: "left",
  gap: "12px",
  borderTopLeftRadius: "50px",
  borderBottomLeftRadius: "50px",
  background: active ? "#fff" : "transparent",
  padding: "12px 20px",
  paddingLeft: "20px",
  transition: "all 0.3s ease",
  position: "relative",
  boxShadow: active ? "5px 0 10px rgba(0, 0, 0, 0.1)" : "none",


  "&::before": active
    ? {
        content: "''",
        position: 'absolute',
        top: '-20px',
        right: 0,
        width: '20px',
        height: '20px',
        borderBottomRightRadius: '20px',
        boxShadow: '5px 5px 0 5px',
        background: 'transparent',
        color: 'white', 
      }
    : {},

  "&::after": active
    ? {
      content: "''",
      position: 'absolute',
      bottom: '-20px',
      right: 0,
      width: '20px',
      height: '20px',
      borderTopRightRadius: '20px',
      boxShadow: '5px -5px 0 5px',
      background: 'transparent',
      color: 'white', 
      }
    : {},
}));


const CustomSidebar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("/");

  const handleNavigation = (path: string) => {
    setActive(path);
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 200,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 200,
          background: "linear-gradient(180deg, #E0C3FC, #8EC5FC)",
          border: 'none',
          color: "#333",
          paddingLeft: '15px',
        },
      }}
    >
      <List sx={{ height: "80%", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
        <div style={{ padding: "16px", display: "flex", justifyContent: "center" }}>
          <img src="/tapakila.png" alt="Logo" style={{ width: "150px", height: "auto" }} />
        </div>

        {[
          { path: "/", icon: <DashboardIcon />, label: "Dashboard" },
          { path: "/events", icon: <EventIcon />, label: "Événements" },
          { path: "/users", icon: <PeopleIcon />, label: "Utilisateurs" },
          { path: "/reservations", icon: <BookmarkIcon />, label: "Réservations" },
          { path: "/drafts", icon: <DraftsIcon />, label: "Brouillons" },
        ].map(({ path, icon, label }) => (
          <SidebarItem key={path} active={active === path} onClick={() => handleNavigation(path)}>
            <ListItemIcon sx={{ minWidth: "auto", marginLeft: "0px" }}>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </SidebarItem>
        ))}
      </List>
    </Drawer>
  );
};

export default CustomSidebar;