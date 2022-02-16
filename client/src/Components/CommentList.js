import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';
import React from 'react';

import { PlaceHolderAvatar } from './PlaceHolders';

export default function CommentList({ comments }) {
  return (
    <>
      <List
        sx={{
          marginTop: 3,
          width: '100%'
        }}>
        {comments.map((comment, i) => {
          return (
            <Paper
              key={`com_${i}`}
              elevation={1}
              sx={{
                padding: '1rem',
                marginBottom: '.3rem',
                boxSizing: 'border-box'
              }}>
              <ListItem key={`com_${i}`}>
                <ListItemAvatar>
                  <PlaceHolderAvatar
                    user={{
                      username: comment.author,
                      imageUrl: comment.authorImage
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      <Typography variant='body2'>
                        Av: {comment.author}
                      </Typography>
                      <Typography variant='body1'>{comment.title}</Typography>
                    </>
                  }
                  secondary={comment.body}
                />
              </ListItem>
            </Paper>
          );
        })}
      </List>
    </>
  );
}
