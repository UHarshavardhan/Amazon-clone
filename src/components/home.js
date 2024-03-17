import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios'
import {Link} from "react-router-dom"
import { useEffect,useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shop
          </Typography>
          <Link to={'/eshop/signin'}>
          <Button color="inherit">SignIN</Button>
          </Link> 
          <Link to={'/eshop/signup'}>
          <Button color="inherit">SignUp</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

