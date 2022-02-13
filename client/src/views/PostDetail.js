import React, { useState, useEffect } from 'react';
import PostModel from '../models/PostsModel';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

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
      {post.author ? (
        <div>
          <Button variant='contained' color='secondary'>
            <Link to={`/posts/${post.id}/edit`}>Ändra</Link>
          </Button>
          <h2>{post.title}</h2>
          <p>{post.author.username}</p>
          <img src={post.imageUrl} />
          <p>{post.body}</p>
        </div>
      ) : (
        <p>Laddar</p>
      )}
    </>
  );
}
