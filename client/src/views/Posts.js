import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostModel from '../models/PostsModel';
import { Chip } from '@mui/material';

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
          return (
            <li key={`post_${post.id}`}>
              <Link to={`/users/${post.author.id}/posts`}>
                Författare: {post.author.username}
              </Link>
              <br />
              {post.tags &&
                post.tags.map((tag) => (
                  <Link to={`/tags/${tag}/posts`}>
                    <Chip key={`tag_${tag}`} label={tag} color='secondary' />
                  </Link>
                ))}
              <img
                src={post.imageUrl}
                style={{ width: '200px', height: '200px' }}
              />
              <p>
                <Link to={`/posts/${post.id}`}>Titel: {post.title}</Link>
              </p>
              <p>Skrivet: {post.createdAt}</p>
              {post.body}
            </li>
          );
        })}
    </ul>
  );
}
