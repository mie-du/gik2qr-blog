import React, { useState, useEffect } from 'react';
import ResourceModel from '../models/ResourceModel';
import PostItemSmall from '../Components/PostItemSmall';
import { Typography } from '@mui/material';

export default function Posts(props) {
  const postModel = new ResourceModel('posts');
  const [posts, setPosts] = useState([]);
  const url = props.match.url;
  const path = props.match.path;

  let title = '';

  useEffect(() => {
    postModel.getAll(url).then((posts) => {
      setPosts(posts);
    });
  }, [path, url]);
  console.log(posts);
  if (posts) {
    switch (path) {
      case '/users/:id/posts':
        title = `Inlägg för användare: ${posts[0].author.username}`;
        break;
      case '/tags/:name/posts':
        title = `Inlägg för tagg: ${props.match.params.name}`;
        break;
      default:
        title = 'Alla inlägg';
    }
  }

  return (
    <>
      <Typography variant='h3' gutterBottom>
        {title}
      </Typography>
      <ul>
        {posts.length > 0 &&
          posts.map((post) => {
            return <PostItemSmall post={post} key={`post_${post.id}`} />;
          })}
      </ul>
    </>
  );
}
