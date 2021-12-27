import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import ShortTextIcon from '@mui/icons-material/ShortText';
import React from 'react';

export default function PostList({ posts }) {
  return (
    <List sx={{ width: '100%', maxWidth: 360 }}>
      {posts &&
        posts.map((post) => {
          return (
            <ListItem key={post.id}>
              <ListItemAvatar>
                <Avatar>
                  <ShortTextIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${post.title}`}
                secondary={post.body}></ListItemText>
            </ListItem>
          );
        })}
    </List>
  );
}
