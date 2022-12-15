import React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../../public/logo.png";

interface navListProps {
  label: string;
  value: string;
  link: string;
}

const navList: navListProps[] = [
  { label: "맛집리스트", value: "list", link: "/restaurant" },
  { label: "지도", value: "map", link: "/map" },
  { label: "랜덤뽑기", value: "random", link: "/random" },
  { label: "밍글링조뽑기", value: "group", link: "/group" },
];

const Header = () => {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNav = (url: string) => {
    router.push(url);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{ display: { xs: "none", md: "flex" }, cursor: "pointer" }}
            onClick={() => router.push("/")}
          >
            <Image src={logo} width={120} height={40} alt="logo" />
          </Box>
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navList.map((nav) => (
                <MenuItem key={nav.value} onClick={() => handleNav(nav.link)}>
                  <Typography textAlign="center">{nav.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Box
              onClick={() => router.push("/")}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "48px",
              }}
            >
              <Image src={logo} width={120} height={40} alt="logo" />
            </Box>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Grid container spacing={2} justifyContent={"space-around"}>
              {navList.map((nav) => (
                <Grid item key={nav.value} xs={2}>
                  <Button
                    onClick={() => handleNav(nav.link)}
                    sx={{ my: 2, color: "white", display: "block" }}
                    fullWidth
                  >
                    {nav.label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
