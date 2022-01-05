import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import React from 'react';
import { PlaceholderAvatar } from '../Components/small';

export default function CommentList({ comments }) {
  console.log('%c--- Component: CommentList ---', 'color: orange', comments);
  return (
    <>
      CommentList
      {/* <List>
      {comments &&
        comments.map((comment) => {
          return (
            <ListItem divider key={`comment_${comment.id}`}>
              <ListItemAvatar>
                <PlaceholderAvatar person={comment.author} />
              </ListItemAvatar>
              <ListItemText
                primary={comment.title}
                secondary={comment.body}></ListItemText>
            </ListItem>
          );
        })}
    </List> */}
    </>
  );
}
