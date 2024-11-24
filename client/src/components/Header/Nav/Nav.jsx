import React, { useState, useContext } from "react";
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
import { FiMenu, FiHome, FiUserCheck, FiUserPlus, FiX, FiUserX } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import { logoutUser } from "../../../services/users";

const Nav = () => {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpenMobileMenu = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleCloseMobileMenu = () => {
    setMobileMenuAnchor(null);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();

      setAuth({
        email: null,
        isAdmin: false,
        isAuthenticated: false,
      });

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
                {/* Always render Home and Library */}
                <MenuItem
                  onClick={handleCloseMobileMenu}
                  className="nav-menu-item"
                  aria-label="Navigate to home page"
                >
                  <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                    <Box className="nav-menu-box">
                      <FiHome />
                      <Typography>Home</Typography>
                    </Box>
                  </NavLink>
                </MenuItem>

                {auth.isAuthenticated && (
                  <MenuItem
                    onClick={handleCloseMobileMenu}
                    className="nav-menu-item"
                    aria-label="Go to your manga library"
                  >
                    <NavLink to="/library" className={({ isActive }) => (isActive ? "active" : "")}>
                      <Box className="nav-menu-box">
                        <FaBookmark />
                        <Typography>Library</Typography>
                      </Box>
                    </NavLink>
                  </MenuItem>
                )}

                {!auth.isAuthenticated && (
                  <>
                    <MenuItem
                      onClick={handleCloseMobileMenu}
                      className="nav-menu-item"
                      aria-label="Login"
                    >
                      <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                        <Box className="nav-menu-box">
                          <FiUserCheck />
                          <Typography>Login</Typography>
                        </Box>
                      </NavLink>
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseMobileMenu}
                      className="nav-menu-item"
                      aria-label="Sign Up"
                    >
                      <NavLink
                        to="/register"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        <Box className="nav-menu-box">
                          <FiUserPlus />
                          <Typography>Sign Up</Typography>
                        </Box>
                      </NavLink>
                    </MenuItem>
                  </>
                )}

                {auth.isAuthenticated && (
                  <MenuItem
                    onClick={() => {
                      handleCloseMobileMenu();
                      handleLogout();
                    }}
                    className="nav-menu-item"
                    aria-label="Logout"
                  >
                    <Box className="nav-menu-box">
                      <FiUserX />
                      <Typography>Logout</Typography>
                    </Box>
                  </MenuItem>
                )}
              </Menu>
            </>
          ) : (
            <Box className="nav-links">
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                <FiHome />
                <span>Home</span>
              </NavLink>

              {auth.isAuthenticated && (
                <NavLink
                  to="/library"
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                >
                  <FaBookmark />
                  <span>Library</span>
                </NavLink>
              )}

              {!auth.isAuthenticated && (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  >
                    <FiUserCheck />
                    <span>Login</span>
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  >
                    <FiUserPlus />
                    <span>Sign Up</span>
                  </NavLink>
                </>
              )}

              {auth.isAuthenticated && (
                <NavLink
                  className="nav-logout-btn"
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  <FiUserX />
                  <span>Logout</span>
                </NavLink>
              )}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
