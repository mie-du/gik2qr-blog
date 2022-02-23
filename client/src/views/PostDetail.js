import React, { useState, useEffect } from 'react';
import ResourceModel from '../models/ResourceModel';
import { List, Typography } from '@mui/material';

import PostItemLarge from '../Components/PostItemLarge';
import CommentListItem from '../Components/CommentListItem';
import { Box } from '@mui/system';
import CommentForm from '../Components/CommentForm';

export default function PostDetail(props) {
  const id = props.match.params.id;
  const isValidId = !isNaN(id);

  const postModel = new ResourceModel('posts');
  const [post, setPost] = useState({});

  useEffect(() => {
    if (isValidId) {
      postModel.getById(id).then((post) => {
        setPost(post);
      });
    }
  }, []);

  function addComment(comment) {
    postModel.addComment(post.id, comment).then((post) => setPost(post));
  }

  return (
    <>
      {post?.author ? <PostItemLarge post={post} /> : <p>Laddar</p>}
      <Box sx={{ width: '700px', padding: 2, margin: '0 auto' }}>
        <Typography variant='h6'>Kommentarer</Typography>
        <CommentForm onSave={addComment} />
        {post?.comments && (
          <List>
            {post.comments.map((comment, i) => {
              return <CommentListItem comment={comment} key={`comment_${i}`} />;
            })}
          </List>
        )}
      </Box>
    </>
  );
}
