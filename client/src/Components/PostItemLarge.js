import { Button, Chip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Tag from './Tag';
import UserItemSmall from './UserItemSmall';

export default function PostItemLarge({ post }) {
  console.log(post);
  return (
    <div>
      <Button variant='contained' color='secondary'>
        <Link to={`/posts/${post.id}/edit`}>Ändra</Link>
      </Button>
      <h2>{post.title}</h2>
      {post.tags &&
        post.tags.map((tag, i) => {
          return <Tag tag={tag} key={`tag_${i}`} />;
        })}
      <UserItemSmall user={post.author} />
      <img src={post.imageUrl} />
      <p>{post.body}</p>
    </div>
  );
}
