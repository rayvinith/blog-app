import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Tabs,
  Tab,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = () => {
  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // state
  const [value, setValue] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  const menuItems = [
    // { label: "HOME", link: "/" },
    // { label: "ABOUT", link: "/about" },
    { label: "ALL NOTICES", link: "/all-blogs" },
    // { label: "Teachers", link: "/all-teachers" },
    // { label: "Alumni", link: "/all-alumini" },
    // { label: "Fest", link: "/all-fests" },
    // { label: "CONTACT", link: "/contact" },
  ];

  const loginMenuItems = [
    { label: "MY SPACE", link: "/my-blogs" },
    { label: "Create Notice", link: "/create-blog" },
    // { label: "Create Assignment", link: "/create-teacher" },
  ];

  const renderMenu = () => (
    <List>
      {menuItems.map((item) => (
        <ListItem button component={Link} to={item.link} key={item.label}>
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
      {isLogin &&
        loginMenuItems.map((item) => (
          <ListItem button component={Link} to={item.link} key={item.label}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      {!isLogin ? (
        <>
          <ListItem button component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button component={Link} to="/register">
            <ListItemText primary="Register" />
          </ListItem>
        </>
      ) : (
        <ListItem button onClick={handleLogout}>
          <ListItemText primary="Logout" />
        </ListItem>
      )}
    </List>
  );

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "#263238",
          color: "white",
          "&:hover": {
            backgroundColor: "#263238",
            color: "white",
          },
        }}
      >
        <Toolbar>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                {renderMenu()}
              </Drawer>
            </>
          ) : (
            <>
              {menuItems.map((item) => (
                <Tab
                  key={item.label}
                  label={item.label}
                  LinkComponent={Link}
                  to={item.link}
                  sx={{ "&:hover": { color: "#eceff1" } }}
                />
              ))}
              {isLogin && (
                <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
                  <Tabs
                    textColor="inherit"
                    value={value}
                    onChange={(e, val) => setValue(val)}
                  >
                    {loginMenuItems.map((item) => (
                      <Tab
                        key={item.label}
                        label={item.label}
                        LinkComponent={Link}
                        to={item.link}
                      />
                    ))}
                  </Tabs>
                </Box>
              )}
              <Box display={"flex"} marginLeft="auto">
                {!isLogin ? (
                  <>
                    <Button
                      sx={{ margin: 1, color: "white" }}
                      LinkComponent={Link}
                      to="/login"
                    >
                      Login
                    </Button>
                    <Button
                      sx={{ margin: 1, color: "white" }}
                      LinkComponent={Link}
                      to="/register"
                    >
                      Register
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={handleLogout}
                    sx={{ margin: 1, color: "white" }}
                  >
                    Logout
                  </Button>
                )}
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
