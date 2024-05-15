import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
const drawerWidth = 260;

const Layout = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <div>
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Box
          sx={{
            "@media only screen and (min-width: 1024px)": {
              width: `calc(100% - ${drawerWidth}px)`,
              marginLeft: `auto`,
            },
            padding: "1rem",
          }}
        >
          <Navbar
            headingTitle={"User Dashboard"}
            headingSubtitle={"All User List"}
            handleDrawerToggle={handleDrawerToggle}
          />
          {props.children}
        </Box>
      </div>
    </>
  );
};

export default Layout;
