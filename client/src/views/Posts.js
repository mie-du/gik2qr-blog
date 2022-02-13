import React, { useState, useEffect } from 'react';
import PostModel from '../models/PostsModel';
import PostItemSmall from '../Components/PostItemSmall';
import { Typography } from '@mui/material';
import { pageTitle } from '../helpers/styles';

export default function Posts(props) {
  const postModel = new PostModel('posts');
  const [posts, setPosts] = useState([]);
  const url = props.match.url;
  const path = props.match.path;
  console.log(path);
  let title = '';

  useEffect(() => {
    postModel.getAll(url).then((posts) => {
      setPosts(posts);
    });
  }, [path, url]);

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
      <Typography
        gutterBottom
        sx={pageTitle.sx}
        variant={pageTitle.variant}
        component={pageTitle.component}>
        {title}
      </Typography>
      <ul>
        {posts.length > 0 &&
          posts.map((post) => {
            return (
              <li key={`post_${post.id}`}>
                <PostItemSmall {...props} post={post} />
              </li>
            );
          })}
      </ul>
    </>
  );
}
