import React, { useState, useEffect } from 'react';
import PostModel from '../models/PostsModel';
import { Button, Chip } from '@mui/material';
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
          {post.tags &&
            post.tags.map((tag) => (
              <Chip key={`tag_${tag}`} label={tag} color='secondary' />
            ))}
          <h2>{post.title}</h2>
          <p>{post.author.username}</p>
          <img src={post.imageUrl} />
          <p>{post.body}</p>
        </div>
      ) : (
        <p>Laddar</p>
      )}
      <ul>
        {post.comments &&
          post.comments.map((comment) => {
            return (
              <li key={`comment_${comment.id}`}>
                {comment.title}
                <br />
                {comment.author}
                <br />
                {comment.body}
              </li>
            );
          })}
      </ul>
    </>
  );
}
