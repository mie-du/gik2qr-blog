import React from 'react';
import api from '../api';

export default function Posts() {
  api.get('posts').then((result) => {
    console.log(result.data);
  });
  return <div>Posts</div>;
}
