import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import React from 'react';
import { toDateTimeString } from '../helpers/formatting';
import { PlaceHolderAvatar } from '../helpers/PlaceHolderComponents';

export default function CommentListItem({ comment }) {
  return (
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
        primary={comment.title}
        secondary={
          <>
            <Typography
              component='span'
              sx={{ fontSize: '.8rem', display: 'block' }}>{`Skriven av: ${
              comment.author
            } ${toDateTimeString(comment.createdAt)}`}</Typography>
            <Typography component='span'>{comment.body}</Typography>
          </>
        }
      />
    </ListItem>
  );
}
