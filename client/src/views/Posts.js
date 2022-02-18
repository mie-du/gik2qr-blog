import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostModel from '../models/PostsModel';
import { Chip } from '@mui/material';
import PostItemSmall from '../Components/PostItemSmall';

export default function Posts(props) {
  const postModel = new PostModel('posts');
  const [posts, setPosts] = useState([]);
  const url = props.match.url;
  console.log(url);

  useEffect(() => {
    postModel.getAll(url).then((posts) => {
      setPosts(posts);
    });
  }, [url]);
  console.log(posts);

  return (
    <ul>
      {posts.length > 0 &&
        posts.map((post) => {
          return <PostItemSmall post={post} key={`post_${post.id}`} />;
        })}
    </ul>
  );
}
