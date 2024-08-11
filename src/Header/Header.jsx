import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import "./Header.css";

const pages = ["البث المباشر", "منصة الاذان", "منصة الاستماع"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div style={{ direction: "rtl" }}>
      <AppBar className="navbar" position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
              <img src="./img/quran.png" width={50} height={50} />
            </Typography>
            <Typography
              className="logoBrand"
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                color: "inherit",
                textDecoration: "none",
                marginLeft: "20px",
              }}
            >
              بوابة القرآن الكريم
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem >منصة الاستماع</MenuItem>
              <MenuItem>منصة الاذان</MenuItem>
              <MenuItem >البث المباشر</MenuItem>

            </Menu>
            </Box>
            <Typography sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
              <img src="./img/quran.png" width={50} height={50} />
            </Typography>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              بوابة القرآن الكريم
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <MenuItem  >منصة الاستماع</MenuItem>
              <MenuItem  >منصة الاذان</MenuItem>
              <MenuItem  >البث المباشر</MenuItem>
            </Box>

          
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default ResponsiveAppBar;
