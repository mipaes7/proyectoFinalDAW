import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  MenuItem,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import { FiMenu, FiHome, FiUserCheck, FiUserPlus, FiX, FiUserMinus  } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const navigationItems = [
  { text: "Home", path: "/", icon: <FiHome />, ariaLabel: "Navigate to home page" },
  { text: "Library", path: "/library", icon: <FaBookmark />, ariaLabel: "Go to your manga library" },
  { text: "Login", path: "/login", icon: <FiUserCheck />, ariaLabel: "Login" },
  { text: "Register", path: "/register", icon: <FiUserPlus />, ariaLabel: "Register" },
  { text: "Logout", /*path: "/",*/ icon: <FiUserMinus />, ariaLabel: "Logout" },
];

const Nav = () => {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpenMobileMenu = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleCloseMobileMenu = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar position="sticky" className="nav">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="nav-toolbar">
          <Typography
            variant="div"
            className="nav-logo"
            sx={{ flexGrow: { xs: 1, md: 0 } }}
          >
            <img src="/kishibe.svg" alt="logo" />
            <h2>MangaLibrary</h2>
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                size="large"
                aria-label="Open navigation menu"
                aria-controls="mobile-menu"
                aria-haspopup="true"
                onClick={handleOpenMobileMenu}
                className="nav-menu-icon"
              >
                {mobileMenuAnchor ? <FiX /> : <FiMenu />}
              </IconButton>
              <Menu
                id="mobile-menu"
                anchorEl={mobileMenuAnchor}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(mobileMenuAnchor)}
                onClose={handleCloseMobileMenu}
              >
                {navigationItems.map((item) => (
                  <MenuItem
                    key={item.text}
                    onClick={handleCloseMobileMenu}
                    className="nav-menu-item"
                    aria-label={item.ariaLabel}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      <Box className="nav-menu-box">
                        {item.icon}
                        <Typography>{item.text}</Typography>
                      </Box>
                    </NavLink>
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Box className="nav-links">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.text}
                  to={item.path}
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </NavLink>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
