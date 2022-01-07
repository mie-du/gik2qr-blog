import React from 'react';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
export default function tags({ users }) {
  console.log('%c--- Component: UserList ---', 'color: orange', users);
  return (
    <>
      <Typography variant='h5'>Taggar</Typography>
      <List sx={{ width: '100%' }}>
        {users &&
          users.map((user) => {
            return (
              <ListItem key={user.id}>
                <ListItemAvatar>
                  {user?.imageUrl ? (
                    <Avatar alt={user.username} src={user.imageUrl} />
                  ) : (
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={`${user.username}`}
                  secondary={user.email}></ListItemText>
              </ListItem>
            );
          })}
      </List>
    </>
  );
}