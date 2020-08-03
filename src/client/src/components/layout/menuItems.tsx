import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import { List } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { User } from 'share/entities/user.entity';

export const MenuItem = ({ user }: { user: User }) => {
  return <List>
    <ListItem button component={Link} to='/dashboard'>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard">
      </ListItemText>
    </ListItem>
    {user.isAdmin === 'admin' && <ListItem button component={Link} to='/clients'>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Clients" />
    </ListItem>
    }
    {user.isAdmin === 'admin' && <ListItem button component={Link} to='/users'>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
    }
    <ListItem button component={Link} to='/cdr'>
      <ListItemIcon>
        <ReceiptIcon />
      </ListItemIcon>
      <ListItemText primary="Service">
      </ListItemText>
    </ListItem>
    
    <ListItem button component={Link} to='/profile'>
      <ListItemIcon>
        <LinkIcon/>
      </ListItemIcon>
      <ListItemText primary="Profile">
      </ListItemText>
    </ListItem>
  </List>
}

