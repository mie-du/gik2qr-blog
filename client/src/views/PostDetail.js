import React, { useState, useEffect } from 'react';
import PostModel from '../models/PostsModel';
import { Button, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import PostItemLarge from '../Components/PostItemLarge';
import CommentListItem from '../Components/CommentListItem';

export default function PostDetail(props) {
  const id = props.match.params.id;
  const isValidId = !isNaN(id);

  const postModel = new PostModel('posts');
  const [post, setPost] = useState({});

  useEffect(() => {
    if (isValidId) {
      postModel.getById(id).then((post) => {
        setPost(post);
      });
    }
  }, []);
  console.log(post);

  return (
    <>
      {post?.author ? <PostItemLarge post={post} /> : <p>Laddar</p>}
      {post?.comments &&
        post.comments.map((comment, i) => {
          return <CommentListItem comment={comment} key={`comment_${i}`} />;
        })}
    </>
  );
}
