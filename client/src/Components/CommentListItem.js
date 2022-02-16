import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';
import React from 'react';
import { PlaceHolderAvatar } from '../helpers/PlaceHolderComponents';

export default function CommentListItem({ comment }) {
  return (
    <Paper
      elevation={1}
      sx={{
        padding: '1rem',
        marginBottom: '.3rem',
        boxSizing: 'border-box'
      }}>
      <ListItem>
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
              <Typography variant='body2'>Av: {comment.author}</Typography>
              <Typography variant='body1'>{comment.title}</Typography>
            </>
          }
          secondary={comment.body}
        />
      </ListItem>
    </Paper>
  );
}
