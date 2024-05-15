import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
function Navbar({ headingTitle, headingSubtitle, handleDrawerToggle }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          "@media only screen and (min-width: 280px) and (max-width: 1023px)": {
            flexDirection: "column",
            flexWrap: "wrap",
          },
        }}
      >
        <Box
          sx={{
            "@media only screen and (min-width: 280px) and (max-width: 1023px)":
              {
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.8rem",
              },
          }}
        >
          <IconButton
            sx={{
              backgroundColor: "#FFF0F0",
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              "@media only screen and (min-width: 1023px)": {
                display: "none",
              },
            }}
            onClick={handleDrawerToggle}
            className="dashboard-notification-icon"
          >
            <MenuIcon className="dashboard-nav-hamburger-icon" />
          </IconButton>
          <Box>
            <div className="dashboard-title">{headingTitle}</div>
            <div className="dashboard-subTitle">{headingSubtitle}</div>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Navbar;
