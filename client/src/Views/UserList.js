import React from 'react';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { PlaceholderAvatar } from '../Components/small';
import { Link } from 'react-router-dom';
export default function UserList({ users }) {
  console.log('%c--- Component: UserList ---', 'color: orange', users);
  return (
    <>
      <Typography variant='h5'>Alla användare</Typography>
      <List sx={{ width: '100%' }}>
        {users &&
          users.map((user) => {
            return (
              <ListItem key={user.id}>
                <ListItemAvatar>
                  <PlaceholderAvatar person={user} />
                </ListItemAvatar>
                <Link to={`/users/${user.id}`}>
                  <ListItemText
                    primary={`${user.username}`}
                    secondary={user.email}></ListItemText>
                </Link>
              </ListItem>
            );
          })}
      </List>
    </>
  );
}
