import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 210;
const drawerHeight = "calc(100% - 32px)";

export default function Sidebar({ mobileOpen, handleDrawerToggle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const UserRoutes = [
    {
      name: "User Dashboard",
      to: "/",
    },
  ];
  return (
    <>
      <Drawer
        sx={{
          "@media only screen and (min-width: 280px) and (max-width: 1023px)": {
            display: "none",
          },
          display: "block",
          width: drawerWidth,
          overflow: "hidden",
          height: drawerHeight,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            height: drawerHeight,
            boxSizing: "border-box",
            margin: 2,
            border: "none",
            borderRadius: "33px",
            background: "linear-gradient(180deg, #242424 0%, #270202 100%)",
          },
        }}
        variant="permanent"
        anchor="left"
        open
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            padding: "38px 24px",
            height: "100%",
          }}
        >
          <Box component="div" sx={{ width: "100%" }}>
            <Box
              sx={{
                color: "white",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                width: "100%",
                marginTop: "2rem",
              }}
            >
              {UserRoutes?.map((data, index) => {
                return (
                  <div key={index}>
                    <Button
                      variant="secondary"
                      sx={{
                        padding: "10px 10px",
                        width: "100%",
                        borderRadius: "10px !important",
                        borderColor:
                          location?.pathname == data?.to
                            ? "#DF0E0E !important"
                            : "",
                        backgroundColor:
                          location?.pathname == data?.to
                            ? "#DF0E0E"
                            : "transparent !important",
                        color: "white",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "#DF0E0E !important",
                          borderColor: "#DF0E0E",
                        },
                      }}
                      onClick={() => navigate(data?.to)}
                    >
                      {data?.name}
                    </Button>
                  </div>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Drawer>
      <Drawer
        sx={{
          display: "none",
          "@media only screen and (min-width: 280px) and (max-width: 1023px)": {
            display: "block",
          },
          width: drawerWidth,
          height: drawerHeight,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            height: "100%",
            boxSizing: "border-box",
            border: "none",
            background: "linear-gradient(180deg, #242424 0%, #270202 100%)",
            borderTopRightRadius: "12px",
            borderBottomRightRadius: "12px",
          },
        }}
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            padding: "38px 24px",
            height: "100%",
          }}
        >
          <Box component="div" sx={{ width: "100%" }}>
            <Box
              sx={{
                color: "white",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                width: "100%",
                marginTop: "2rem",
              }}
            >
              {UserRoutes?.map((data, index) => {
                return (
                  <div key={index}>
                    <Button
                      variant="secondary"
                      sx={{
                        padding: "10px 10px",
                        width: "100%",
                        borderRadius: "10px !important",
                        borderColor:
                          location?.pathname == data?.to
                            ? "#DF0E0E !important"
                            : "",
                        backgroundColor:
                          location?.pathname == data?.to
                            ? "#DF0E0E"
                            : "transparent !important",
                        color: "white",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "#DF0E0E !important",
                          borderColor: "#DF0E0E",
                        },
                      }}
                      onClick={() => navigate(data?.to)}
                    >
                      {data?.name}
                    </Button>
                  </div>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
